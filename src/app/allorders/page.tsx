import { getUserOrders } from "@/services/orders.service";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function allorders() {

    const session = await getServerSession(authOptions)

    // console.log('serversession',session?.user.id);

    await fetch(`${process.env.MY_DOMAIN}api/revalidate-cart`);

    const allOrders = await getUserOrders(session?.user?.id);

    if (allOrders.length == 0) {
        return (
            <div className="container mx-auto px-5 py-16">
                <h2 className='text-3xl w-full text-center pb-20 pt-15'>No Orders Yet</h2>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-5 py-16">
            <h2 className="text-center font-extrabold text-5xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent  pb-20 pt-15">
                My Orders
            </h2>

            <div className="space-y-8">
                {allOrders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
                    >
                        {/* Order Summary */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                            <div>
                                <p className="font-semibold text-lg">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">Placed on {order.createdAt.slice(0, 10)}</p>
                            </div>
                            <div className="flex flex-col sm:items-end mt-4 sm:mt-0">
                                <p className="font-semibold text-gray-700">
                                    Total: ${order.totalOrderPrice}
                                </p>
                                <span
                                    className={`mt-1 px-3 py-1 text-sm rounded-full w-fit font-medium ${order.paymentMethodType === "cash"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {order.paymentMethodType}
                                </span>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-gray-200">
                            {order.cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center py-4 gap-4"
                                >
                                    <Image
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        width={80}
                                        height={80}
                                        className="rounded-lg border"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{item.product.title}</p>
                                        <p className="font-light">{item.product.brand.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.count}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-gray-700">
                                        ${item.price}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
