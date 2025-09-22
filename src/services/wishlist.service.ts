
import { ProductType } from "@/types/product.type";
import { getUserToken } from "@/utils/token.utils";

export async function getUserWishlist(): Promise<ProductType[]> {
    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
            token: token,
        },
        cache: 'force-cache',
        next: {
            tags: ['wishlist'],
        }
    })

    const res = await response.json();

    return res.data;
}