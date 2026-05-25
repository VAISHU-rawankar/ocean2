import React from "react";
import { motion } from "framer-motion";
import { useWhyChooseUsData } from "../../hooks/useApi";

// Fallback features so the section still renders if the API is unreachable.
const FALLBACK_FEATURES = [
  {
    id: 1,
    number: "01",
    title: "Trusted Sourcing Network",
    description:
      "We work closely with reliable farmers, processors, and suppliers across India to ensure consistent quality and dependable supply.",
  },
  {
    id: 2,
    number: "02",
    title: "Export-Ready Quality",
    description:
      "Every shipment is carefully selected, graded, and packed to meet international buyer expectations and destination requirements.",
  },
  {
    id: 3,
    number: "03",
    title: "Wide Product Portfolio",
    description:
      "From spices to agro commodities, we offer a diverse range of products—allowing buyers to source multiple items from a single, dependable exporter.",
  },
  {
    id: 4,
    number: "04",
    title: "Smooth & Transparent Export Process",
    description:
      "We handle documentation, coordination, and logistics with clarity and efficiency, ensuring hassle-free exports from origin to destination.",
  },
  {
    id: 5,
    number: "05",
    title: "Flexible Trade Approach",
    description:
      "As a merchant exporter, we adapt to buyer needs in terms of grades, packaging, quantities, and market requirements.",
  },
  {
    id: 6,
    number: "06",
    title: "Responsive & Relationship-Focused",
    description:
      "We believe in long-term partnerships, offering prompt communication, honest commitments, and professional support at every stage.",
  },
];

export default function WhyChooseUs() {
  const { data } = useWhyChooseUsData();

  const features =
    data?.cards && data.cards.length > 0 ? data.cards : FALLBACK_FEATURES;
  const heading = data?.heading || "Why Choose Us?";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-linear-to-b from-[rgba(198,216,105,0.12)] via-white to-[rgba(245,185,33,0.08)] py-10 md:py-15 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Premium Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-5 left-5 w-80 h-80 bg-[#C6D869] rounded-full blur-3xl opacity-15" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F5B921] rounded-full blur-3xl opacity-15" />
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-[#F5B921] rounded-full blur-3xl transform -translate-x-1/2 opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Premium Header Section */}
        <div className="text-center mb-20 md:mb-10">
          <div className="mb-6 inline-block">
            <span className="text-gray-800 font-bold text-sm md:text-base uppercase tracking-widest">
              Our Strengths
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-5 tracking-tight">
            <span className="bg-linear-to-r from-[#F5B921] to-[#C6D869] bg-clip-text text-transparent">
              {heading}
            </span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover what sets us apart in the food export and trading industry
          </p>

          <div className="h-1.5 w-32 md:w-48 bg-linear-to-r from-[#F5B921] via-[#C6D869] to-[#F5B921] mx-auto rounded-full" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -4 }}
              className="group relative flex items-start gap-6 rounded-2xl border-2 border-[#C6D869]/40 bg-white/80 backdrop-blur-sm p-6 md:p-7 shadow-sm transition-colors duration-300 hover:border-[#C6D869] hover:shadow-xl hover:shadow-[#C6D869]/20"
            >
              {/* Top accent stripe that grows on hover */}
              <div className="absolute left-0 top-0 h-1 w-12 rounded-tl-2xl bg-linear-to-r from-[#C6D869] to-[#F5B921] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-2xl" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#C6D869] text-white font-bold text-xl shrink-0 shadow-md shadow-[#C6D869]/40 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <span>{feature.number}</span>
                <div className="absolute inset-1 rounded-full border border-white/70" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
