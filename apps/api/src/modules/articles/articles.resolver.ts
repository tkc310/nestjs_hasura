import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

@Resolver(() => Article)
export class ArticlesResolver {
  constructor(private readonly articlesService: ArticlesService) { }

  // @Mutation(() => Article)
  // createArticle(@Args('createArticleInput') createArticleInput: CreateArticleInput) {
  //   return this.articlesService.create(createArticleInput);
  // }

  @Query(() => [Article], { name: 'articles' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Query(() => Article, { name: 'article' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.findOne(id);
  }

  // @Mutation(() => Article)
  // updateArticle(@Args('updateArticleInput') updateArticleInput: UpdateArticleInput) {
  //   return this.articlesService.update(updateArticleInput.id, updateArticleInput);
  // }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articlesService.remove(id);
  }
}
