import mongoose, { Schema } from 'mongoose';
import { FaqCategory, FaqStatus } from '../libs/enums/faq.enum';

const FaqSchema = new Schema(
	{
		faqCategory: {
			type: String,
			enum: FaqCategory,
			required: true,
		},

		faqStatus: {
			type: String,
			enum: FaqStatus,
			default: FaqStatus.ACTIVE,
		},

		faqTitle: {
			type: String,
			required: true,
		},

		faqContent: {
			type: String,
			required: true,
		},

		faqViews: {
			type: Number,
			default: 0,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},
	},
	{ timestamps: true, collection: 'faqs' },
);

export default FaqSchema;
