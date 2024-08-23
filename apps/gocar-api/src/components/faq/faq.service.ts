import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { InjectModel } from '@nestjs/mongoose';
import { StatisticModifier, T } from '../../libs/types/common';
import { FaqStatus } from '../../libs/enums/faq.enum';
import { Direction, Message } from '../../libs/enums/common.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import { lookupMember } from '../../libs/config';
import { FaqUpdate } from '../../libs/dto/faq/faq.update';
import { AllFaqsInquiry, FaqInput, FaqInquiry } from '../../libs/dto/faq/faq.input';

@Injectable()
export class FaqService {
	constructor(
		@InjectModel('Faq') private readonly faqModel: Model<Faq>,
		private readonly memberService: MemberService,
		private viewService: ViewService,
	) {}

	public async getFaq(memberId: ObjectId, faqId: ObjectId): Promise<Faq> {
		const search: T = {
			_id: faqId,
			faqStatus: FaqStatus.ACTIVE,
		};

		const targetFaq: Faq = await this.faqModel.findOne(search).lean().exec();
		if (!targetFaq) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		if (memberId) {
			const viewInput = { memberId: memberId, viewRefId: faqId, viewGroup: ViewGroup.FAQ };
			const newView = await this.viewService.recordView(viewInput);
			if (newView) {
				await this.faqStatsEditor({ _id: faqId, targetKey: 'faqViews', modifier: 1 });
				targetFaq.faqViews++;
			}
		}
		targetFaq.memberData = await this.memberService.getMember(null, targetFaq.memberId);
		return targetFaq;
	}

	public async getFaqs(memberId: ObjectId, input: FaqInquiry): Promise<Faqs> {
		const match: T = { faqStatus: FaqStatus.ACTIVE, ...(input.faqCategory && { faqCategory: input.faqCategory }) };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		console.log('match', match);

		const result = await this.faqModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async createFaqByAdmin(memberId: ObjectId, input: FaqInput): Promise<Faq> {
		input.memberId = memberId;
		try {
			const result = await this.faqModel.create(input);
			return result;
		} catch (err) {
			console.log('Error service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async getAllFaqsByAdmin(input: AllFaqsInquiry): Promise<Faqs> {
		const { faqStatus, faqCategory, text } = input.search;
		const match: T = {};
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		if (text) match.faqTitle = { $regex: new RegExp(text, 'i') };
		if (faqStatus) match.faqStatus = faqStatus;
		if (faqCategory) match.faqCategory = faqCategory;

		const result = await this.faqModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		if (!result.length) throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		return result[0];
	}

	public async updateFaqByAdmin(input: FaqUpdate): Promise<Faq> {
		const { _id, faqStatus } = input;

		const result = await this.faqModel
			.findOneAndUpdate({ _id: _id, faqStatus: FaqStatus.ACTIVE }, input, { new: true })
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		return result;
	}
	public async removeFaqByAdmin(faqId: ObjectId): Promise<Faq> {
		const search: T = { _id: faqId, faqStatus: FaqStatus.DELETE };
		const result = await this.faqModel.findOneAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}

	public async faqStatsEditor(input: StatisticModifier): Promise<Faq> {
		const { _id, targetKey, modifier } = input;
		return await this.faqModel.findByIdAndUpdate(_id, { $inc: { [targetKey]: modifier } }, { new: true }).exec();
	}
}
