import { OrderType } from "@/types/order.type";



export async function getUserOrders(userId: string): Promise<OrderType[]> {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    const res = await response.json();
    const reversed = [...res].reverse()
    return reversed;
}