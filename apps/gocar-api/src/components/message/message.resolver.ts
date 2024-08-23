import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { MessageInput } from '../../libs/dto/message/message.input';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Message } from '../../libs/dto/message/message';

@Resolver()
export class MessageResolver {
	constructor(private readonly messageService: MessageService) {}

	@UseGuards(AuthGuard)
	@Mutation(() => Message)
	public async createMessage(
		@Args('input') input: MessageInput,
		@AuthMember('_id') memberId: ObjectId, //
	): Promise<Message> {
		return this.messageService.createMessage(memberId, input);
	}
}
