import { PetCard } from "@/components/pet-card";
import { PetForm } from "@/components/pet-form";
import { getPet } from "@/data/pet";
import { notFound } from "next/navigation";
//PageProps型はルートパラメータの型情報を提供Next.js15で導入された型
export default async function PetPage({ params }: PageProps<"/pets/[id]">) {
    const petId = (await params).id;
    const pet = await getPet(petId);

    if (!pet) {
        notFound();//ペットが見つからなかった場合404ページを表示
    }
    return (
        <div className="container py-10">
            <PetCard pet={pet} />
            <PetForm defaultValues={pet} />
        </div>
    )
}