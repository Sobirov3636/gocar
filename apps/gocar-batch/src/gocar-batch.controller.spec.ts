import { Test, TestingModule } from '@nestjs/testing';
import { GocarBatchController } from './gocar-batch.controller';
import { GocarBatchService } from './gocar-batch.service';

describe('GocarBatchController', () => {
  let gocarBatchController: GocarBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GocarBatchController],
      providers: [GocarBatchService],
    }).compile();

    gocarBatchController = app.get<GocarBatchController>(GocarBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(gocarBatchController.getHello()).toBe('Hello World!');
    });
  });
});
