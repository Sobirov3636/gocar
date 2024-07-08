import { NestFactory } from '@nestjs/core';
import { GocarBatchModule } from './gocar-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(GocarBatchModule);
  await app.listen(process.env.PORT_BATCH ?? 3000);
}
bootstrap();
