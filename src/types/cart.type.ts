import { ProductType } from "./product.type"

export type ItemType = {
    count: number,
    _id: string,
    price: number,
    product: ProductType,
}