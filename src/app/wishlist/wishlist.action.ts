'use server';

import { getUserToken } from "@/utils/token.utils";
import axios from "axios";

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
        
        return 'Product added successfully to your wishlist'
    } catch (error) {
        return error;
    }
}