import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  // @ts-ignore
  prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
