import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Faq, Faqs } from '../../libs/dto/faq/faq';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { FaqUpdate } from '../../libs/dto/faq/faq.update';
import { AllFaqsInquiry, FaqInput, FaqInquiry } from '../../libs/dto/faq/faq.input';

@Resolver()
export class FaqResolver {
	constructor(private readonly faqService: FaqService) {}

	@UseGuards(WithoutGuard)
	@Query(() => Faq)
	public async getFaq(@Args('faqId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Faq> {
		console.log('Query: getFaq');
		const faqId = shapeIntoMongoObjectId(input);
		return await this.faqService.getFaq(memberId, faqId);
	}

	@UseGuards(WithoutGuard)
	@Query((returns) => Faqs)
	public async getFaqs(@Args('input') input: FaqInquiry, @AuthMember('_id') memberId: ObjectId): Promise<Faqs> {
		console.log('Query: getFaqs');
		return await this.faqService.getFaqs(memberId, input);
	}

	/** ADMIN **/

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => Faq)
	public async createFaqByAdmin(@Args('input') input: FaqInput, @AuthMember('_id') memberId: ObjectId): Promise<Faq> {
		console.log('Mutation: createFaqByAdmin');
		return await this.faqService.createFaqByAdmin(memberId, input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query((returns) => Faqs)
	public async getAllFaqsByAdmin(
		@Args('input') input: AllFaqsInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Faqs> {
		console.log('Query: getAllFaqsByAdmin');
		return await this.faqService.getAllFaqsByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Faq)
	public async updateFaqByAdmin(@Args('faqId') input: FaqUpdate, @AuthMember('_id') memberId: ObjectId): Promise<Faq> {
		console.log('Mutation: updateFaqByAdmin');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.faqService.updateFaqByAdmin(input);
	}

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation((returns) => Faq)
	public async removeFaqByAdmin(@Args('faqId') input: string, @AuthMember('_id') memberId: ObjectId): Promise<Faq> {
		console.log('Mutation: removeFaqByAdmin');
		const faqId = shapeIntoMongoObjectId(input);
		return await this.faqService.removeFaqByAdmin(faqId);
	}
}
