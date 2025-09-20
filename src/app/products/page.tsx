import ProductCard from './../_components/ProductCard/ProductCard';
import { getAllProducts } from '@/services/products.service';
import Pagination from '../_components/Pagination/Pagination';
import { allProductsOptionsType } from '@/types/product.type';

export default async function products({ searchParams }: { searchParams: { page?: string } }) {

  const params = await searchParams;

  const currentPage = Number(params.page) || 1;

  const allProductsOptions : allProductsOptionsType = {
    page: currentPage as 1 | 2,
  }

  const products = await getAllProducts(allProductsOptions);
  
  return (
    <>
      <div className='container w-11/12 mx-auto py-16'>
        <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Enjoy Our Products</h2>

        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>

        <Pagination maxPage={2} />

      </div>
    </>
  )

}
