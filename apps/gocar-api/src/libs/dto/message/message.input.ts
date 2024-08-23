import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, Length } from 'class-validator';
import { ObjectId } from 'mongoose';

@InputType()
export class MessageInput {
	@IsNotEmpty()
	@Length(1, 100)
	@Field(() => String)
	senderName: string;

	@IsNotEmpty()
	@Length(1, 100)
	@Field(() => String)
	senderPhone: string;

	@IsNotEmpty()
	@Length(1, 100)
	@Field(() => String)
	senderEmail: string;

	@IsNotEmpty()
	@Length(1, 500)
	@Field(() => String)
	messageDesc: string;

	@IsNotEmpty()
	@Field(() => String)
	messageRefId: ObjectId;

	memberId?: ObjectId;
}
