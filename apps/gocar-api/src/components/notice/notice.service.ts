import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notice, Notices } from '../../libs/dto/notice/notice';
import { MemberService } from '../member/member.service';
import { AllNoticesInquiry, NoticeInput, NoticeInquiry } from '../../libs/dto/notice/notice.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { NoticeStatus } from '../../libs/enums/notice.enum';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { NoticeUpdate } from '../../libs/dto/notice/notice.update';

@Injectable()
export class NoticeService {
	constructor(
		@InjectModel('Notice') private readonly noticeModel: Model<Notice>,
		private readonly memberService: MemberService,
	) {}

	public async getNotices(memberId: ObjectId, input: NoticeInquiry): Promise<Notices> {
		const match: T = { noticeStatus: NoticeStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		console.log('match', match);

		const result = await this.noticeModel
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

	public async createNoticeByAdmin(memberId: ObjectId, input: NoticeInput): Promise<Notice> {
		input.memberId = memberId;
		if (!memberId) throw new Error(Message.ONLY_SPECIFIC_ROLES_ALLOWED);
		try {
			const result = await this.noticeModel.create(input);
			return result;
		} catch (err) {
			console.log('Error service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async getAllNoticesByAdmin(input: AllNoticesInquiry): Promise<Notices> {
		const { noticeStatus, text } = input.search;
		const match: T = { ...(input.search?.noticeCategory && { noticeCategory: input.search?.noticeCategory }) };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };
		if (text) match.noticeTitle = { $regex: new RegExp(text, 'i') };
		if (noticeStatus) match.noticeStatus = noticeStatus;

		const result = await this.noticeModel
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

	public async updateNoticeByAdmin(input: NoticeUpdate): Promise<Notice> {
		const { _id, noticeStatus } = input;

		const result = await this.noticeModel
			.findOneAndUpdate({ _id: _id, noticeStatus: NoticeStatus.ACTIVE }, input, { new: true })
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		return result;
	}
	public async removeNoticeByAdmin(noticeId: ObjectId): Promise<Notice> {
		const search: T = { _id: noticeId };
		const result = await this.noticeModel.findOneAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}
}
