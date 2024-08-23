import { registerEnumType } from '@nestjs/graphql';

export enum LikeGroup {
	MEMBER = 'MEMBER',
	PROPERTY = 'PROPERTY',
	ARTICLE = 'ARTICLE',
	BOARD_ARTICLE = 'BOARD_ARTICLE',
}
registerEnumType(LikeGroup, {
	name: 'LikeGroup',
});
