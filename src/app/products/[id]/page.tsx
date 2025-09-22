import AddToCartBtn from '@/app/_components/AddToCartBtn/AddToCartBtn';
import WishListBtn from '@/app/_components/WishListBtn/WishListBtn';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getSpecificProduct } from '@/services/products.service';
import { getUserWishlist } from '@/services/wishlist.service';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function productDetails({ params }: { params: { id: string } }) {
    const { id } = await params;
    // console.log(id);

    const session = await getServerSession(authOptions);

    let wishlistProducts = null;

    if (session) {
        wishlistProducts = await getUserWishlist();
    }

    const isWishlisted = wishlistProducts?.some(
        (wish) => wish.id === id
    );

    const product = await getSpecificProduct(id);
    return (
        <>
            <div className='container p-10 pt-20'>

                <div className='bg-gray-400 rounded-3xl p-14 mx-auto relative'>

                    <div className="absolute top-5 right-5 text-3xl lg:text-5xl hover:scale-105">
                        {
                            isWishlisted ? <WishListBtn id={id} isInWishlist={true} /> : <WishListBtn id={id}  isInWishlist={false}/>
                        }
                    </div>

                    <div className='grid md:grid-cols-12 gap-5'>
                        <div className='md:col-span-4 flex flex-col gap-15'>
                            <div className='w-full'>
                                <Image width={250} height={200} priority={false} className='w-72 h-72 mx-auto' src={product.imageCover} alt={product.title} />
                            </div>

                            <div className='flex flex-wrap gap-3'>
                                {product.images.map(image => <Image width={250} height={200} priority={false} key={image} className='w-24 h-24' src={image} alt={product.title} />)}
                            </div>

                        </div>
                        <div className='md:col-span-8 flex flex-col justify-center'>
                            <h2 className='text-4xl font-bold mb-2'>{product.title}</h2>
                            <p className="text-lg font-normal text-gray-700 dark:text-gray-400 my-3">{product.description}</p>

                            {!!product.priceAfterDiscount && <h5 className="text-lg font-normal dark:text-gray-400">
                                Price: <span className="text-red-600 line-through opacity-60">{product.price}</span> <span className="text-green-600">{product.priceAfterDiscount}</span> $
                            </h5>}

                            {!!!product.priceAfterDiscount && <h5 className="text-lg dark:text-gray-400">
                                Price: <span className="text-green-600">{product.price}</span> $
                            </h5>}

                            <h5 className="text-lg font-normal dark:text-gray-400">
                                Quantity: <span>{product.quantity}</span>
                            </h5>

                            <h5 className="text-lg font-normal dark:text-gray-400">
                                Rate: <span className="text-yellow-600">{product.ratingsAverage}</span>
                            </h5>

                            <div className='mt-5 w-full'>
                                <AddToCartBtn id={id} />
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
