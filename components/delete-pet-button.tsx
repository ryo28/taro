"use client";

import { deletePet } from "@/actions/pet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

//様々な場所で使い回せるようにしたい、Aページに遷移するなど明示すると使い勝手が悪くなる
//なので親コンポーネントで削除後の処理を渡せるようにするのもありかもしれない
export function DeletePetButton({ petId }: { petId: string }) {
    const router = useRouter();
    return (
        //variant="destructive"は削除ボタン用のスタイルを適用するため
        <Button variant="destructive" onClick={() => {
            deletePet(petId)//ペットを削除するサーバーアクションを呼び出す
            router.refresh();//削除した時にどのページにいても最新の状態に更新するためにリフレッシュを呼び出す
        }}>ペットを削除</Button>
    );
}