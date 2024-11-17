'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import banner1 from '../public/asstes/slide1.png';
import banner2 from '../public/asstes/slide2.jpg';
import banner3 from '../public/asstes/slide3.jpg';
import FeaturedProducts from '@/components/Featured';

const HomePage = () => {
  const bannerImages = [
    {
      id: 1,
      url: banner1,
      title: 'Find Your Inner Peace',
      subtitle: 'Join our yoga classes today',
    },
    {
      id: 2,
      url: banner2,
      title: 'Transform Your Body & Mind',
      subtitle: 'Expert instructors waiting for you',
    },
    {
      id: 3,
      url: banner3,
      title: 'Begin Your Journey',
      subtitle: 'Start your wellness journey today',
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-[600px]"
      >
        {bannerImages.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.url}
                alt={slide.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
