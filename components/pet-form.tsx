"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { petFormSchema } from "@/zod/pet";
import { createPet, updatePet } from "@/actions/pet";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Pet } from "@/types/pet";

type petFormData = z.infer<typeof petFormSchema>;

export function PetForm({ defaultValues }: { defaultValues?: Pet }) {
    const router = useRouter();
    const form = useForm<petFormData>({// react-hook-formのuseFormを使用してフォームの状態を管理
        resolver: zodResolver(petFormSchema),//formの検証はzodスキーマを使用
        defaultValues: defaultValues ?? {//propsでデフォルト値が渡されなかった場合の初期値
            name: "",
            type: "dog",
            hp: 50,
        },
    });

    async function onSubmit(data: petFormData) {//dataはformの入力値
        try {
            if (defaultValues) {
                await updatePet(defaultValues.id, data);
            } else {
                await createPet(data);
                form.reset();//フォームを初期状態にリセット,なぜ必要なのか：新しいペットを作成した後、フォームの入力フィールドを空にして、ユーザーが続けて新しいペットを追加できるようにするため
            }
            toast(`ペットが${defaultValues ? "更新されました" : "作成されました"}`, { description: `${data.name}を${defaultValues ? "更新" : "追加"}しました。` });
            router.refresh();//データの変更を反映するためにページをリフレッシュ
        } catch (error) {
            toast.error("エラーが発生しました", { description: `ペットの${defaultValues ? "更新" : "作成"}に失敗しました。` });
            console.error(defaultValues ? "update pet:" : "create pet:", error);
        }
    }
    //formStateのisSubmittingなどを使う場合は必ず取り出して使わないと変更を検知しないと言われている
    const { isSubmitting } = form.formState;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{defaultValues ? "ペットを編集" : "新しいペットを追加"}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>{/* ...formはreact-hook-formのuseFormから返されるオブジェクト */}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">{/*onSubmitメソッドは、formタグのonSubmitイベントハンドラに渡されます。
    submit = フォームの送信ボタンが押されたとき*/}
                        <FormField
                            control={form.control}//これで全てのフィールドが同じフォーム管理ルールで動作します。
                            name="name"//フォームフィールドの名前
                            render={({ field }) => (//フィールドのレンダリング方法を定義する関数
                                <FormItem>
                                    <FormLabel>ペットの名前</FormLabel>
                                    <FormControl>
                                        <Input autoComplete="off" placeholder="例: ポチ" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        ペットの名前を入力してください
                                    </FormDescription>
                                    {<FormMessage />/*エラーメッセージを表示するコンポーネント */}
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ペットの種類</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="種類を選択" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* ペットの種類の選択肢 */}
                                            <SelectItem value="dog">犬</SelectItem>
                                            <SelectItem value="cat">猫</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        ペットの種類を選択してください
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="hp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            autoComplete="off"// ブラウザの自動補完をオフにする
                                            type="number"
                                            min="0"// テキストボックスに入力できる最小値
                                            max="100"// テキストボックスに入力できる最大値
                                            placeholder="50"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        ペットのHPを0から100の間で入力してください
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* disabled={isSubmitting}　連打防止のため */}
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {defaultValues ? "ペットを更新" : "ペットを追加"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
