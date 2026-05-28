import React from "react";
import { Link } from "react-router-dom";
import { useProductCategories } from "../hooks/useApi";

export default function ProductMarquee() {
  const { data: categories = [], isLoading } = useProductCategories();

  if (isLoading || categories.length === 0) {
    return null;
  }

  // Duplicate so the translate-50% loop is seamless
  const looped = [...categories, ...categories];

  return (
    <section className="relative overflow-hidden border-y border-[#FF2801]/40 bg-white py-6 md:py-8">
      {/* edge fades so items don't pop in/out abruptly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-white to-transparent" />

      <div className="flex w-max animate-marquee gap-5 md:gap-6 hover:[animation-play-state:paused]">
        {looped.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            to={`/products/${item.slug}`}
            className="group relative flex h-44 md:h-52 w-48 md:w-56 shrink-0 flex-col overflow-hidden rounded-2xl border-2 border-[#FF2801]/30 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2801] hover:shadow-xl hover:shadow-[#FF2801]/20"
          >
            {/* Image area */}
            <div className="relative h-28 md:h-32 w-full overflow-hidden bg-slate-50">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                  No image
                </div>
              )}
            </div>

            {/* Name area */}
            <div className="flex flex-1 items-center justify-center px-3 py-2 text-center">
              <h4 className="text-sm md:text-base font-semibold text-[#434343] group-hover:text-[#FF2801] transition-colors line-clamp-2">
                {item.name}
              </h4>
            </div>

            {/* Brand accent stripe that grows on hover */}
            <div className="absolute left-0 top-0 h-1 w-10 rounded-tl-2xl bg-linear-to-r from-[#FF2801] to-[#434343] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-2xl" />
          </Link>
        ))}
      </div>
    </section>
  );
}
