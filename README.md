# NestJS x HASURAの素振り


## Introduction

```
# postgresqlコンテナ起動 (事前にdocker desktopを起動)  
$ docker-compose up -d

# envファイル追加
$ touch .env
$ echo 'DATABASE_URL="postgresql://root:secret@localhost:5432/nestjs_db"' >> .env
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
