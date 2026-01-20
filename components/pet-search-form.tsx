"use client";

import { debounce, useQueryState } from 'nuqs'
import { Input } from './ui/input';

export function PetSearchForm() {
    const [name, setName] = useQueryState("name", {
        defaultValue: "",
        shallow: false,//falseにすることで検索時に反映させることができる
    });

    return (
        <div>
            {/* 入力された名前で検索、500msのディレイを設けてURLの更新を制限 */}
            <Input value={name} onChange={e => setName(e.target.value, {
                limitUrlUpdates: e.target.value === '' ? undefined : debounce(500)
            })} />
        </div>
    )
}