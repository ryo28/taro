import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './db/migrations',//どこにマイグレーションファイルを保存するか
  schema: './db/schemas/*.ts',//どこにスキーマがあるか データベースの設計書みたいなもの
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
