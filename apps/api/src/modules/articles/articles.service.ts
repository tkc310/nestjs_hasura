import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateArticleInput } from './dto/create-article.input';
import { UpdateArticleInput } from './dto/update-article.input';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createArticleInput: CreateArticleInput) {
    const {
      title,
      content,
      published,
    } = createArticleInput;
    const data = { title, content, published };
    return this.prisma.article.create({ data });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: number) {
    const condition = { where: { id } };
    return this.prisma.article.findUnique(condition);
  }

  update(id: number, updateArticleInput: UpdateArticleInput) {
    const {
      title,
      content,
      published,
    } = updateArticleInput;
    const data = { title, content, published };
    console.log('--------------', id);
    return this.prisma.article.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
