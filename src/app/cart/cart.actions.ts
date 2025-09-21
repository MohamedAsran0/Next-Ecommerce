'use server';

import axios from "axios";
import { getUserToken } from "@/utils/token.utils";
import { revalidatePath } from "next/cache";

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
        revalidatePath('/cart');
        return 'Added to Cart';
    } catch (error) {
        return error;
    }
}


export async function removeItemAction(id: string) {

    const tkn = await getUserToken();

    try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: tkn,
            }
        })
        revalidatePath('/cart');
        return 'Removed Item From Cart';
    } catch (error) {
        return error;
    }
}


export async function clearCartAction() {

    const tkn = await getUserToken();

    try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: tkn,
            }
        })
        revalidatePath('/cart');
        return 'Cleared Your Cart';
    } catch (error) {
        return error;
    }
}

export async function changeCountAction(count: number, id:string) {

    const tkn = await getUserToken();

    try {
        await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count: count
        }, {
            headers: {
                token: tkn,
            }
        })
        revalidatePath('/cart');
        return 'Item Count Changed';
    } catch (error) {
        return error;
    }
}

