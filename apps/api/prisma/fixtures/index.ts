import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  console.info('start');

  [...Array(3)].forEach(async (_, idx) => {
    const num = idx + 1;
    
    await prisma.article.create({
      data: {
        title: `記事${num}のタイトル`,
        content: `記事${num}の本文`,
        published: false,
      }
    });
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('end');
  });
