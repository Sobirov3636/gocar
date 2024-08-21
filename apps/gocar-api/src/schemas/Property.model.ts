import { Schema } from 'mongoose';
import {
	PropertyDomestic,
	PropertyFuel,
	PropertyImported,
	PropertyLocation,
	PropertyManufacture,
	PropertyOptions,
	PropertyStatus,
	PropertyTransmission,
	PropertyType,
} from '../libs/enums/property.enum';

const PropertySchema = new Schema(
	{
		propertyType: {
			type: String,
			enum: PropertyType,
			required: true,
		},

		propertyStatus: {
			type: String,
			enum: PropertyStatus,
			default: PropertyStatus.ACTIVE,
		},

		propertyFuel: {
			type: String,
			enum: PropertyFuel,
			required: true,
		},

		propertyTransmission: {
			type: String,
			enum: PropertyTransmission,
			required: true,
		},

		propertyOptions: {
			type: [String],
			enum: PropertyOptions,
		},

		propertyManufacture: {
			type: String,
			enum: PropertyManufacture,
			required: true,
		},

		propertyDomestic: {
			type: String,
			enum: PropertyDomestic,
			// required: true,
		},

		propertyImported: {
			type: String,
			enum: PropertyImported,
			// required: true,
		},

		propertyLocation: {
			type: String,
			enum: PropertyLocation,
			required: true,
		},

		propertyAddress: {
			type: String,
			required: true,
		},

		propertyTitle: {
			type: String,
			required: true,
		},

		propertyPrice: {
			type: Number,
			required: true,
		},

		propertyModel: {
			type: String,
			required: true,
		},
		propertyManufacturedYear: {
			type: Date,
			required: true,
		},

		propertyDrivenDistance: {
			type: Number,
			required: true,
		},

		propertyViews: {
			type: Number,
			default: 0,
		},

		propertyLikes: {
			type: Number,
			default: 0,
		},

		propertyComments: {
			type: Number,
			default: 0,
		},

		propertyRank: {
			type: Number,
			default: 0,
		},

		propertyImages: {
			type: [String],
			required: true,
		},

		propertyDesc: {
			type: String,
		},

		propertyRent: {
			type: Boolean,
			default: false,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'properties' },
);

// PropertySchema.index({ propertyType: 1, propertyLocation: 1, propertyTitle: 1, propertyPrice: 1 }, { unique: true });

export default PropertySchema;
