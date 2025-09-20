import { allProductsOptionsType, ProductType } from "@/types/product.type";


const optionsDefaultValues : allProductsOptionsType = {
    page : 1,
    limit : 40
}


export async function getAllProducts(options: allProductsOptionsType = optionsDefaultValues): Promise<ProductType[]> {

    const { page , limit , brand, category, subcategory } = options;

    const query = new URLSearchParams();

    if (page) query.append("page", page.toString());
    if (limit) query.append("limit", limit.toString());

    console.log(page);
    

    if (brand) query.append("brand", brand);
    if (category) query.append("category", category);
    if (subcategory) query.append("subcategory", subcategory);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${query.toString()}`, {
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