'use server';

import { getUserToken } from "@/utils/token.utils";
import axios from "axios";
import { revalidateTag } from "next/cache";

export async function addWishlistProduct(id : string) {
    const token = await getUserToken();
    
    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId : id
        }, {
            headers: {
                token: token
            }
        })

        revalidateTag('wishlist');

        return 'Product added successfully to your wishlist'
    } catch (error) {
        return error;
    }
}



export async function removeWishlistProduct(id : string) {
    const token = await getUserToken();
    
    try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: token
            }
        })

        revalidateTag('wishlist');

        return 'Product removed successfully from your wishlist'
    } catch (error) {
        return error;
    }
}