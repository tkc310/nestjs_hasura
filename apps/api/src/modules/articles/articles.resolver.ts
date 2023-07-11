import { CreateArticleInput } from '@/modules/articles/dto/create-article.input';
import { UpdateArticleInput } from '@/modules/articles/dto/update-article.input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) { }

  @Mutation(() => Article)
  createArticle(@Args('input') createArticleInput: CreateArticleInput) {
    return this.articlesService.create(createArticleInput);
  }

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.findOne(id);
  }

  @Mutation(() => Article)
  updateArticle(@Args('input') updateArticleInput: UpdateArticleInput) {
    const id = Number(updateArticleInput.id);
    return this.articlesService.update(id, updateArticleInput);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    const _id = Number(id);
    return this.articlesService.remove(_id);
  }
}
