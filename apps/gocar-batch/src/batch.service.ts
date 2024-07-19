import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'apps/gocar-api/src/libs/dto/member/member';
import { Property } from 'apps/gocar-api/src/libs/dto/property/property';
import { MemberStatus, MemberType } from 'apps/gocar-api/src/libs/enums/member.enum';
import { PropertyStatus } from 'apps/gocar-api/src/libs/enums/property.enum';
import { Model } from 'mongoose';

@Injectable()
export class BatchService {
	constructor(
		@InjectModel('Property') private readonly propertyModel: Model<Property>,
		@InjectModel('Member') private readonly memberModel: Model<Member>,
	) {}
	public async batchRollback(): Promise<void> {
		await this.propertyModel
			.updateMany(
				{
					propertyStatus: PropertyStatus.ACTIVE,
				},
				{ propertyRank: 0 },
			)
			.exec();

		await this.memberModel
			.updateMany(
				{
					memberStatus: MemberStatus.ACTIVE,
					memberType: MemberType.DEALER,
				},
				{ memberRank: 0 },
			)
			.exec();
	}

	public async batchTopProperties(): Promise<void> {
		const properties: Property[] = await this.propertyModel
			.find({
				propertyStatus: PropertyStatus.ACTIVE,
				propertyRank: 0,
			})
			.exec();

		const promisedList = properties.map(async (ele: Property) => {
			const { _id, propertyLikes, propertyViews } = ele;
			const rank = propertyLikes * 2 + propertyViews * 1;
			return await this.propertyModel.findByIdAndUpdate(_id, { propertyRank: rank });
		});
		await Promise.all(promisedList);
	}

	public async batchTopDealers(): Promise<void> {
		const dealers: Member[] = await this.memberModel
			.find({
				memberType: MemberType.DEALER,
				memberStatus: MemberStatus.ACTIVE,
				memberRank: 0,
			})
			.exec();

		const promisedList = dealers.map(async (ele: Member) => {
			const { _id, memberProperties, memberLikes, memberArticles, memberViews } = ele;
			const rank = memberProperties * 5 + memberArticles * 3 + memberLikes * 2 + memberViews * 1;
			return await this.memberModel.findByIdAndUpdate(_id, { memberRank: rank });
		});
		await Promise.all(promisedList);
	}

	public getHello(): string {
		return 'Welcome to Nestar Batch API Server!';
	}
}
