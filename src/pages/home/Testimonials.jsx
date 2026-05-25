import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTestimonialsData } from "../../hooks/useApi";

// Fallback so the section still shows up when the API is down.
const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: "Aditya Rao",
    role: "Procurement Head",
    testimonial:
      "Oceanmark Exim delivered on every promise. The dedication, professionalism, and teamwork demonstrated by their team ensured that everything was completed on schedule. We truly value their commitment and look forward to building a long-lasting partnership.",
    rating: 5,
    image: "",
  },
  {
    id: 2,
    name: "Amit Verma",
    role: "Import Manager",
    testimonial:
      "We sincerely thank the team for the quick and efficient delivery of our shipments during a critical period. Their commitment, timely response, and seamless coordination made it possible to complete everything as planned. Truly outstanding work.",
    rating: 5,
    image: "",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Buyer, UAE",
    testimonial:
      "Working with Oceanmark Exim has been a pleasure. Their efficiency, dedication, and proactive approach ensured a smooth and successful completion of every order. The professionalism shown throughout the process is highly commendable.",
    rating: 5,
    image: "",
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Restaurant Group",
    testimonial:
      "The quality of spices and grains we received exceeded our expectations. Packaging was impeccable, documentation was perfect, and the cold-chain logistics worked flawlessly. Highly recommended for any serious importer.",
    rating: 5,
    image: "",
  },
];

function TestimonialCard({ data, featured = false }) {
  return (
    <div
      className={`relative rounded-3xl bg-white p-6 sm:p-8 ${
        featured
          ? "border-2 border-[#F5B921]/40 shadow-2xl shadow-[#F5B921]/20"
          : "border border-slate-200 shadow-xl shadow-slate-300/40"
      }`}
    >
      <Quote
        className="absolute left-6 top-6 text-[#F5B921]"
        size={featured ? 42 : 28}
        strokeWidth={2.5}
      />

      <p
        className={`mt-12 italic leading-relaxed text-slate-700 ${
          featured ? "text-base sm:text-[15px]" : "text-sm"
        } line-clamp-${featured ? "8" : "6"}`}
        dangerouslySetInnerHTML={{ __html: data.testimonial }}
      />

      <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#F5B921]/30"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B921]/15 text-[#7a5b10] ring-2 ring-[#F5B921]/30">
            <User size={18} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-bold text-slate-900">
            {data.name}
          </h4>
          {data.role && (
            <p className="truncate text-xs text-slate-500">{data.role}</p>
          )}
          <div className="mt-1 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < (data.rating || 5)
                    ? "fill-[#F5B921] text-[#F5B921]"
                    : "fill-slate-200 text-slate-200"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { data } = useTestimonialsData();
  const testimonials =
    data?.cards && data.cards.length > 0 ? data.cards : FALLBACK_TESTIMONIALS;
  const [active, setActive] = useState(0);

  // Auto-advance every 6s; reset whenever testimonials change.
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const t = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, [testimonials.length]);

  const getCard = (offset) => {
    const len = testimonials.length;
    const idx = ((active + offset) % len + len) % len;
    return testimonials[idx];
  };

  const next = () => setActive((p) => (p + 1) % testimonials.length);
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      {/* dotted background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* subtle color blobs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#C6D869]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#F5B921]/20 blur-3xl" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h3 className="font-script text-3xl sm:text-4xl text-[#F5B921]">
          Client Review
        </h3>
        <h2 className="text-stroke-dark mt-1 text-4xl sm:text-6xl font-extrabold uppercase tracking-[0.15em]">
          Testimonial
        </h2>
        <div className="mt-4 flex justify-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-[#F5B921] text-[#F5B921]"
            />
          ))}
        </div>
      </motion.div>

      {/* Carousel */}
      <div className="relative z-10 mx-auto mt-12 flex min-h-[420px] max-w-5xl items-center justify-center px-4 sm:min-h-[440px] sm:px-6">
        {/* Left peek (hidden on mobile) */}
        {testimonials.length > 1 && (
          <div className="pointer-events-none absolute left-0 top-1/2 hidden w-64 -translate-y-1/2 scale-90 opacity-60 md:block lg:left-4 lg:w-72">
            <TestimonialCard data={getCard(-1)} />
          </div>
        )}

        {/* Right peek (hidden on mobile) */}
        {testimonials.length > 1 && (
          <div className="pointer-events-none absolute right-0 top-1/2 hidden w-64 -translate-y-1/2 scale-90 opacity-60 md:block lg:right-4 lg:w-72">
            <TestimonialCard data={getCard(1)} />
          </div>
        )}

        {/* Featured center card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-20 w-full max-w-md"
          >
            <TestimonialCard data={getCard(0)} featured />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      {testimonials.length > 1 && (
        <div className="relative z-10 mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:bg-[#F5B921] hover:text-white hover:border-[#F5B921]"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-[#F5B921]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-all hover:bg-[#F5B921] hover:text-white hover:border-[#F5B921]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
