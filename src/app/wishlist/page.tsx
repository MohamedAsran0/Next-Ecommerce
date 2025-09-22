import ProductCard from './../_components/ProductCard/ProductCard';
import { getUserWishlist } from '@/services/wishlist.service';

export default async function wishlist() {

  const products = await getUserWishlist();

  return (
    <>
      <div className='container w-11/12 mx-auto py-16'>
        {products.length != 0 && <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Your WishList</h2>}

        {products.length == 0 && <h3 className='text-3xl w-full text-center pt-20'>No Products in Your WishList</h3>}

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>

          {products.map(product => <ProductCard key={product.id} product={product} isInWishlist />)}

        </div>

      </div>
    </>
  )
}
