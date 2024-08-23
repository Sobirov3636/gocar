import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { PropertyService } from '../property/property.service';
import { BoardArticleService } from '../board-article/board-article.service';
import { CommentInput, CommentsInquiry } from '../../libs/dto/comment/comment.input';
import { Comment, Comments } from '../../libs/dto/comment/comment';
import { Direction, Message } from '../../libs/enums/common.enum';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';
import { CommentUpdate } from '../../libs/dto/comment/comment.update';
import { T } from '../../libs/types/common';
import { lookupMember } from '../../libs/config';
import { NotificationService } from '../notification/notification.service';
import { Property } from '../../libs/dto/property/property';
import { BoardArticle } from '../../libs/dto/board-article/board-article';
import { Member } from '../../libs/dto/member/member';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';

@Injectable()
export class CommentService {
	constructor(
		@InjectModel('Comment') private readonly commentModel: Model<Comment>,
		@InjectModel('Property') private readonly propertyModel: Model<Property>,
		@InjectModel('BoardArticle') private readonly boardArticleModel: Model<BoardArticle>,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private memberService: MemberService,
		private propertyService: PropertyService,
		private boardArticleService: BoardArticleService,
		private readonly notificationService: NotificationService,
	) {}

	// CREATE COMMENT
	public async createComment(memberId: ObjectId, input: CommentInput): Promise<Comment> {
		const member = await this.memberModel.findById(memberId).exec();
		input.memberId = memberId;
		let result = null;
		try {
			result = await this.commentModel.create(input);
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}

		switch (input.commentGroup) {
			case CommentGroup.PROPERTY:
				const property = await this.propertyModel.findById(input.commentRefId);
				if (!property) throw new InternalServerErrorException('Property not found');
				await this.propertyService.propertyStatsEditor({
					_id: input.commentRefId,
					targetKey: 'propertyComments',
					modifier: 1,
				});

				// 1-------------Notification-----propertyComments---------
				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.PROPERTY,
					notificationTitle: 'New Comment for your Property!',
					notificationDesc: `${member.memberNick} commented your property!`,
					authorId: memberId,
					receiverId: property.memberId,
					propertyId: input.commentRefId,
					articleId: undefined,
				});

				break;
			case CommentGroup.ARTICLE:
				const article = await this.boardArticleModel.findById(input.commentRefId);
				if (!article) throw new InternalServerErrorException('Article not found');
				await this.boardArticleService.boardArticleStatsEditor({
					_id: input.commentRefId,
					targetKey: 'articleComments',
					modifier: 1,
				});

				// 2-------------Notification-----articleComments---------
				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.ARTICLE,
					notificationTitle: 'New Comment for your Article!',
					notificationDesc: `${member.memberNick} commented your article! `,
					authorId: memberId,
					receiverId: article.memberId,
					propertyId: undefined,
					articleId: input.commentRefId,
				});

				break;
			case CommentGroup.MEMBER:
				await this.memberService.memberStatsEditor({
					_id: input.commentRefId,
					targetKey: 'memberComments',
					modifier: 1,
				});

				// 3-------------Notification------memberComments--------

				await this.notificationService.createNotification(memberId, {
					notificationType: NotificationType.COMMENT,
					notificationGroup: NotificationGroup.MEMBER,
					notificationTitle: 'New Comment for you',
					notificationDesc: `${member.memberNick} commented you! `,
					authorId: memberId,
					receiverId: input.commentRefId,
					propertyId: undefined,
					articleId: undefined,
				});

				break;
		}

		if (!result) throw new InternalServerErrorException(Message.CREATE_FAILED);
		return result;
	}

	// UPDATE COMMENT
	public async updateComment(memberId: ObjectId, input: CommentUpdate): Promise<Comment> {
		let { _id } = input;
		const search: T = {
			_id: _id,
			memberId: memberId,
			commentStatus: CommentStatus.ACTIVE,
		};

		const result = await this.commentModel.findOneAndUpdate(search, input, { new: true }).exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		return result;
	}

	// GET BOARD ARTICLE
	public async getComments(memberId: ObjectId, input: CommentsInquiry): Promise<Comments> {
		const { commentRefId } = input.search;
		const match: T = { commentRefId: commentRefId, commentStatus: CommentStatus.ACTIVE };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result: Comments[] = await this.commentModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							// meLiked
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

	/** ADMIN **/

	// REMOVE COMMENT BY ADMIN
	public async removeCommentByAdmin(input: ObjectId): Promise<Comment> {
		const result = await this.commentModel.findByIdAndDelete(input).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);

		return result;
	}
}
