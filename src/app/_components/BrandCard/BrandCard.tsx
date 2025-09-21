"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { BrandType } from '@/types/product.type';
import Link from "next/link";

type BrandCardProps = {
    brand: BrandType,
}

export default function BrandCard({ brand }: BrandCardProps) {
    return (
        <>

            <Link href={`/brands/products/${brand._id}`}>

                <Card
                    className="w-full hover:scale-105 transition-all duration-150  overflow-hidden bg-gray-500 cursor-pointer"
                    renderImage={() => <Image width={250} height={200} priority={false} src={brand.image} alt={brand.name} className="w-full h-64" />}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white text-center py-0">
                        {brand.name}
                    </h5>
                </Card>

            </Link>


        </>
    )
}
