import { Injectable } from '@nestjs/common';

@Injectable()
export class GocarBatchService {
  getHello(): string {
    return 'Welcome to GoCar Batch API Server!';
  }
}
