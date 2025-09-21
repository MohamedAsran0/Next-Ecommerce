
import { getUserCart } from "@/services/cart.service";
import Image from "next/image";
import RemoveItemBtn from "./RemoveItemBtn";
import ClearCartBtn from "./ClearCartBtn";
import ChangeCount from './ChangeCount';
import CheckoutBtn from "./CheckoutBtn";

export default async function cart() {

  const {numOfCartItems, products, totalCartPrice} = await getUserCart();

  return (
    <div className="container mx-auto py-20 px-5">
      {/* Header */}
      <h2 className="mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5">
        Your Cart
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white shadow rounded-xl p-4 gap-6"
            >
              {/* Image */}
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                width={120}
                height={120}
                className="rounded-lg object-cover"
              />

              {/* Details */}
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.product.title}</h2>

                <p className="text-gray-500">Price: ${item.price}</p>

                {/* Quantity selector */}
                <ChangeCount count={item.count} id={item.product.id} />
              </div>

              {/* Remove Item */}
              <RemoveItemBtn id={item.product.id}/>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Items</span>
            <span>{numOfCartItems}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalCartPrice}</span>
          </div>

          {/* Clear Cart Button */}
          <ClearCartBtn />

          {/* Checkout Button */}
          <CheckoutBtn />
        </div>
      </div>
    </div>
  );
}
