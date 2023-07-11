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

### GraphQL playground

<details>
  <summary>
    **query**
  </summary>

```
# input
query {
  articles {
    id
    title
  }
  article (id: 1) {
    title
  }
}

# output
{
  "data": {
    "articles": [
      {
        "id": "1",
        "title": "foo"
      },
      {
        "id": "2",
        "title": "記事3のタイトル"
      },
      {
        "id": "3",
        "title": "記事1のタイトル"
      },
      {
        "id": "4",
        "title": "記事2のタイトル"
      }
    ],
    "article": {
      "title": "foo"
    }
  }
}
```
</details>

<details>
  <summary>
    **mutation - create**
  </summary>

```
# input
mutation {
	createArticle (input: { title: "piyo", content: "poyo" }) {
    id
    title
  }
}

# output
{
  "data": {
    "createArticle": {
      "id": "5",
      "title": "piyo"
    }
  }
}
```
</details>

<details>
  <summary>
    **mutation - update**
  </summary>

```
# input
mutation {
	updateArticle (input: { id: 1, title: "piyo", content: "poyo" }) {
    id
    title
  }
}

# output
{
  "data": {
    "updateArticle": {
      "id": "1",
      "title": "piyo"
    }
  }
}
```
</details>


<details>
  <summary>
    **mutation - delete**
  </summary>

```
# input
mutation {
	removeArticle(id: 1) {
    id
    title
  }
}

# output
{
  "data": {
    "removeArticle": {
      "id": "1",
      "title": "foo"
    }
  }
}
```
</details>


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
    - 直下にnest-cli.json, tsconfig, src/, test/が生成される
    - デフォルトのtsconfigはdecorator有効、any制約無効などstrictよりは緩い
    - src/
      - controller ... プレゼンテーション, service呼び出し
      - service ... ユースケースロジック
      - main ... bootstrap, db/appサーバのシグナル制御
      - module ... application設定、ファイル同士の依存宣言
  - `$ npx nest add nestjs-prisma`
    - プロジェクト直下に `prisma/schema.prisma` が生成される
    - package.jsonにprisma関連のscriptsが追加される
    - package.jsonのprismaセクションにseedが追加される
      - schemaの場所などprisma関連ファイルのディレクトリ設定はここに追記すれば良さそう
  - `$ npx nest g resource modules/articles`
    - transport layer: GraphQL code firstを選択
    - CRUD entry pointsの生成: yを選択
      - src/modules/articles
        - dto/ ... インプットタイプの宣言・パラメータ型、バリデーション
          - create-article.input.ts
          - update-article.input.ts
        - entities/
          - article.entity.ts ... オブジェクトタイプ、フィールドの宣言
        - article.module.ts ... resolver / serviceを束ねてappに登録
        - article.resolver.ts ... プレゼンテーション, GraphQL I/F (ルート型Query/Mutationの宣言、フィールドとユースケースメソッドのマッピング)
        - article.service.ts ... ユースケース兼リポジトリ
- [nestjs graphql quick start](https://docs.nestjs.com/graphql/quick-start#installation)
  - 公式の方が正しそう


