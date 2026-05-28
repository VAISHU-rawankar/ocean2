import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useProductCategories } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * CategoryCard
 *   Image fills the card (slightly blurred + dark overlay so the title reads).
 *   Whole card is clickable. On hover, blur lifts and a "View" cue slides in.
 */
function CategoryCard({ category, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/products/${category.slug}`}
        aria-label={category.name}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-[#FF2801]/30 shadow-lg shadow-[#FF2801]/10 transition-all duration-300 hover:border-[#FF2801] hover:shadow-2xl hover:shadow-[#FF2801]/30"
      >
        {/* Image — clearly visible with just a touch of dim on default; full clarity on hover */}
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover scale-105 brightness-95 transition-all duration-500 group-hover:scale-110 group-hover:brightness-100"
        />

        {/* Soft dark overlay — just enough for the centered title to read */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20" />

        {/* Brand accent stripe (top-left) — grows on hover */}
        <div className="absolute left-0 top-0 h-1.5 w-12 rounded-tl-2xl bg-linear-to-r from-[#FF2801] to-[#434343] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-2xl z-10" />

        {/* Title + CTA — centered vertically and horizontally */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-3">
          <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] leading-tight">
            {category.name}
          </h3>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FF2801]/90 backdrop-blur px-3 py-1 text-[11px] sm:text-xs font-semibold text-white transition-all duration-300 group-hover:gap-2 group-hover:bg-[#FF2801]">
            View
            <ArrowRight
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductRange() {
  const { data: allCategories = [], isLoading: loading } =
    useProductCategories();

  // Take first 8 categories for home page
  const categories = allCategories.slice(0, 8);

  if (loading) {
    return <LoadingSpinner className="min-h-100" />;
  }

  if (!categories.length) {
    return null;
  }

  return (
    <div className="relative w-full bg-linear-to-b from-white via-[#FF2801]/[0.03] to-white overflow-hidden">
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute top-20 right-10 -z-10 w-72 h-72 bg-[#FF2801] rounded-full blur-3xl opacity-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 w-96 h-96 bg-[#434343] rounded-full blur-3xl opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-5"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF2801]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF2801] ring-1 ring-[#FF2801]/25">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF2801]" />
            Categories
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-[#434343]">
            Our <span className="text-[#FF2801]">Product Range</span>
          </h2>
          <div className="mt-2 h-1 w-20 mx-auto rounded-full bg-linear-to-r from-[#FF2801] to-[#434343]" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.slug} category={category} index={i} />
          ))}
        </div>

        {/* View More */}
        <div className="flex justify-center">
          <Link to="/products">
            <button className="inline-flex items-center gap-2 rounded-full bg-[#FF2801] px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-[#FF2801]/30 transition-all hover:bg-[#e62500] hover:-translate-y-0.5">
              View More
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
