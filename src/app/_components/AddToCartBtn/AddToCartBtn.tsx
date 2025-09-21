'use client';

import { addToCartAction } from "@/app/cart/cart.actions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "sonner";



export default function AddToCartBtn({ id }: { id: string }) {

    const session = useSession();

    const [isLoading, setIsLoading] = useState(false);

    async function handleAddToCart() {
        setIsLoading(true);
        const res = await addToCartAction(id);

        if (res == 'Added to Cart') {
            toast.success('Added to Cart', {
                position: "top-center",
            });
        }
        else {
            toast.error("Couldn't add to Cart", {
                position: "top-center",

            });
        }

        setIsLoading(false);

    }

    return (
        <>
            {session.status == 'authenticated' && <button
                onClick={handleAddToCart}
                className="cursor-pointer transition-all bg-green-500 text-white px-6 py-2 rounded-lg border-green-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                {isLoading ? <PulseLoader color="#ffffff" size={8} /> : 'Add to cart'}
            </button>}


        </>
    )
}
