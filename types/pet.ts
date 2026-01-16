import { pets } from "@/db/schemas/pet";
import { petFormSchema } from "@/zod/pet";
import { z } from "zod";
//$inferSelect とは？
//これは Drizzle ORM の非常に便利な機能で、「データベースのスキーマ定義（pets）から、自動的に TypeScript の型（Pet）を作ってくれる」 というものです。
//typeofで値を型に変換できる
export type Pet = typeof pets.$inferSelect;
//Pet["type"]でPet型の中のtypeプロパティの型を取り出してPetTypeとしてエクスポート
export type PetType = Pet["type"];
//petFormSchemaの検証結果の型をPetFormDataとしてエクスポート
export type PetFormData = z.infer<typeof petFormSchema>;