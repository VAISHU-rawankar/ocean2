import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SEO from "../../components/SEO";
import ProductsImg from "../../assets/ProductHeader.jpeg";
import ProductCategoryCard from "../../components/ProductCategoryCard";
import {
  useProductCategories,
  useProductsByCategory,
  useBannerData,
} from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

function ProductTile({ to, name, image, priority = false }) {
  const resolvedImage =
    image ||
    `https://via.placeholder.com/800x500/E2E8F0/334155?text=${encodeURIComponent(
      name || "Product",
    )}`;

  return (
    <ProductCategoryCard
      to={to}
      name={name}
      resolvedImage={resolvedImage}
      priority={priority}
    />
  );
}

function CategoryTile({ to, name, image, priority = false }) {
  const resolvedImage =
    image ||
    `https://via.placeholder.com/1200x700/E2E8F0/334155?text=${encodeURIComponent(
      name || "Category",
    )}`;

  return (
    <ProductCategoryCard
      to={to}
      name={name}
      resolvedImage={resolvedImage}
      priority={priority}
    >
      <div className="mt-2 ml-2 inline-flex items-center text-sm font-semibold text-emerald-700">
        View Categories
        <span className="ml-2 transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </ProductCategoryCard>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      {action ? action : null}
    </div>
  );
}

export function ProductsIndex() {
  const { data: categories = [], isLoading: loadingCategories } =
    useProductCategories();
  const { data: banners, isLoading: loadingBanners } = useBannerData();

  const loading = loadingCategories || loadingBanners;
  const bannerData = banners?.["product_range"];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full bg-white">
      <SEO
        title="Products"
        description="Explore our wide range of premium Indian spices, grains, pulses, fruits, and vegetables available for export."
      />
      <PageHero
        title={bannerData?.title || "Products"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        backgroundImage={bannerData?.image || ProductsImg}
      >
        <div className="max-w-2xl">
          <p className="text-white/90 text-sm md:text-base">
            Browse categories, then choose a subcategory and view product
            details.
          </p>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryTile
              key={category.slug}
              to={`/products/${category.slug}`}
              name={category.name}
              description={category.description}
              image={category.image}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductsCategory() {
  const { category: categorySlug } = useParams();

  const { data: products = [], isLoading: loadingProducts } =
    useProductsByCategory(categorySlug);
  const { data: categories, isLoading: loadingCategories } =
    useProductCategories();

  const loading = loadingProducts || loadingCategories;
  const categoryData = categories?.find((c) => c.slug === categorySlug) || null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading, categorySlug]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!categoryData) {
    return (
      <div className="w-full bg-white">
        <PageHero
          title="Category Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Not Found" },
          ]}
          backgroundColor="from-slate-700 to-slate-900"
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <Link
            to="/products"
            className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const categoryHeroTitle = categoryData.heading || categoryData.name;
  const introTitle = categoryData.heading || categoryData.name;
  // Use HTML content for description if available, otherwise just text
  const descriptionHtml = categoryData.description;

  return (
    <div className="w-full bg-white" key={categoryData.slug}>
      <SEO
        title={categoryHeroTitle}
        description={categoryData.name} // Plain text desc would be better if we had it stripped
        image={categoryData.image}
      />
      <PageHero
        title={categoryHeroTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: categoryData.name },
        ]}
        // Using a default bg if none provided (API didn't seem to have bg image)
        backgroundImage={categoryData.heroBackgroundImage || ProductsImg}
        backgroundColor="from-green-600 to-emerald-700"
      ></PageHero>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 md:pt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            {introTitle}
          </h2>
          <div
            className="text-slate-600 leading-relaxed prose prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {products.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
            key={`grid-${categoryData.slug}`}
          >
            {products.map((item, index) => (
              <ProductTile
                key={item.id || item.slug}
                // Determine link logic. If product details exist, link there.
                // Assuming no deep product details page for now unless requested.
                // Or maybe just link to same page or modal?
                // Existing code linked to `/products/${category.slug}/${item.slug}`
                // Let's keep that pattern if we want detailed product pages later
                to={`/products/${categoryData.slug}/${item.slug}`} // Assuming product slug works
                name={item.name}
                image={item.image}
                priority={index < 4}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsIndex;
