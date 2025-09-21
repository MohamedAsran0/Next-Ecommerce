'use server';

import axios from "axios";
import { getUserToken } from "@/utils/token.utils";

export async function addToCartAction(id: string) {

    const tkn = await getUserToken();

    try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            productId: id
        }, {
            headers: {
                token: tkn,
            }
        })
        return 'Added to Cart';
    } catch (error) {
        return error;
    }
}
