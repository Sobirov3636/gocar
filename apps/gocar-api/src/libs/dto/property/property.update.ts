import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
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

@InputType()
export class PropertyUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => PropertyType, { nullable: true })
	propertyType?: PropertyType;

	@IsOptional()
	@Field(() => PropertyFuel, { nullable: true })
	propertyFuel?: PropertyFuel;

	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;

	@IsOptional()
	@Field(() => PropertyTransmission, { nullable: true })
	propertyTransmission?: PropertyTransmission;

	@IsOptional()
	@Field(() => [PropertyOptions], { nullable: true })
	propertyOptions?: PropertyOptions[];

	@IsOptional()
	@Field(() => PropertyManufacture, { nullable: true })
	propertyManufacture?: PropertyManufacture;

	@IsOptional()
	@Field(() => PropertyDomestic, { nullable: true })
	propertyDomestic?: PropertyDomestic;

	@IsOptional()
	@Field(() => PropertyImported, { nullable: true })
	propertyImported?: PropertyImported;

	@IsOptional()
	@Field(() => PropertyLocation, { nullable: true })
	propertyLocation?: PropertyLocation;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	propertyAddress?: string;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	propertyTitle?: string;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	propertyPrice?: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	propertyModel?: string;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	propertyManufacturedYear?: number;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	propertyDrivenDistance?: number;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	propertyImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	propertyRent?: boolean;

	soldAt?: Date;

	deletedAt?: Date;
}
