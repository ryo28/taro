import { PetCard } from "@/components/pet-card"
import { Pet } from "@/types/pet"

export default function PetsPage() {
    const mockPets: Pet[] = [
        { id: "1", name: "ポチ", type: "dog", hp: 50, ownerId: "1" },
        { id: "2", name: "タマ", type: "cat", hp: 40, ownerId: "2" },
        { id: "3", name: "モモ", type: "dog", hp: 30, ownerId: "3" },

    ]
    return (
        <div className="container py-10">
            <h1 className="text-2xl font-bold">ペット一覧</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {mockPets.map((pet) => (
                    <div key={pet.id} >
                        <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    )
}