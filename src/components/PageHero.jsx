import React from "react";
import { Link } from "react-router-dom";

export function PageHero({
  title = "Page",
  breadcrumb,
  breadcrumbs,
  backgroundImage,
  backgroundColor = "from-red-600 to-emerald-700",
  overlayOpacity = 45,
  className = "",
  heroImage,
  heroImageAlt = "",
  heroImageClassName = "",
  children,
  priority = false,
}) {
  const overlayAlpha = Math.min(100, Math.max(0, overlayOpacity)) / 100;

  return (
    <section
      className={`relative w-full overflow-hidden flex items-center min-h-[280px] md:min-h-[320px] lg:min-h-[360px] ${className}`}
    >
      {/* Background Image */}
      {backgroundImage && backgroundImage.trim() !== "" ? (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-br ${backgroundColor}`}
        />
      )}

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlayAlpha})` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 pt-32 md:pt-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                {title}
              </h1>

              {Array.isArray(breadcrumbs) && breadcrumbs.length > 0 ? (
                <nav className="mt-2 text-sm font-medium uppercase tracking-wide text-white/80">
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <span key={`${item.label}-${index}`}>
                        {index > 0 ? " / " : ""}
                        {item.href && !isLast ? (
                          <Link to={item.href} className="hover:text-white">
                            {item.label}
                          </Link>
                        ) : (
                          <span className={isLast ? "text-white" : ""}>
                            {item.label}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </nav>
              ) : breadcrumb ? (
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/80">
                  {breadcrumb}
                </p>
              ) : null}

              {children ? <div className="mt-6">{children}</div> : null}
            </div>

            {heroImage ? (
              <div className="w-full lg:w-auto">
                <div className="relative w-full max-w-sm lg:max-w-md mx-auto">
                  <img
                    src={heroImage}
                    alt={heroImageAlt}
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : "auto"}
                    decoding="async"
                    className={`w-full h-auto rounded-3xl shadow-2xl ring-1 ring-white/15 ${heroImageClassName}`}
                  />
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-black/20 via-black/0 to-black/0 pointer-events-none" />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
