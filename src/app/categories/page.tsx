
import { getAllCategories } from '@/services/categories.service';
import CategoryCard from '../_components/CategoryCard/CategoryCard';

export default async function categories({ searchParams }: { searchParams: { page?: string } }) {
    const params = await searchParams;

    const currentPage = Number(params.page) || 1;

    const categories = await getAllCategories(currentPage as 1 | 2);

    return (
        <>
            <div className='container w-11/12 mx-auto py-16'>
                <h2 className='mb-10 text-center font-extrabold text-6xl bg-gradient-to-br from-green-600 to-gray-500 bg-clip-text text-transparent p-2.5'>Discover Our Categories</h2>

                <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {categories.map(category => <CategoryCard key={category._id} category={category} />)}
                </div>

            </div>
        </>
    )
}
