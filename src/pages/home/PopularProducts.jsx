import React from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import { useProductCategories } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function PopularProductsGrid() {
  const { data: categories = [], isLoading } = useProductCategories();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return <LoadingSpinner className="min-h-72" />;
  }

  if (!categories.length) {
    return null;
  }

  return (
    <div className="w-full bg-white py-6 md:py-6 px-4 md:px-8">
      <Motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-15 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
            Popular <span className="text-[#FF2801]">Products</span>
          </h2>
        </div>

        <div className="relative">
          <style>{`
            .swiper-button-prev,
            .swiper-button-next {
              width: 30px;
              height: 30px;
              background: none;
              border-radius: 50%;
              color: #FF2801;
              transition: color 0.2s;
            }

            .swiper-button-prev:hover,
            .swiper-button-next:hover {
              color: #434343;
            }

            .swiper-button-prev:after,
            .swiper-button-next:after {
              font-size: 20px;
              font-weight: bold;
            }

            .swiper-button-prev { left: -24px; }
            .swiper-button-next { right: -24px; }

            @media (max-width: 768px) {
              .swiper-button-prev,
              .swiper-button-next { display: none; }
            }

            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: #d1d5db;
              opacity: 1;
            }

            .swiper-pagination-bullet-active {
              background: #FF2801;
            }
          `}</style>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={categories.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            navigation={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="pb-12"
          >
            {categories.map((category) => {
              const link = `/products/${category.slug}`;
              return (
                <SwiperSlide key={category.id || category.slug}>
                  <Motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => navigate(link)}
                    className="group cursor-pointer transition-all duration-200"
                  >
                    <ProductCategoryCard
                      to={link}
                      name={category.name}
                      resolvedImage={category.image}
                    />
                  </Motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Motion.div>
    </div>
  );
}
