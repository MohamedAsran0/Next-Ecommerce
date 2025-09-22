import ProductCard from './../_components/ProductCard/ProductCard';
import { getAllProducts } from '@/services/products.service';
import Pagination from '../_components/Pagination/Pagination';
import { allProductsOptionsType } from '@/types/product.type';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { getUserWishlist } from '@/services/wishlist.service';

export default async function products({ searchParams }: { searchParams: { page?: string } }) {

  const session = await getServerSession(authOptions);

  let wishlistProducts = null;

  if (session) {
    wishlistProducts = await getUserWishlist();
  }

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const allProductsOptions: allProductsOptionsType = {
    page: currentPage as 1 | 2,
  }

  const products = await getAllProducts(allProductsOptions);

  return (
    <>
      <div className='container w-11/12 mx-auto py-16'>
        <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Enjoy Our Products</h2>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {/* {products.map(product => <ProductCard key={product.id} product={product} />)} */}
          {products.map(product => {
            const isWishlisted = wishlistProducts?.some(
              (wish) => wish.id === product.id
            );

            return isWishlisted ? <ProductCard key={product.id} product={product} isInWishlist /> : <ProductCard key={product.id} product={product} />
          })}
        </div>

        <Pagination maxPage={2} />

      </div>
    </>
  )

}
