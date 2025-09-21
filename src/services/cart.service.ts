import { ItemType } from "@/types/cart.type";
import { getUserToken } from "@/utils/token.utils";

export async function getUserCart() {
    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: token,
        },
        cache: 'force-cache',
    })

    const res = await response.json();

    return {
        numOfCartItems: res.numOfCartItems as number,
        products: res.data.products as ItemType[],
        totalCartPrice: res.data.totalCartPrice as number,
        cartId: res.cartId as string
    };
}