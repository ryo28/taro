import { pets } from "@/db/schemas/pet";

//$inferSelect とは？
//これは Drizzle ORM の非常に便利な機能で、「データベースのスキーマ定義（pets）から、自動的に TypeScript の型（Pet）を作ってくれる」 というものです。
//typeofで値を型に変換できる
export type Pet = typeof pets.$inferSelect;