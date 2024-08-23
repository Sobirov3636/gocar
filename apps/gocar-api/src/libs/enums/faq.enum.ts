import { registerEnumType } from '@nestjs/graphql';

export enum FaqCategory {
	PROPERTY = 'PROPRTY',
	PAYMENTS = 'PAYMENTS',
	BUYERS = 'BUYERS',
	DEALERS = 'DEALERS',
	MEMBERSHIP = 'MEMBERSHIP',
	COMMUNITY = 'COMMUNITY',
	OTHER = 'OTHER',
}

registerEnumType(FaqCategory, {
	name: 'FaqCategory',
});

export enum FaqStatus {
	HOLD = 'HOLD',
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(FaqStatus, {
	name: 'FaqStatus',
});
