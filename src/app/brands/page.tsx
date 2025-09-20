import Pagination from '../_components/Pagination/Pagination';
import { getAllBrands } from '@/services/brands.service';
import BrandCard from '../_components/BrandCard/BrandCard';


export default async function brands({ searchParams }: { searchParams: { page?: string } }) {
    const params = await searchParams;

    const currentPage = Number(params.page) || 1;

    const brands = await getAllBrands(currentPage as 1 | 2);

    return (
        <>
            <div className='container w-11/12 mx-auto py-16'>
                <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Our Brands are the Best</h2>

                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {brands.map(brand => <BrandCard key={brand._id} brand={brand} />)}
                </div>

                <Pagination maxPage={2} />

            </div>
        </>
    )
}
