import { Module } from '@nestjs/common';
import { BoardArticleResolver } from './board-article.resolver';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import BoardArticleSchema from '../../schemas/BoardArticle.model';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: 'BoardArticle',
				schema: BoardArticleSchema,
			},
		]),
		AuthModule,
		ViewModule,
		MemberModule,
	],
	providers: [BoardArticleResolver, BoardArticleService],
	exports: [BoardArticleService],
})
export class BoardArticleModule {}
