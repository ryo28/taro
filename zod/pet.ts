import { pets, petType } from "@/db/schemas/pet";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const petFormSchema = createInsertSchema(pets, {
    //最大値と最小値のバリデーションを追加
    hp: z.number().min(0, "hpは0から100の間で入力してください").max(100, "hpは0から100の間で入力してください"),
    //trim()で前後の空白を削除し、min(1)で1文字以上の入力を要求
    name: z.string().trim().min(1, "名前は1文字以上で入力してください"),
    //petType配列を使ってenumバリデーションを追加
    type: z.enum(petType),
}).omit({ ownerId: true });//ownerIdはフォームから送信されないのでomitで除外