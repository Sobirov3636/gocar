import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Message } from '../../libs/dto/message/message';
import { MessageInput } from '../../libs/dto/message/message.input';
import { NotificationService } from '../notification/notification.service';
import { NotificationGroup, NotificationType } from '../../libs/enums/notification.enum';
import { Member } from '../../libs/dto/member/member';

@Injectable()
export class MessageService {
	constructor(
		@InjectModel('Message') private readonly messageModel: Model<Message>,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
		private readonly notificationService: NotificationService,
	) {}

	public async createMessage(memberId: ObjectId, input: MessageInput): Promise<Message> {
		try {
			const member = await this.memberModel.findById(memberId).exec();
			const message = await this.messageModel.create(input);
			await this.notificationService.createNotification(memberId, {
				notificationType: NotificationType.MESSAGE,
				notificationGroup: NotificationGroup.MESSAGE,
				notificationTitle: `${member.memberNick} sent new Message for you!`,
				notificationDesc: `${message.messageDesc}`,
				authorId: memberId,
				receiverId: input.messageRefId,
				messageId: message._id,
			});
			return message;
		} catch (error) {
			throw new InternalServerErrorException('Message creation failed');
		}
	}
}
