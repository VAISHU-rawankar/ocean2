import React from "react";
import { motion } from "framer-motion";
import { useWhyChooseUsData } from "../../hooks/useApi";

export default function WhyChooseUs() {
  const { data, isLoading } = useWhyChooseUsData();

  if (isLoading || !data?.cards?.length) {
    return null;
  }

  const features = data.cards;
  const heading = data.heading || "Why Choose Us?";

  return (
    <div className="bg-linear-to-b from-[rgba(255,40,1,0.12)] via-white to-[rgba(67,67,67,0.08)] min-h-screen flex items-center py-14 md:py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-5 left-5 w-80 h-80 bg-[#FF2801] rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#434343] rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF2801]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF2801] ring-1 ring-[#FF2801]/25">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
            Our Strengths
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-[#434343] to-[#FF2801] bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
            Discover what sets us apart in the food export and trading industry
          </p>

          <div className="mt-4 h-1 w-24 mx-auto rounded-full bg-linear-to-r from-[#434343] via-[#FF2801] to-[#434343]" />
        </div>

        {/* 3 x 2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="group relative flex flex-col rounded-2xl border-2 border-[#FF2801]/40 bg-white p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2801] hover:shadow-xl hover:shadow-[#FF2801]/20"
            >
              {/* Top accent stripe that grows on hover */}
              <div className="absolute left-0 top-0 h-1 w-12 rounded-tl-2xl bg-linear-to-r from-[#FF2801] to-[#434343] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-2xl" />

              {/* Number badge */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#FF2801] text-white font-bold text-lg shrink-0 shadow-md shadow-[#FF2801]/40 mb-4">
                <span>{feature.number}</span>
                <div className="absolute inset-1 rounded-full border border-white/70" />
              </div>

              <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 leading-tight">
                {feature.title}
              </h3>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
