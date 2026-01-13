"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { petFormSchema } from "@/zod/pet";
import { createPet } from "@/actions/pet";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type petFormData = z.infer<typeof petFormSchema>;

export function PetForm() {
    const router = useRouter();
    const form = useForm<petFormData>({// react-hook-formのuseFormを使用してフォームの状態を管理
        resolver: zodResolver(petFormSchema),//formの検証はzodスキーマを使用
        defaultValues: {
            name: "",
            type: "dog",
            hp: 50,
        },
    });

    async function onSubmit(data: petFormData) {
        try {
            await createPet(data);
            toast("ペットが作成されました！", { description: `${data.name}を登録しました。` });
            router.push("/pets");
        } catch (error) {
            toast.error("エラーが発生しました", { description: "ペットの作成に失敗しました。" });
            console.error("Failed to create pet:", error);
        }
    }
    //formStateのisSubmittingなどを使う場合は必ず取り出して使わないと変更を検知しないと言われている
    const { isSubmitting } = form.formState;

    return (
        <Form {...form}>{/* ...formはreact-hook-formのuseFormから返されるオブジェクト */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
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
                <Button type="submit" disabled={isSubmitting} className="w-full">ペットを登録</Button>
            </form>
        </Form>
    );
}
