import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slider1 from "../assets/HomeBanner.jpeg";
import slider2 from "../assets/HomeBanner1.jpeg";
import slider3 from "../assets/HomeBanner2.jpeg";
import { Link } from "react-router-dom";
import { useHeroData } from "../hooks/useApi";

// Bundled fallback shown instantly — no network wait.
const FALLBACK_SLIDES = [
  {
    title: "Global Quality Food Exporter From India",
    subtitle:
      "We export food including raw vegetables, fruits, spices & many more",
    image: slider1,
  },
  {
    title: "Premium Fresh Produce",
    subtitle:
      "Sourced from the finest farms across India with quality assurance",
    image: slider2,
  },
  {
    title: "International Standards",
    subtitle: "Meeting global compliance and food safety regulations",
    image: slider3,
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: heroData } = useHeroData();
  // Render fallback slides immediately; upgrade to API slides when/if they arrive.
  const [slides, setSlides] = useState(FALLBACK_SLIDES);

  useEffect(() => {
    if (!heroData) return;
    if (heroData.images && heroData.images.length > 0) {
      setSlides(
        heroData.images.map((image) => ({
          title:
            heroData.main_title || "Global Quality Food Exporter From India",
          subtitle:
            heroData.description ||
            "We export food including raw vegetables, fruits, spices & many more",
          image,
        })),
      );
    } else if (heroData.main_title || heroData.description) {
      setSlides(
        FALLBACK_SLIDES.map((s) => ({
          ...s,
          title: heroData.main_title || s.title,
          subtitle: heroData.description || s.subtitle,
        })),
      );
    }
  }, [heroData]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 pt-40 md:pt-28">
      <div className="relative h-[70vh] md:h-[calc(100vh-7rem)]">
        <img
          src={slides[currentSlide]?.image || slider1}
          alt={slides[currentSlide]?.title || "Hero slide"}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
          loading="lazy"
          decoding="async"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-linear-to-br from-slate-950/10 via-slate-900/40 to-emerald-900/60" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto flex h-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
            <div className="mt-10 flex flex-1 flex-col gap-8 md:mt-0 md:flex-row md:items-center">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-emerald-300 shadow-sm ring-1 ring-emerald-400/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Trusted Global Food Exporter
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                  {slides[currentSlide]?.title ||
                    "Global Quality Food Exporter From India"}
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-100/90">
                  {slides[currentSlide]?.subtitle ||
                    "We export food including raw vegetables, fruits, spices & many more"}
                </p>

                <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-start">
                  <Link to="/products" className="w-full sm:w-auto">
                    <button className="w-full rounded-full bg-emerald-500 px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-transform duration-200 hover:translate-y-0.5 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                      Explore Products
                    </button>
                  </Link>
                  <Link to="/contact" className="w-full sm:w-auto">
                    <button className="w-full rounded-full border border-white/70 bg-white/5 px-8 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                      Contact Us
                    </button>
                  </Link>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:justify-start sm:text-sm text-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Cold-chain maintained
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Global quality standards
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    On-time delivery
                  </div>
                </div>
              </div>

              <div className="mt-10 w-full md:mt-0 md:w-1/2">
                <div className="relative mx-auto h-56 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-md shadow-2xl sm:h-72 lg:h-80">
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <img
                      src={slides[currentSlide]?.image || slider1}
                      alt={slides[currentSlide]?.title || "Hero slide"}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-white">
                      {/* <div className="max-w-[70%]">
                        <p className="font-semibold line-clamp-2">
                          {slides[currentSlide]?.title ||
                            "Global Quality Food Exporter From India"}
                        </p>
                        <p className="mt-1 text-white/80 line-clamp-2">
                          {slides[currentSlide]?.subtitle ||
                            "We export food including raw vegetables, fruits, spices & many more"}
                        </p>
                      </div> */}
                      <div className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                        {String(currentSlide + 1).padStart(2, "0")}/
                        {String(slides.length).padStart(2, "0")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-transform duration-200 hover:-translate-x-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-transform duration-200 hover:translate-x-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      index === currentSlide
                        ? "w-6 bg-emerald-400"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
