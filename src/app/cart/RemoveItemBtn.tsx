'use client';

import { useState } from "react";
import { removeItemAction } from "./cart.actions";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";

export default function RemoveItemBtn({ id }: { id: string }) {
    
    const [isLoading, setIsLoading] = useState(false);

    async function handleRemoveItem() {
        setIsLoading(true);
        const res = await removeItemAction(id);

        if (res == 'Removed Item From Cart') {
            toast.success('Removed Item From Cart', {
                position: "top-center",
            });
        }
        else {
            toast.error("Couldn't Remove Item", {
                position: "top-center",

            });
        }

        setIsLoading(false);
    }


    return (
        <>

            <button
                onClick={handleRemoveItem}
                className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded-lg border-red-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                {isLoading ? <PulseLoader color="#ffffff" size={8} /> : 'Remove'}
            </button>

        </>
    )
}
