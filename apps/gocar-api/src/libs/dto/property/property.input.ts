import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import {
	PropertyDomestic,
	PropertyFuel,
	PropertyImported,
	PropertyLocation,
	PropertyManufacture,
	PropertyOptions,
	PropertyTransmission,
	PropertyType,
} from '../../enums/property.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class PropertyInput {
	@IsNotEmpty()
	@Field(() => PropertyType)
	propertyType: PropertyType;

	@IsNotEmpty()
	@Field(() => PropertyFuel)
	propertyFuel: PropertyFuel;

	@IsNotEmpty()
	@Field(() => PropertyTransmission)
	propertyTransmission: PropertyTransmission;

	@IsNotEmpty()
	@Field(() => [PropertyOptions])
	propertyOptions: PropertyOptions[];

	@IsNotEmpty()
	@Field(() => PropertyManufacture)
	propertyManufacture: PropertyManufacture;

	@IsOptional()
	@Field(() => PropertyDomestic, { nullable: true })
	propertyDomestic?: PropertyDomestic;

	@IsOptional()
	@Field(() => PropertyImported, { nullable: true })
	propertyImported?: PropertyImported;

	@IsNotEmpty()
	@Field(() => PropertyLocation)
	propertyLocation: PropertyLocation;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	propertyAddress: string;

	@IsNotEmpty()
	@Length(3, 100)
	@Field(() => String)
	propertyTitle: string;

	@IsNotEmpty()
	@Field(() => Number)
	propertyPrice: number;

	@IsNotEmpty()
	@Field(() => String)
	propertyModel: string;

	@IsNotEmpty()
	@Field(() => String)
	propertyManufacturedYear: string;

	@IsNotEmpty()
	@Field(() => String)
	propertyRegistrationDate: string;

	@IsNotEmpty()
	@Field(() => Number)
	propertyEngineDisplacement: number;

	@IsNotEmpty()
	@Field(() => Number)
	propertyDrivenDistance: number;

	@IsNotEmpty()
	@Field(() => [String])
	propertyImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	propertyDesc?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	propertyRent?: boolean;

	memberId?: ObjectId;
}
