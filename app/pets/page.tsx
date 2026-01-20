import { PetCard } from "@/components/pet-card"
import { PetSearchForm } from "@/components/pet-search-form"
import { getPets, SearchPets } from "@/data/pet"
import { createLoader, parseAsString } from "nuqs/server"

//nameクエリパラメータを文字列として解析するローダーを作成
export const loadSearchParams = createLoader({ name: parseAsString.withDefault("") })

export default async function PetsPage({ searchParams }: PageProps<"/pets">) {
    // const name = (await searchParams).name as string; //面倒くさいのでnuqsのloaderを使う

    //searchParamsからnameを取得
    const { name } = await loadSearchParams(searchParams);

    //nameがあればSearchPets、なければgetPetsを呼び出し
    const pets = name ? await SearchPets(name) : await getPets();

    return (
        <div className="container py-10">
            <PetSearchForm />
            <h1 className="text-2xl font-bold">ペット一覧</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {pets.map((pet) => (
                    <div key={pet.id} >
                        <PetCard pet={pet} />
                    </div>
                ))}
            </div>
        </div>
    )
}