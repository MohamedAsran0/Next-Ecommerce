import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { getAllProducts } from '@/services/products.service';
import React from 'react'

export default async function brandProducts({ params }: { params: { id: string } }) {

    const { id } = await params;

    const products = await getAllProducts({
        brand: id,
    })

    return (
        <>
            <div className='container w-11/12 mx-auto py-16'>
            
                {products.length != 0 && <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>{products[0].brand.name}</h2>}

                {products.length == 0 && <h3 className='text-3xl w-full text-center'>No Products For This Brand</h3>}

                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {products.map(product => <ProductCard key={product.id} product={product} />)}
                </div>

            </div>
        </>
    )
}
