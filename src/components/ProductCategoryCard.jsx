import React from "react";
import { Link } from "react-router-dom";

export default function ProductCategoryCard({
  name,
  resolvedImage,
  to,
  children,
  priority = false,
}) {
  return (
    <div className="group cursor-pointer h-full">
      <Link to={to} className="group block">
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-56 md:h-64 w-full bg-slate-100">
            <img
              src={resolvedImage}
              alt={name}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/15 via-black/0 to-transparent" />
          </div>
        </div>
        <h3 className="mt-3 ml-2 text-base md:text-lg font-bold text-slate-900 group-hover:text-red-700 transition">
          {name}
        </h3>
        {children}
      </Link>
    </div>
  );
}
