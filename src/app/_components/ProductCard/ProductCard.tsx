"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { ProductType } from '@/types/product.type';
import ProductLink from "../ProductLink/ProductLink";
import AddToCartBtn from "../AddToCartBtn/AddToCartBtn";

type ProductCardProps = {
    product: ProductType,
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <>

            <Card
                className="w-full hover:scale-105 transition-all duration-150  overflow-hidden relative"
                renderImage={() => <Image width={250} height={200} priority={false} src={product.imageCover} alt={product.title} className="w-full h-64" />}
            >
                <p className="absolute top-2 right-2 p-2 bg-amber-300">{product.ratingsAverage}</p>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {product.category.name}
                </p>

                {!!product.priceAfterDiscount && <p className="font-normal dark:text-gray-400">
                    Price: <span className="text-red-600 line-through opacity-60">{product.price}</span> <span className="text-green-600">{product.priceAfterDiscount}</span> $
                </p>}

                {!!!product.priceAfterDiscount && <p className="font-normal dark:text-gray-400">
                    Price: <span className="text-green-600">{product.price}</span> $
                </p>}



                <ProductLink id={product.id} />
                <AddToCartBtn id={product.id} />
            </Card>


        </>
    )
}
