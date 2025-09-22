import Image from "next/image";
import MySwiper from "../_components/MySwiper/MySwiper";

import img1 from "@images/slider-image-1.jpeg"
import img2 from "@images/slider-image-2.jpeg"
import img3 from "@images/slider-image-3.jpeg"
import img4 from "@images/blog-img-1.jpeg"
import img5 from "@images/blog-img-2.jpeg"
import { getAllCategories } from "@/services/categories.service";
import Link from "next/link";
import { getAllProducts } from "@/services/products.service";
import ProductCard from "../_components/ProductCard/ProductCard";
import { getAllBrands } from "@/services/brands.service";
import BrandCard from "../_components/BrandCard/BrandCard";
import CategoryCard from "../_components/CategoryCard/CategoryCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getUserWishlist } from "@/services/wishlist.service";

const imgList = [img1.src, img2.src, img3.src];

export default async function Home() {

  const session = await getServerSession(authOptions);

  let wishlistProducts = null;
  
  if (session) {
    wishlistProducts = await getUserWishlist();

  }

  const categories = await getAllCategories();

  const products = await getAllProducts({ limit: 10 });


  const brands = await getAllBrands(1, 10);

  const categoriesImgList = categories.map(category => category.image);

  const categoriesTitlesList = categories.map(category => category.name)

  return (
    <>

      <div className='container w-11/12 mx-auto py-16'>

        <div className="px-5 flex rounded-4xl overflow-hidden">
          <MySwiper imagesList={imgList} />
          <div className="flex flex-col h-[400px]">
            <Image width={300} height={300} className="w-full h-[200px]" src={img4} alt={img4.src} />
            <Image width={300} height={300} className="w-full h-[200px]" src={img5} alt={img5.src} />
          </div>
        </div>

        <div className="px-5 flex mt-6">
          <MySwiper imagesList={categoriesImgList} slidesPerView={7} categorySliderTitles={categoriesTitlesList} breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 7 },
          }} />
        </div>


      </div>

      <div className='px-16 py-20 bg-gray-100'>
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Our Products</h2>
            <Link href={'/products'} className="text-blue-600 underline hover:no-underline">View more ➡️</Link>
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10'>
            {/* {products.map(product => <ProductCard key={product.id} product={product} />)} */}
            {products.map(product => {
              const isWishlisted = wishlistProducts?.some(
                (wish) => wish.id === product.id
              );

              return isWishlisted ? <ProductCard key={product.id} product={product} isInWishlist/> : <ProductCard key={product.id} product={product} /> 
            })}
          </div>

        </div>
      </div>


      <div className='px-16 py-20 bg-white'>
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Our Brands</h2>
            <Link href={'/brands'} className="text-blue-600 underline hover:no-underline">View more ➡️</Link>
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10'>
            {brands.map(brand => <BrandCard key={brand._id} brand={brand} />)}
          </div>

        </div>
      </div>

      <div className='px-16 py-20 bg-gray-100'>
        <div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Our Categories</h2>
            <Link href={'/categories'} className="text-blue-600 underline hover:no-underline">View more ➡️</Link>
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10'>
            {categories.map(category => <CategoryCard key={category._id} category={category} />)}
          </div>

        </div>
      </div>

    </>
  );
}
