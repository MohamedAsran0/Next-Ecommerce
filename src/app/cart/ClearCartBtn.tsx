'use client';

import { useState } from "react";
import { clearCartAction } from "./cart.actions";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";

export default function ClearCartBtn() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleRemoveItem() {
        setIsLoading(true);
        const res = await clearCartAction();

        if (res == 'Cleared Your Cart') {
            toast.success('Cleared Your Cart', {
                position: "top-center",
            });
        }
        else {
            toast.error("Couldn't Clear Cart", {
                position: "top-center",

            });
        }

        setIsLoading(false);
    }


    return (
        <>

            <button
                onClick={handleRemoveItem}
                className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
                {isLoading ? <PulseLoader color="#ffffff" size={8} /> : 'Clear Cart'}
            </button>

        </>
    )
}
