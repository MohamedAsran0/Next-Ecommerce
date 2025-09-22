'use client';

import { addWishlistProduct, removeWishlistProduct } from "@/app/wishlist/wishlist.action";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";


export default function WishListBtn({ id, isInWishlist = false }: { id: string, isInWishlist: boolean }) {

    const session = useSession();

    const [wishlisted, setWishlisted] = useState(isInWishlist)

    const [isListedLoading, setIsListedLoading] = useState(false);
    const [isNotListedLoading, setIsNotListedLoading] = useState(false);

    async function handleAddWishlist() {

        setIsNotListedLoading(true);
        const res = await addWishlistProduct(id);

        if (res == 'Product added successfully to your wishlist') {
            toast.success('Product added successfully to your wishlist', {
                position: "top-center",
            });
            setWishlisted(true);
        }
        else {
            toast.error("Couldn't add to Wishlist", {
                position: "top-center",

            });
        }

        setIsNotListedLoading(false);

    }

    async function handleRemoveWishlist() {

        setIsListedLoading(true);
        const res = await removeWishlistProduct(id);

        if (res == 'Product removed successfully from your wishlist') {
            toast.success('Product removed successfully from your wishlist', {
                position: "top-center",
            });
            setWishlisted(false);
        }
        else {
            toast.error("Couldn't remove from Wishlist", {
                position: "top-center",

            });
        }

        setIsListedLoading(false);

    }

    return (
        <>
            {
                session.status == 'authenticated' && wishlisted &&
                <button
                    onClick={handleRemoveWishlist}
                    className={'text-red-500 fill-red-400 cursor-pointer'}>
                    {isListedLoading ? <ClipLoader /> : <FaHeart />}
                </button>
            }

            {
                session.status == 'authenticated' && !wishlisted &&
                <button
                    onClick={handleAddWishlist}
                    className={'text-gray-600 cursor-pointer'}>
                    {isNotListedLoading ? <ClipLoader /> : <FaHeart />}
                </button>
            }


        </>
    )
}
