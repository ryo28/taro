"use server";//サーバーアクションを定義するためのディレクティブ

import { db } from "@/db";
import { pets } from "@/db/schemas/pet";
import { verifySession } from "@/lib/session";
import { PetFormData } from "@/types/pet";
import { petFormSchema } from "@/zod/pet";
import { and, eq } from "drizzle-orm";
//formData: PetFormDataはpetFormSchemaをinferした結果の型を使う　詳しくは後述する
//createPetはサーバーアクションとして動作し、フォームデータを受け取り、新しいペットをデータベースに挿入する非同期関数
export async function createPet(formData: PetFormData) {
    //formDataを受け取った以降の処理はすべてサーバー側で実行される
    //formData(ブラウザ)から受け取ったデータは改ざんされる可能性があるため、まずpetFormSchemaを使ってサーバー側でも検証を行う
    const data = petFormSchema.parse(formData);
    //parseはエラーが発生した場合はここで強制終了する、なのでdataは常に正しい値が入っていることが保証される

    const session = await verifySession();//verifySessionは現在のユーザーセッションを検証し、有効なセッション情報を取得する非同期関数

    //セッション情報から現在のユーザーIDを取得し、新しいペットのownerIdとして使用
    const ownerId = session.user.id;

    //db.insertはDrizzle ORMを使ってデータベースに新しいレコードを挿入するためのメソッド
    await db.insert(pets).values({ ...data, ownerId });
}

export async function updatePet(id: string, formData: PetFormData) {

    const data = petFormSchema.parse(formData);
    const session = await verifySession();
    const ownerId = session.user.id;

    await db
        //どのテーブルを更新するかを指定
        .update(pets)
        //この内容で更新するという意味
        //dataはformDataから受け取って検証済みの値で、ownerIdはセッション情報から取得した現在のユーザーID
        .set({ ...data, ownerId })
        //条件に一致するレコードに絞る
        .where(and(eq(pets.id, id), eq(pets.ownerId, ownerId)));
    //andは複数の条件を組み合わせるための関数
    //eqは等しいことを確認するための関数
    // (eq(pets.id, id)は、ペットのIDが指定されたIDと一致することを確認
    //eq(pets.ownerId, ownerId)は、ペットの所有者IDが現在のユーザーIDと一致することを確認
}

export async function deletePet(id: string) {
    //id: stringは削除したいペットのID、アクションで渡すことを想定
    const session = await verifySession();
    const ownerId = session.user.id;

    await db
        .delete(pets)
        .where(//where句が無いと全レコード削除されてしまうので注意
            and(
                eq(pets.id, id),
                eq(pets.ownerId, ownerId)
            )
        );
}