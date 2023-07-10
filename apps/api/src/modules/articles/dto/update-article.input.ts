import { CreateArticleInput } from './create-article.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID, {nullable:false})
  id!: number;

  @Field(() => String, {nullable:false})
  title!: string;

  @Field(() => String, {nullable:false})
  content!: string;

  @Field(() => Boolean, {nullable:false,defaultValue:false})  published!: boolean;

}
