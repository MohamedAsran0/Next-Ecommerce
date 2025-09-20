'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Image from 'next/image';

type MySwiperPropsTypes = {
    imagesList: string[],
    spaceBetween?: number,
    slidesPerView?: number,
    categorySliderTitles?: string[],
    breakpoints?: { [width: number]: { slidesPerView: number } }
}

export default function MySwiper({ imagesList, spaceBetween = 10, slidesPerView = 1, categorySliderTitles = [], breakpoints }: MySwiperPropsTypes) {
    return (
        <>
            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                loop
                breakpoints= {breakpoints}
            >

                {imagesList.map((src, index) => <SwiperSlide key={src}>
                    <Image width={500} height={400} src={src} alt={src} className='w-full h-[400px]' />
                    {categorySliderTitles[index] && (
                        <p className="mt-2 text-center">{categorySliderTitles[index]}</p>
                    )}
                </SwiperSlide>)}
            </Swiper>
        </>
    );
}
