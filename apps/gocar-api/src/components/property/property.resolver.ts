import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Properties, Property } from '../../libs/dto/property/property';
import {
	AllPropertiesInquiry,
	DealerPropertiesInquiry,
	PropertiesInquiry,
	PropertyInput,
} from '../../libs/dto/property/property.input';
import { UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { PropertyUpdate } from '../../libs/dto/property/property.update';

@Resolver()
export class PropertyResolver {
	constructor(private readonly propertyService: PropertyService) {}

	// CREATE PROPERTY
	@Roles(MemberType.DEALER)
	@UseGuards(RolesGuard)
	@Mutation(() => Property)
	public async createProperty(
		@Args('input') input: PropertyInput,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Property> {
		console.log('Mutation createProperty');
		input.memberId = memberId;

		return await this.propertyService.createProperty(input);
	}

	// GET PROPERTY
	@UseGuards(WithoutGuard)
	@Query(() => Property)
	public async getProperty(
		@Args('propertyId') input: string,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Property> {
		console.log('Query: getProperty');
		const propertyId = shapeIntoMongoObjectId(input);
		return await this.propertyService.getProperty(memberId, propertyId);
	}

	// UPDATE PROPERTY
	@Roles(MemberType.DEALER)
	@UseGuards(RolesGuard)
	@Mutation(() => Property)
	public async updateProperty(
		@Args('input') input: PropertyUpdate,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Property> {
		console.log('Mutation: updateProperty');
		input._id = shapeIntoMongoObjectId(input._id);
		return await this.propertyService.updateProperty(memberId, input);
	}

	// GET PROPERTIES
	@UseGuards(WithoutGuard)
	@Query(() => Properties)
	public async getProperties(
		@Args('input') input: PropertiesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Properties> {
		console.log('Query: getProperties');
		return await this.propertyService.getProperties(memberId, input);
	}

	// GET DEALER PROPERTIES
	@Roles(MemberType.DEALER)
	@UseGuards(RolesGuard)
	@Query(() => Properties)
	public async getDealerProperties(
		@Args('input') input: DealerPropertiesInquiry,
		@AuthMember('_id') memberId: ObjectId,
	): Promise<Properties> {
		console.log('Query: getDealerProperties');
		return await this.propertyService.getDealerProperties(memberId, input);
	}

	/** ADMIN **/

	// GET ALL PROPERTIES BY ADMIN
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => Properties)
	public async getAllPropertiesByAdmin(@Args('input') input: AllPropertiesInquiry): Promise<Properties> {
		console.log('Query: getAllPropertiesByAdmin');
		return await this.propertyService.getAllPropertiesByAdmin(input);
	}
}
