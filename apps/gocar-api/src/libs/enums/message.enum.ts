import { registerEnumType } from '@nestjs/graphql';

export enum MessageStatus {
	READ = 'READ',
	WAIT = 'WAIT',
}
registerEnumType(MessageStatus, {
	name: 'MessageStatus',
});
