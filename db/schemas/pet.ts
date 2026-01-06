import { relations } from "drizzle-orm";//relationsはテーブル同士の関係性を定義するために使う
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";
import { users } from "./auth";

//ペットの種類をenumで定義 enumとは列挙型のことで、特定の値の集合を定義するために使われるデータ型　
export const petTypeEnum = pgEnum("pet_type", ["dog", "cat"]);

//petsテーブルの定義
export const pets = pgTable("pets", {
  id:text("id").primaryKey()//primaryKeyとは 一番重要なカラムで、各レコードを一意に識別するためのもの
  .$defaultFn(() => nanoid()),//nanoidを使ってペットごとに独自の一意なIDを生成していく
  name: text("name").notNull(),
  type: petTypeEnum("type").notNull(),
  hp: integer("hp").notNull().default(50),
  // オーナーにはusersテーブルの誰かしらのidを必ず参照させる、それ以外のデータは入らない
  //onDelete cascadeはオーナー削除時にペットも削除されるようにするという意味
  ownerId: text("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

//ペットの飼い主誰なのかという情報も巻き添え的に持ってきたいのでrelationsを使う
//petとuserの関係性を定義している、petとuserは1対1の関係(one to one)
export const petRelations = relations(pets, ({ one }) => ({
    owner: one(users, {
        fields: [pets.ownerId],//「ペット」が持っている「飼い主の名札（外部キー）」
        references: [users.id],//「ユーザー」側の「本人のID」
    })
}));