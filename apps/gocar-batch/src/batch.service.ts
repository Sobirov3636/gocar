import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {
	getHello(): string {
		return 'Welcome to Nestar Batch API Server!';
	}
}
