import React, { useState, useEffect } from "react";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import { Link } from "react-router-dom";
import { useProductCategories } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProductRange() {
  const { data: allCategories = [], isLoading: loading } =
    useProductCategories();

  // Take first 8 categories for home page
  const categories = allCategories.slice(0, 8);

  if (loading) {
    return <LoadingSpinner className="min-h-100" />;
  }

  return (
    <div className="w-full bg-linear-to-b from-white via-green-50 to-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          {/* Leaf Icon */}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-[#01BDD8]">Product Range</span>
          </h1>

          {/* Underline */}
          <div className="w-24 h-1 bg-green-500 rounded mx-auto"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {categories.map((category) => (
            <ProductCategoryCard
              key={category.slug}
              name={category.name}
              resolvedImage={category.image}
              to={`/products/${category.slug}`}
            />
          ))}
        </div>

        {/* View More Button */}
        <Link to="/products">
          <div className="flex justify-center">
            <button className="bg-[#01BDD8] text-white font-bold py-3 px-8 rounded transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg uppercase text-sm tracking-wide">
              View More
            </button>
          </div>
        </Link>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 right-10 -z-10 w-72 h-72 bg-green-100 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
    </div>
  );
}
