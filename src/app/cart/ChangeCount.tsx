"use client";

import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";
import { changeCountAction } from "./cart.actions";

export default function ChangeCount({ count, id }: { count: number, id: string }) {
    const [counter, setCounter] = useState(count);
    const [isLoading, setIsLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false)

    async function handleChangeCount() {
        setIsLoading(true);
        const res = await changeCountAction(counter, id);

        if (res == 'Item Count Changed') {
            toast.success('Item Count Changed', {
                position: "top-center",
            });
        }
        else {
            toast.error("Couldn't Update Count", {
                position: "top-center",

            });
        }

        setIsLoading(false);
        setIsDirty(false);
    }

    return (
        <>
            <div className="flex items-center gap-3 mt-2">
                <button
                    onClick={() => {
                        setCounter(counter - 1);
                        setIsDirty(true);
                    }}
                    disabled={counter == 1}
                    className="px-3.5 py-1 border rounded-full bg-red-600 text-white hover:bg-red-700 transition">-</button>
                <span>{counter}</span>
                <button
                    onClick={() => {
                        setCounter(counter + 1);
                        setIsDirty(true);
                    }}
                    className="px-3.5 py-1 border rounded-full bg-green-600 text-white hover:bg-green-700 transition">+</button>

                {isDirty && <button
                    onClick={handleChangeCount}
                    className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    {isLoading ? <PulseLoader color="#ffffff" size={8} /> : 'Submit Changes'}
                </button>}

            </div>

        </>
    )
}
