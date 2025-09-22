import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getAllProducts } from '@/services/products.service';
import { getUserWishlist } from '@/services/wishlist.service';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function categoryProducts({ params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);

  let wishlistProducts = null;

  if (session) {
    wishlistProducts = await getUserWishlist();

  }

  const { id } = await params;

  const products = await getAllProducts({
    category: id,
  })

  return (
    <>
      <div className='container w-11/12 mx-auto py-16'>

        {products.length != 0 && <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>{products[0].category.name}</h2>}

        {products.length == 0 && <h3 className='text-3xl w-full text-center pt-20'>No Products For This Category</h3>}

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {/* {products.map(product => <ProductCard key={product.id} product={product} />)} */}

          {products.map(product => {
            const isWishlisted = wishlistProducts?.some(
              (wish) => wish.id === product.id
            );

            return isWishlisted ? <ProductCard key={product.id} product={product} isInWishlist /> : <ProductCard key={product.id} product={product} />
          })}
        </div>

      </div>
    </>
  )
}
