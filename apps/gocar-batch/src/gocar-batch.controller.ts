import { Controller, Get } from '@nestjs/common';
import { GocarBatchService } from './gocar-batch.service';

@Controller()
export class GocarBatchController {
  constructor(private readonly gocarBatchService: GocarBatchService) {}

  @Get()
  getHello(): string {
    return this.gocarBatchService.getHello();
  }
}
