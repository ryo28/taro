import { Pet } from "@/types/pet";
import { Card, CardContent } from "./ui/card";

export function PetCard({ pet }: { pet: Pet }) {
    //user-card.tsxを参考に実装するpet.tsからimportした型を使う
    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-bold">{pet.name}</h2>
                <p className="text-sm text-muted-foreground break-all">{pet.type}</p>
                <p className="text-sm text-muted-foreground break-all">{pet.hp}</p>
            </CardContent>
        </Card>
    );

}