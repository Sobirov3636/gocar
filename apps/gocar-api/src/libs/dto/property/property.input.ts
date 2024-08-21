import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
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
import { ObjectId } from 'mongoose';
import { Direction } from '../../enums/common.enum';
import { availablePropertySorts } from '../../config';

/** PROPERTY INPUT **/
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
	@Field(() => Number)
	propertyManufacturedYear: number;

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

/** PROPERTIES INQUIRY **/

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class ManufacturedYearRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class DrivenDistanceRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
class PISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	locationList?: PropertyLocation[];

	@IsOptional()
	@Field(() => [PropertyType], { nullable: true })
	typeList?: PropertyType[];

	@IsOptional()
	@Field(() => [PropertyFuel], { nullable: true })
	fuelList?: PropertyFuel[];

	@IsOptional()
	@Field(() => [PropertyTransmission], { nullable: true })
	transmissionList?: PropertyTransmission[];

	@IsOptional()
	@Field(() => [PropertyOptions], { nullable: true })
	options?: PropertyOptions[];

	@IsOptional()
	@Field(() => [PropertyManufacture], { nullable: true })
	manufactureList?: [PropertyManufacture];

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => ManufacturedYearRange, { nullable: true })
	manufacturedYearRange?: ManufacturedYearRange;

	@IsOptional()
	@Field(() => DrivenDistanceRange, { nullable: true })
	drivenDistanceRange?: DrivenDistanceRange;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class PropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => PISearch)
	search: PISearch;
}

/** DEALER PROPERTIES INQUIRY **/
@InputType()
class DPISearch {
	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;
}

@InputType()
export class DealerPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => DPISearch)
	search: DPISearch;
}

// ################## //
@InputType()
class ALPISearch {
	@IsOptional()
	@Field(() => PropertyStatus, { nullable: true })
	propertyStatus?: PropertyStatus;

	@IsOptional()
	@Field(() => [PropertyLocation], { nullable: true })
	propertyLocationList?: PropertyLocation[];
}

/** ALL PROPERTIES INQUIRY **/
@InputType()
export class AllPropertiesInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availablePropertySorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ALPISearch)
	search: ALPISearch;
}

/** ORDINARYINQUIRY **/
@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
