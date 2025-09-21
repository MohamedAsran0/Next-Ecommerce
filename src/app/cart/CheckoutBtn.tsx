'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { PulseLoader } from 'react-spinners';


export default function CheckoutBtn() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    function handleCheckout() {
        startTransition(() => {
            router.push('/checkout');
        })
    }


    return (
        <>
            <button
                onClick={handleCheckout}
                className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                {isPending ? <PulseLoader color="#ffffff" size={8} /> : 'Proceed to Checkout'}
            </button>
        </>
    )
}
