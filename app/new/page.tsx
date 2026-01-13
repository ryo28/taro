import { PetForm } from "@/components/pet-form"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "新規ペット追加",
}

export default function NewPage() {
    return (
        <div className="container py-10">
            <PetForm />
        </div>
    )
}