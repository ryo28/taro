import "server-only";
import { db } from "@/db";
import { pets } from "@/db/schemas/pet";
import { and, eq } from "drizzle-orm";
import { verifySession } from "@/lib/session";
//ドリズルを使ってデータ取得を行うのでサーバー専用モジュールであることを宣言

export const getPets = async () => {
    //誰でも見れるペット一覧を取得するので認証は不要
    return db.query.pets.findMany();
    //db.query.pets.findMany()はDrizzle ORMを使ってpetsテーブルからすべてのペットを取得する非同期関数
}

//特定のペットをIDで取得する関数
export const getPet = async (id: string) => {
return db.query.pets.findFirst({//findFirstは条件に一致する最初のレコードを取得
    where: eq(pets.id, id)
})
}

//現在のユーザーが特定のペットの所有者かどうかを確認する関数
export const isPetOwner = async (id: string) => {
    const session = await verifySession();
    const ownerId = session.user.id;
//Drizzle ORMを使ってpetsテーブルから特定のペットを取得
    const pet = await db.query.pets.findFirst({
    where: and(eq(pets.id, id), eq(pets.ownerId, ownerId)),
})
    return pet !== undefined;//ペットが存在すればtrue、存在しなければfalseを返す
}