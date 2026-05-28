import React from "react";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import { useTestimonialsData } from "../../hooks/useApi";

function TestimonialCard({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col rounded-3xl bg-white p-6 sm:p-7 border-2 border-[#FF2801]/30 shadow-lg shadow-[#FF2801]/10 transition-all duration-300 hover:border-[#FF2801] hover:shadow-2xl hover:shadow-[#FF2801]/25 overflow-hidden"
    >
      {/* Brand accent stripe (top-left) — grows on hover */}
      <div className="absolute left-0 top-0 h-1.5 w-16 rounded-tl-3xl bg-linear-to-r from-[#FF2801] to-[#434343] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-3xl" />

      {/* Decorative quote mark */}
      <Quote
        className="text-[#FF2801]"
        size={36}
        strokeWidth={2.5}
      />

      {/* Testimonial text */}
      <div
        className="mt-4 flex-1 text-sm md:text-[15px] leading-relaxed text-slate-700 line-clamp-7"
        dangerouslySetInnerHTML={{ __html: data.testimonial }}
      />

      {/* Divider */}
      <div className="my-5 h-px w-full bg-linear-to-r from-transparent via-[#FF2801]/30 to-transparent" />

      {/* Author identity row */}
      <div className="flex items-center gap-3">
        {data.image ? (
          <img
            src={data.image}
            alt={data.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#FF2801]/40"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF2801]/15 text-[#FF2801] ring-2 ring-[#FF2801]/40">
            <User size={20} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm md:text-base font-bold text-slate-900">
            {data.name}
          </h4>
          {data.role && (
            <p className="truncate text-xs text-slate-500">{data.role}</p>
          )}
          <div className="mt-1 flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < (data.rating || 5)
                    ? "fill-[#FF2801] text-[#FF2801]"
                    : "fill-slate-200 text-slate-200"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { data, isLoading } = useTestimonialsData();
  const testimonials = (data?.cards || []).slice(0, 3);

  if (isLoading || !testimonials.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      {/* dotted background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      {/* subtle brand color blobs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#FF2801]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#434343]/15 blur-3xl" />

      {/* Heading — site fonts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-3xl mx-auto px-4 mb-12"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FF2801]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF2801] ring-1 ring-[#FF2801]/25">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
          Client Reviews
        </span>

        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#434343]">
          What Our Clients{" "}
          <span className="bg-linear-to-r from-[#FF2801] to-[#434343] bg-clip-text text-transparent">
            Say
          </span>
        </h2>

        <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-linear-to-r from-[#FF2801] to-[#434343]" />

        <div className="mt-4 flex justify-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-[#FF2801] text-[#FF2801]"
            />
          ))}
        </div>
      </motion.div>

      {/* 3 cards side by side */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.id || i}
              data={t}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
