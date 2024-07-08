import { NestFactory } from '@nestjs/core';
import { GocarBatchModule } from './gocar-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(GocarBatchModule);
  await app.listen(3000);
}
bootstrap();
