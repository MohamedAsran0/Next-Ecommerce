"use client";

import { Card } from "flowbite-react";
import Image from "next/image";
import { CategoryType } from '@/types/product.type';
import Link from "next/link";

type CategoryCardProps = {
    category: CategoryType,
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <>

            <Link href={`/categories/products/${category._id}`}>

                <Card
                    className="w-full hover:scale-105 transition-all duration-150  overflow-hidden bg-gray-500 cursor-pointer"
                    renderImage={() => <Image width={250} height={200} priority={false} src={category.image} alt={category.name} className="w-full h-64" />}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-black dark:text-white text-center py-0">
                        {category.name}
                    </h5>
                </Card>

            </Link>


        </>
    )
}
