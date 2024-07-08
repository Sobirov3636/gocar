import { Module } from '@nestjs/common';
import { GocarBatchController } from './gocar-batch.controller';
import { GocarBatchService } from './gocar-batch.service';

@Module({
  imports: [],
  controllers: [GocarBatchController],
  providers: [GocarBatchService],
})
export class GocarBatchModule {}
