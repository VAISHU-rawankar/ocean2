import React from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Onion from "../../assets/ocenProduct/Onion.png";
import Rice from "../../assets/ocenProduct/Rice.png";
import Tea from "../../assets/ocenProduct/Tea.jpeg";
import Coconut from "../../assets/ocenProduct/Coconut.png";
import Cumin from "../../assets/ocenProduct/Cumin.png";
import Turmeric from "../../assets/ocenProduct/Turmeric.png";
import Potato from "../../assets/ocenProduct/Potato.png";
import Coffee from "../../assets/ocenProduct/Coffee.png";
import ProductCategoryCard from "../../components/ProductCategoryCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Tea",
    image: Tea,
    backgroundColor: "#f5f5f5",
    link: "/products/beverages/tea",
  },
  {
    id: 2,
    name: "Rice",
    image: Rice,
    backgroundColor: "#f5f5f5",
    link: "/products/grains-and-cereal/rice",
  },
  {
    id: 3,
    name: "Coconut",
    image: Coconut,
    backgroundColor: "#f5f5f5",
    link: "/products/fruits/coconut",
  },
  {
    id: 4,
    name: "Cumin",
    image: Cumin,
    backgroundColor: "#f5f5f5",
    link: "/products/spices/cumin",
  },
  {
    id: 5,
    name: "Turmeric",
    image: Turmeric,
    backgroundColor: "#f5f5f5",
    link: "/products/spices/turmeric",
  },
  {
    id: 6,
    name: "Onion",
    image: Onion,
    backgroundColor: "#f5f5f5",
    link: "/products/vegetables/onion",
  },
  {
    id: 7,
    name: "Potato",
    image: Potato,
    backgroundColor: "#f5f5f5",
    link: "/products/vegetables/potato",
  },
  {
    id: 8,
    name: "Coffee",
    image: Coffee,
    backgroundColor: "#f5f5f5",
    link: "/products/beverages/coffee",
  },
];

export default function PopularProductsGrid() {
  const products = PRODUCTS;
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
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.2,
      },
    },
  };

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
            Popular <span className="text-[#01BDD8]">Products</span>
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
              color: #00BDD9;
              transition: background-color 0.2s;
            }
            
            .swiper-button-prev:hover,
            .swiper-button-next:hover {
              color: #AFCB1F;
            }
            
            .swiper-button-prev:after,
            .swiper-button-next:after {
              font-size: 20px;
              font-weight: bold;
            }
            
            .swiper-button-prev {
              left: -24px;
            }
            
            .swiper-button-next {
              right: -24px;
            }
            
            @media (max-width: 768px) {
              .swiper-button-prev,
              .swiper-button-next {
                display: none;
              }
            }
            
            .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: #d1d5db;
              opacity: 1;
            }
            
            .swiper-pagination-bullet-active {
              background: #01BDD8;
            }
          `}</style>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={800}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => {
                    if (product.link) navigate(product.link);
                  }}
                  className="group cursor-pointer transition-all duration-200"
                >
                  <ProductCategoryCard
                    to={product.link}
                    name={product.name}
                    resolvedImage={product.image}
                  />
                </Motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Motion.div>
    </div>
  );
}

// import React, { useEffect, useRef, useState } from "react";
// import { motion as Motion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Onion from "../../assets/onion.jpeg";
// import Rice from "../../assets/Rice.jpeg";
// import Tea from "../../assets/Tea.jpeg";
// import Coconut from "../../assets/Coconutes.jpeg";
// import Cumin from "../../assets/Jira.jpeg";
// import Turmeric from "../../assets/Haldi.jpeg";
// import Potato from "../../assets/potato.jpeg";
// import Coffee from "../../assets/coffee.jpeg";
// import ProductCategoryCard from "../../components/ProductCategoryCard";

// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Tea",
//     image: Tea,
//     backgroundColor: "#f5f5f5",
//     link: "/products/beverages/tea",
//   },
//   {
//     id: 2,
//     name: "Rice",
//     image: Rice,
//     backgroundColor: "#f5f5f5",
//     link: "/products/grains-and-cereal/rice",
//   },
//   {
//     id: 3,
//     name: "Coconut",
//     image: Coconut,
//     backgroundColor: "#f5f5f5",
//     link: "/products/fruits/coconut",
//   },
//   {
//     id: 4,
//     name: "Cumin",
//     image: Cumin,
//     backgroundColor: "#f5f5f5",
//     link: "/products/spices/cumin",
//   },
//   {
//     id: 5,
//     name: "Turmeric",
//     image: Turmeric,
//     backgroundColor: "#f5f5f5",
//     link: "/products/spices/turmeric",
//   },
//   {
//     id: 6,
//     name: "Onion",
//     image: Onion,
//     backgroundColor: "#f5f5f5",
//     link: "/products/vegetables/onion",
//   },
//   {
//     id: 7,
//     name: "Potato",
//     image: Potato,
//     backgroundColor: "#f5f5f5",
//     link: "/products/vegetables/potato",
//   },
//   {
//     id: 8,
//     name: "Coffee",
//     image: Coffee,
//     backgroundColor: "#f5f5f5",
//     link: "/products/beverages/coffee",
//   },
// ];

// export default function PopularProductsGrid() {
//   const products = PRODUCTS;
//   const navigate = useNavigate();

//   const carouselRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [cardWidth, setCardWidth] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Measure card width on mount and resize
//   useEffect(() => {
//     const measureCard = () => {
//       const el = carouselRef.current;
//       if (!el) return;

//       const card = el.querySelector('[data-slide="true"]');
//       if (card) {
//         const gap = 24;
//         setCardWidth(card.offsetWidth + gap);
//       }
//     };

//     measureCard();
//     window.addEventListener("resize", measureCard);
//     return () => window.removeEventListener("resize", measureCard);
//   }, [products]);

//   // Auto-scroll effect
//   useEffect(() => {
//     if (products.length === 0 || isPaused) return;

//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => {
//         const nextIndex = prevIndex + 1;
//         if (nextIndex >= products.length) {
//           return 0;
//         }
//         return nextIndex;
//       });
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [products.length, isPaused]);

//   useEffect(() => {
//     const el = carouselRef.current;
//     if (!el || cardWidth === 0) return;

//     el.scrollTo({
//       left: activeIndex * cardWidth,
//     });
//   }, [activeIndex, cardWidth]);

//   const handlePrev = () => {
//     setActiveIndex((prevIndex) => {
//       if (prevIndex === 0) {
//         return products.length - 1; // Go to last card
//       }
//       return prevIndex - 1;
//     });
//   };

//   const handleNext = () => {
//     setActiveIndex((prevIndex) => {
//       if (prevIndex >= products.length - 1) {
//         return 0; // Go to first card
//       }
//       return prevIndex + 1;
//     });
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//     hover: {
//       y: -8,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <div className="w-full bg-white py-6 md:py-6 px-4 md:px-8">
//       <Motion.div
//         className="max-w-7xl mx-auto"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="mb-15 gap-4">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
//             Popular <span className="text-[#01BDD8]">Products</span>
//           </h2>
//         </div>

//         <div className="relative">
//           <button
//             type="button"
//             onClick={handlePrev}
//             aria-label="Previous card"
//             className="hidden md:flex absolute -left-6 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-lg items-center justify-center transition-colors duration-200"
//           >
//             <ChevronLeft size={24} />
//           </button>

//           <button
//             type="button"
//             onClick={handleNext}
//             aria-label="Next card"
//             className="hidden md:flex absolute -right-6 top-1/2 z-40 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-800 text-white shadow-lg items-center justify-center transition-colors duration-200"
//           >
//             <ChevronRight size={24} />
//           </button>

//           <div
//             ref={carouselRef}
//             className="flex gap-6 overflow-x-auto pb-4 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory"
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {products.map((product) => (
//               <Motion.div
//                 key={product.id}
//                 data-slide="true"
//                 variants={cardVariants}
//                 whileHover="hover"
//                 onClick={() => {
//                   if (product.link) navigate(product.link);
//                 }}
//                 className="group snap-start shrink-0 basis-[85%] sm:basis-[48%] md:basis-[32%] lg:basis-[calc((100%-4*1.5rem)/4)] cursor-pointer transition-all duration-200"
//               >
//                 <ProductCategoryCard
//                   to={product.link}
//                   name={product.name}
//                   resolvedImage={product.image}
//                 />
//               </Motion.div>
//             ))}
//           </div>
//         </div>
//       </Motion.div>
//     </div>
//   );
// }
