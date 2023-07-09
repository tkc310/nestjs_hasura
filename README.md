# NestJS x HASURAの素振り


## Introduction

```
# postgresqlコンテナ起動 (事前にdocker desktopを起動)  
$ docker-compose up -d

# envファイル追加
$ touch .env
$ echo 'DATABASE_URL="postgresql://root:secret@localhost:5432/nestjs_db"' >> .env
```
