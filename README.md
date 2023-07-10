# NestJS x HASURAの素振り


## Introduction

```
# apply pre-push githook (lefthook)
$ githooks:sync

# node & npm
$ nodenv install 18.13.0
$ nodenv rehash
$ npm i

# terminate postgresql docker container (Launch docker desktop in advance)  
$ docker-compose up -d

# add secret env file
$ touch .env
$ echo 'DATABASE_URL="postgresql://root:secret@localhost:5432/nestjs_db"' >> .env

$ cd apps/api
# migration & upsert prisma client
$ npm run db:migrate:dev
# add fixture data
$ npm run db:fixture
```

## Usage

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Refs & Memo
- [Hasura + NestJS + Next.jsでの爆速開発構成](https://tech.aisaac.jp/entry/2022/11/11/093737)
- [銀の弾丸は存在しないHasura編](https://tech.aisaac.jp/entry/2023/04/25/094023)
  - hasuraのremote schemaを利用してnestjsのgraphqlエンドポイントと連携している
  - クライアントから見てhasuraが一番前段になる構成
  - hasura cloudでレスポンスをキャッシュする (キーはpayloadのハッシュ値、なおremote schemaのクエリはキャッシュできない?)
  - hasuraインスタンスは起動時にNestJSのGraphQLエンドポイントからremote schema(GraphQL Introspection)を取得してキャッシュする
    - NestJSデプロイ
      - DBマイグレーション
      - schema更新
    - Hasuraデプロイ (remote schema取得・キャッシュ更新)
    - 後方互換性が無い破壊的変更はhasuraも含めたblue/greenデプロイが最適となる
- [NestJS+Prisma+prisma-nestjs-graphqlで快適なGraphQL環境構築](https://zenn.dev/mano_r/articles/8d25be4b4452dd)
  - `$ cd apps && npx nest new api`
  - `$ npx nest add nestjs-prisma`
    - プロジェクト直下に `prisma/schema.prisma` が生成される
    - package.jsonにprisma関連のscriptsが追加される
    - package.jsonのprismaセクションにseedが追加される
      - schemaの場所などprisma関連ファイルのディレクトリ設定はここに追記すれば良さそう
    
