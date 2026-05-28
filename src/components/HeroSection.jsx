import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHeroData } from "../hooks/useApi";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: heroData, isLoading } = useHeroData();

  const images =
    heroData?.images && heroData.images.length > 0 ? heroData.images : [];

  const title = heroData?.main_title || "";
  const description = heroData?.description || "";
  const smallTitle = heroData?.small_title || "Trusted Global Food Exporter";
  const buttonText = heroData?.button_text || "Explore Products";
  const buttonLink = heroData?.button_link || "/products";

  // Reset to first slide whenever images change
  useEffect(() => {
    setCurrentSlide(0);
  }, [images.length]);

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(t);
  }, [images.length]);

  if (isLoading || !heroData || images.length === 0) {
    return null;
  }

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % images.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + images.length) % images.length);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* subtle decorative blurs in brand colors */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FF2801] opacity-[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#434343] opacity-[0.05] blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 pb-6 md:pt-32 md:pb-8 lg:pt-36 lg:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* LEFT — content */}
          <div className="order-2 lg:order-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF2801]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF2801] ring-1 ring-[#FF2801]/25"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
              {smallTitle}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#434343]"
              >
                {title}
              </motion.h1>
            </AnimatePresence>

            <div className="mt-4 h-1 w-24 rounded-full bg-linear-to-r from-[#FF2801] to-[#434343]" />

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-slate-600"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </AnimatePresence>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to={buttonLink} className="w-full sm:w-auto">
                <button className="w-full rounded-full bg-[#FF2801] px-7 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#FF2801]/25 transition-all duration-200 hover:bg-[#e62500] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2801]/40">
                  {buttonText}
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full rounded-full border-2 border-[#434343] bg-white px-7 py-3 text-sm sm:text-base font-semibold text-[#434343] transition-all duration-200 hover:bg-[#434343] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#434343]/40">
                  Contact Us
                </button>
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF2801]" />
                Cold-chain maintained
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF2801]" />
                Global quality standards
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF2801]" />
                On-time delivery
              </div>
            </div>

            {/* Carousel controls — bottom of left column */}
            {images.length > 1 && (
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#434343] transition-all hover:border-[#FF2801] hover:text-[#FF2801] hover:-translate-x-0.5"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-[#434343] transition-all hover:border-[#FF2801] hover:text-[#FF2801] hover:translate-x-0.5"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="flex items-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-[#FF2801]"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — image carousel */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[240px] sm:h-[300px] md:h-[340px] lg:h-[380px] w-full overflow-hidden rounded-3xl border-2 border-[#434343]/15 shadow-2xl shadow-[#434343]/20 bg-linear-to-br from-slate-100 to-slate-200">
              {/* Preload all images so swaps are instant after first paint */}
              {images.map((src, i) => (
                <link key={i} rel="preload" as="image" href={src} />
              ))}

              <AnimatePresence mode="sync">
                <motion.img
                  key={`img-${currentSlide}`}
                  src={images[currentSlide]}
                  alt={title || `Slide ${currentSlide + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </AnimatePresence>

              {/* gradient overlay for legibility of counter */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/45 to-transparent" />

              {/* Slide counter pill */}
              <div className="absolute bottom-4 right-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-[#434343] backdrop-blur">
                {String(currentSlide + 1).padStart(2, "0")}
                <span className="mx-1 text-slate-400">/</span>
                {String(images.length).padStart(2, "0")}
              </div>

              {/* Brand accent corner */}
              <div className="absolute left-0 top-0 h-1.5 w-32 rounded-tl-3xl bg-linear-to-r from-[#FF2801] to-[#434343] z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
