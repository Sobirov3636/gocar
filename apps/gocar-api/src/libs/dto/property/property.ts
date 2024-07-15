import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
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
} from '../../enums/property.enum';
import { Member, TotalCounter } from '../member/member';

@ObjectType()
export class Property {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => PropertyType)
	propertyType: PropertyType;

	@Field(() => PropertyStatus)
	propertyStatus: PropertyStatus;

	@Field(() => PropertyFuel)
	propertyFuel: PropertyFuel;

	@Field(() => PropertyTransmission)
	propertyTransmission: PropertyTransmission;

	@Field(() => [PropertyOptions])
	propertyOptions: PropertyOptions[];

	@Field(() => PropertyManufacture)
	propertyManufacture: PropertyManufacture;

	@Field(() => PropertyDomestic, { nullable: true })
	propertyDomestic?: PropertyDomestic;

	@Field(() => PropertyImported, { nullable: true })
	propertyImported?: PropertyImported;

	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	@Field(() => String)
	propertyAddress: string;

	@Field(() => String)
	propertyTitle: string;

	@Field(() => Number)
	propertyPrice: number;

	@Field(() => String)
	propertyModel: string;

	@Field()
	@Field(() => Number)
	propertyManufacturedYear: number;

	@Field()
	@Field(() => Date)
	propertyRegistrationDate: Date;

	@Field(() => Number)
	propertyEngineDisplacement: number;

	@Field(() => Number)
	propertyDrivenDistance: number;

	@Field(() => Int)
	propertyViews: number;

	@Field(() => Int)
	propertyLikes: number;

	@Field(() => Int)
	propertyComments: number;

	@Field(() => Int)
	propertyRank: number;

	@Field(() => [String])
	propertyImages: string[];

	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@Field(() => Boolean)
	propertyRent: boolean;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date, { nullable: true })
	soldAt?: Date;

	@Field(() => Date, { nullable: true })
	deletedAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** from aggregation **/

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}

@ObjectType()
export class Properties {
	@Field(() => [Property])
	list: Property[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
