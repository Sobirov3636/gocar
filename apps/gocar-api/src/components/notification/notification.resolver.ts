import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Notification } from '../../libs/dto/notification/notification';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { NotificationInput } from '../../libs/dto/notification/notification.input';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { NotificationUpdate } from '../../libs/dto/notification/notification.update';
import { Member } from '../../libs/dto/member/member';

@Resolver()
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(AuthGuard)
	@Query((returns) => Notification)
	public async getNotification(
		@Args('notificationId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Notification> {
		console.log('Query: getNotification');
		const notificationId = shapeIntoMongoObjectId(input);
		return await this.notificationService.getNotification(memberId, notificationId);
	}

	@UseGuards(AuthGuard)
	@Query(() => [Notification], { name: 'getNotifications' })
	async getNotifications(@Args('receiverId') input: string): Promise<Notification[]> {
		const receiverId = shapeIntoMongoObjectId(input);
		return this.notificationService.getNotifications(receiverId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	public async updateNotification(
		@Args('input') input: NotificationUpdate,
		@AuthMember('_id') authorId: ObjectId,
	): Promise<Notification> {
		console.log('Mutation: updateNotification');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.notificationService.updateNotification(authorId, input);
	}
}
