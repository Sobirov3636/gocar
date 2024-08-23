import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { MessageStatus } from '../../enums/message.enum';

@ObjectType()
export class Message {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => MessageStatus)
	messageStatus: MessageStatus;

	@Field(() => String)
	senderName: string;

	@Field(() => String)
	senderPhone: string;

	@Field(() => String)
	senderEmail: string;

	@Field(() => String)
	messageDesc: string;

	@Field(() => String)
	messageRefId: ObjectId;

	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;
}
