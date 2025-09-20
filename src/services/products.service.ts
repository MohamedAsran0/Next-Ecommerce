import { ProductType } from "@/types/product.type";

export async function getAllProducts(page: 1 | 2 = 1): Promise<ProductType[]> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`, {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 * 5 }
    });
    const { data } = await res.json();
    return data;
}

export async function getSpecificProduct(id: string): Promise<ProductType> {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 * 5 }
    });
    const { data } = await res.json();
    return data;
}