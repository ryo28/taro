import { Pet, PetType } from "@/types/pet";
import { Card, CardContent, CardFooter } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
//親からデータを受け取るので単体テスト可能、内部でデータ取得はしない
export function PetCard({ pet }: { pet: Pet }) {
    //user-card.tsxを参考に実装するpet.tsからimportした型を使う

    // ペットの種類を日本語にマッピング
    const getPetTypeLabel = (type: PetType) => {
        const typeMap: Record<PetType, string> = {
            dog: "犬",
            cat: "猫",
        };
        return typeMap[type] || type;
    };

    // HPに応じてゲージの色を決定
    const getHpColor = (hp: number) => {
        if (hp > 50) return "bg-green-500"; // 50以上は緑
        if (hp > 25) return "bg-yellow-500"; // 25以上50以下は黄色
        return "bg-red-500"; // 25未満は赤
    };

    return (
        <Card>
            <CardContent>
                <h2 className="text-lg font-bold">{pet.name}</h2>
                <p className="text-sm text-muted-foreground break-all">{getPetTypeLabel(pet.type)}</p>
                <div className="mt-3 space-y-1">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">HP</p>
                        <p className="text-sm font-semibold">{pet.hp}/100</p>
                    </div>
                    <div className="bg-muted relative h-2 w-full overflow-hidden rounded-full">
                        <div
                            role="progressbar"
                            className={cn(
                                "h-full transition-all",
                                getHpColor(pet.hp)
                            )}
                            style={{ width: `${pet.hp}%` }}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                {/*本来はbuttonの中にaタグは入れられないので asChildを使うことでButtonのスタイルを維持したままLinkコンポーネントをラップできる */}
                <Button asChild>
                    {/* 動的ルートなのでユーザーの動きに応じてURLが変わる */}
                    <Link href={`/pets/${pet.id}`}>編集</Link>
                </Button>
            </CardFooter>
        </Card>
    );

}