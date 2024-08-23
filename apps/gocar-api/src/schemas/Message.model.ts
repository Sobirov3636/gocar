import { Schema } from 'mongoose';
import { ViewGroup } from '../libs/enums/view.enum';
import { MessageStatus } from '../libs/enums/message.enum';

const MessageSchema = new Schema(
	{
		messageStatus: {
			type: String,
			enum: MessageStatus,
			default: MessageStatus.WAIT,
		},

		senderName: {
			type: String,
			required: true,
		},

		senderPhone: {
			type: String,
			required: true,
		},

		senderEmail: {
			type: String,
			required: true,
		},

		messageDesc: {
			type: String,
			required: true,
		},

		messageRefId: {
			type: Schema.Types.ObjectId,
			required: true,
		},

		memberId: {
			type: Schema.Types.ObjectId,
		},
	},
	{ timestamps: true, collection: 'messages' },
);

export default MessageSchema;
