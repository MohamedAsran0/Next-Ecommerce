import { BrandType } from "@/types/product.type";


export async function getAllBrands(page: 1 | 2 = 1, limit: number = 40): Promise<BrandType[]> {

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands?page=${page}&limit=${limit}`, {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 * 5 }
    });
    const { data } = await res.json();
    return data;
}
