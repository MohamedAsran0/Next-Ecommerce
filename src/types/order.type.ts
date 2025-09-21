import { ItemType } from "./cart.type"

export type OrderType = {
    totalOrderPrice: number,
    paymentMethodType:string,
    id: string,
    createdAt:string,
    cartItems: ItemType[],
}