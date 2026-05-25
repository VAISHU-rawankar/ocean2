import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../../components/PageHero";
import SEO from "../../components/SEO";
import { useProductDetails } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProductsDetails() {
  const { category: categorySlug, id: itemSlug } = useParams();
  const {
    data: product,
    isLoading: loading,
    error: queryError,
  } = useProductDetails(itemSlug);
  const error = queryError?.message;

  const sections = useMemo(() => {
    if (!product) return [];
    const resolved = [];
    const add = (id, label) => {
      resolved.push({ id, label });
    };

    if (
      Array.isArray(product.marketDemand) &&
      product.marketDemand.length > 0
    ) {
      add("demand", "GLOBAL MARKET DEMAND");
    }

    if (
      Array.isArray(product.specificationRows) &&
      product.specificationRows.length > 0
    ) {
      add("specification", "SPECIFICATION");
    }

    if (product.ingredients) {
      add("ingredients", "INGREDIENTS");
    }

    if (product.usesAndBenefits) {
      add("uses", "USES & BENEFITS");
    }

    if (
      Array.isArray(product.otherSections) &&
      product.otherSections.length > 0
    ) {
      add("other", "VARIETIES");
    }

    // Static section
    // Only add export section when export info exists
    if (product.exportInfo) add("export", "EXPORT INFO");

    return resolved;
  }, [product]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="w-full bg-white">
        <SEO title="Product Not Found" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Product Not Found
            </h1>
            <p className="mt-3 text-slate-600">
              {error || "The product you are looking for does not exist."}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="inline-flex justify-center rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white hover:bg-emerald-700 transition"
              >
                Back to Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center rounded-full border border-slate-300 px-7 py-3 font-semibold text-slate-900 hover:bg-slate-50 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <SEO
        title={product.title}
        description={product.description
          ?.replace(/<[^>]*>?/gm, "")
          .substring(0, 160)}
        image={product.image}
      />
      <PageHero
        title={product.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.categoryName, href: `/products/${categorySlug}` },
          { label: product.title },
        ]}
        backgroundImage={product.backgroundImage}
        overlayOpacity={45}
        className="min-h-64 md:min-h-72"
        priority={true}
        heroImageAlt={product.title}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Product Description Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-12">
          <div className="p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 relative inline-block">
              About {product.title}
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-emerald-500 rounded-full"></span>
            </h2>
            <div
              className="prose prose-emerald max-w-none text-slate-600 leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="px-6 py-2 font-semibold text-sm transition-all duration-300 border-2 bg-white text-emerald-700 border-emerald-600 hover:bg-emerald-50"
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="mt-10 space-y-16">
          {/* Market Demand */}
          {sections.some((s) => s.id === "demand") && (
            <section id="demand" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-gray-900 rounded"></div>
                <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                  Global Market Demand
                </h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-6">
                {product.marketDemand.map((p, index) => (
                  <p
                    key={index}
                    className="text-gray-700 text-base leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Specification */}
          {sections.some((s) => s.id === "specification") && (
            <section id="specification" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-gray-900 rounded"></div>
                <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                  Specification
                </h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {product.specificationRows.map((row) => (
                      <tr
                        key={row.label}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-5 px-8 font-medium text-gray-900 bg-gray-50/50 w-1/3">
                          {row.label}
                        </td>
                        <td className="py-5 px-8 text-gray-700 text-base">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Ingredients */}
          {sections.some((s) => s.id === "ingredients") && (
            <section id="ingredients" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-gray-900 rounded"></div>
                <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                  Nutrition Details
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { key: "nutrients", label: "Nutrients" },
                  { key: "minerals", label: "Minerals" },
                  { key: "vitamin", label: "Vitamin" },
                  { key: "protein", label: "Protein" },
                  { key: "fats", label: "Fats" },
                ]
                  .filter(
                    ({ key }) =>
                      Array.isArray(product.ingredients?.[key]) &&
                      product.ingredients[key].length > 0,
                  )
                  .map(({ key, label }) => (
                    <div
                      key={key}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                        <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                        <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
                          {label}
                        </h3>
                      </div>
                      <ul className="space-y-2.5">
                        {product.ingredients[key].map((v) => (
                          <li
                            key={v}
                            className="text-gray-700 flex items-start gap-2"
                          >
                            <span className="text-gray-400 mt-1.5">•</span>
                            <span className="leading-relaxed">{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Uses */}
          {sections.some((s) => s.id === "uses") && (
            <section id="uses" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-1 w-12 bg-gray-900 rounded"></div>
                <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                  Uses &amp; Benefits
                </h2>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
                <div className="space-y-6">
                  {Array.isArray(product.usesAndBenefits.bullets) &&
                  product.usesAndBenefits.bullets.length > 0 ? (
                    <ul className="space-y-4">
                      {product.usesAndBenefits.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-gray-700 text-base"
                        >
                          <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2.5 flex-shrink-0"></span>
                          <span className="leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </section>
          )}

          {/* Other Sections / Varieties */}
          {sections.some((s) => s.id === "other") && (
            <section id="other" className="scroll-mt-28">
              {(() => {
                // Check if the first item is a header (no image)
                const firstItem = product.otherSections[0];
                const isHeader = firstItem && !firstItem.image;

                const title = isHeader
                  ? firstItem.title
                  : "Varieties & Options";
                const description = isHeader ? firstItem.description : null;
                const items = isHeader
                  ? product.otherSections.slice(1)
                  : product.otherSections;

                return (
                  <>
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex items-center gap-4">
                        <div className="h-1 w-12 bg-gray-900 rounded"></div>
                        <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                          {title}
                        </h2>
                      </div>
                      {description && (
                        <p className="text-gray-700 leading-relaxed text-lg max-w-4xl">
                          {description}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-xl hover:border-emerald-100 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            {item.image && (
                              <div className="flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg p-2 group-hover:bg-emerald-50 transition-colors">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-contain mix-blend-multiply"
                                />
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </section>
          )}

          {/* Export Info */}
          {sections.some((s) => s.id === "export") && (
            <section id="export" className="scroll-mt-28">
              <div className="flex items-center gap-4 mb-8">
                {/* <div className="h-1 w-12 bg-gray-900 rounded"></div> */}
                {/* <h2 className="text-2xl font-light tracking-wide text-gray-900 uppercase">
                  Export Info
                </h2> */}
              </div>
              <div className="bg-white  border border-gray-100 p-8">
                {product.exportInfo ? (
                  typeof product.exportInfo === "string" ? (
                    <p className="text-gray-700 text-base leading-relaxed">
                      {product.exportInfo}
                    </p>
                  ) : Array.isArray(product.exportInfo) ? (
                    <ul className="space-y-3">
                      {product.exportInfo.map((it, i) => (
                        <li key={i} className="text-gray-700">
                          {it}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid gap-3">
                      {Object.entries(product.exportInfo).map(([k, v]) => (
                        <div key={k} className="flex gap-4">
                          <div className="font-medium text-gray-900 w-36">
                            {k.replace(/_/g, " ")}
                          </div>
                          <div className="text-gray-700">
                            {Array.isArray(v) ? v.join(", ") : String(v)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <p className="text-gray-700">
                    No export information available.
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
