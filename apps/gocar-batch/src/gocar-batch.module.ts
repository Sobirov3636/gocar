import { Module } from '@nestjs/common';
import { GocarBatchController } from './gocar-batch.controller';
import { GocarBatchService } from './gocar-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [GocarBatchController],
  providers: [GocarBatchService],
})
export class GocarBatchModule {}
