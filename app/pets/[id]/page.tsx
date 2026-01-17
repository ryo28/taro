import { DeletePetButton } from "@/components/delete-pet-button";
import { PetCard } from "@/components/pet-card";
import { PetForm } from "@/components/pet-form";
import { getPet } from "@/data/pet";
import { redirect } from "next/navigation";
//PageProps型はルートパラメータの型情報を提供Next.js15で導入された型
export default async function PetPage({ params }: PageProps<"/pets/[id]">) {
    const petId = (await params).id;
    const pet = await getPet(petId);

    if (!pet) {
        // notFound();//ペットが見つからなかった場合404ページを表示
        redirect("/pets");//ペットが見つからなかった場合ペット一覧ページにリダイレクト
    }
    return (
        <div className="container py-10">
            <PetCard pet={pet} />
            <PetForm defaultValues={pet} />
            {/* 本来一番いい方法は親コンポーネントで削除後の処理を渡すことonDeleteをpropsで渡す */}
            <DeletePetButton petId={pet.id} />
        </div>
    )
}