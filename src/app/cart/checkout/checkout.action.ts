'use server';

import { CheckoutUserType } from "@/types/user.type";
import { getUserToken } from "@/utils/token.utils";
import axios from "axios";
import { revalidatePath } from "next/cache";

export async function cashPaymentAction(values : CheckoutUserType, id: string) {

    const token = await getUserToken();

    try {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,{
            shippingAddress: values
        }, {
            headers: {
                token: token
            }
        });

        revalidatePath('/cart');

        return "success"
        
    } catch (error) {
        return error
    }
}


export async function creditPaymentAction(values : CheckoutUserType, id: string) {

    const token = await getUserToken();

    try {
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,{
            shippingAddress: values
        }, {
            headers: {
                token: token
            }
        });
        
        return res.data.session.url
        
    } catch (error) {
        return 'failed'
    }
}