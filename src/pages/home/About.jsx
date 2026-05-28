import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Truck,
  RefreshCcw,
  Headphones,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import SpicesImg from "../../assets/spices.jpeg";
import FruitsImg from "../../assets/Fruits.jpeg";
import { useAboutCompanyData, useWhyChooseUsData } from "../../hooks/useApi";

// Lucide fallback icons for the 4 service columns when CMS doesn't ship icons.
const FALLBACK_ICONS = [Truck, RefreshCcw, Headphones, ShieldCheck];

function PromoBanner({
  image,
  heading,
  description,
  badge,
  buttonText,
  buttonLink,
  align = "left",
  delay = 0,
}) {
  const alignClass = align === "right" ? "items-end text-right" : "items-start text-left";
  const overlayDirection =
    align === "right"
      ? "from-transparent via-[#434343]/55 to-[#434343]/90"
      : "from-[#434343]/90 via-[#434343]/55 to-transparent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className="relative h-[260px] sm:h-[300px] md:h-[340px] w-full overflow-hidden rounded-3xl shadow-xl shadow-[#434343]/20 group"
    >
      <img
        src={image}
        alt={heading || "Promo banner"}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Brand-tinted overlay (direction depends on text alignment) */}
      <div className={`absolute inset-0 bg-linear-to-r ${overlayDirection}`} />
      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

      {/* Top-left brand accent stripe */}
      <div className="absolute left-0 top-0 h-1.5 w-32 rounded-tl-3xl bg-linear-to-r from-[#FF2801] to-white/30" />

      <div className={`relative z-10 flex h-full w-full ${alignClass} flex-col justify-center px-6 sm:px-8 md:px-10`}>
        {badge && (
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FF2801] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow">
            <Sparkles size={12} />
            {badge}
          </span>
        )}

        {heading && (
          <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white max-w-md line-clamp-3">
            {heading}
          </h3>
        )}

        {description && (
          <div
            className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-white/85 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        <Link to={buttonLink} className="mt-5">
          <button className="inline-flex items-center gap-2 rounded-full bg-[#FF2801] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#FF2801]/40 transition-all hover:bg-[#e62500] hover:-translate-y-0.5">
            {buttonText}
            <ArrowRight size={14} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomeAboutSection() {
  const { data: aboutData } = useAboutCompanyData();
  const { data: whyChooseUs } = useWhyChooseUsData();

  const services = (whyChooseUs?.cards || []).slice(0, 4);

  if (!aboutData && services.length === 0) {
    return null;
  }

  const heading = aboutData?.heading || "";
  const description = aboutData?.description || "";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* --- TWO PROMO BANNERS (side by side) ---------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <PromoBanner
            image={SpicesImg}
            heading={heading}
            description={description}
            badge="About Covenant Peniel"
            buttonText="Explore Products"
            buttonLink="/products"
            align="left"
            delay={0}
          />
          <PromoBanner
            image={FruitsImg}
            heading={heading}
            description={description}
            badge="Premium Quality"
            buttonText="Learn More"
            buttonLink="/about"
            align="right"
            delay={0.15}
          />
        </div>

        {/* --- 4-SERVICE STRIP --------------------------------------------- */}
        {services.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-linear-to-r from-[#FF2801] via-[#e62500] to-[#cc1f00] p-4 md:p-6 shadow-xl shadow-[#FF2801]/25"
          >
            {services.map((card, i) => {
              const Icon = FALLBACK_ICONS[i] || ShieldCheck;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                  className="group flex flex-col items-center text-center px-4 py-5 rounded-2xl transition-colors duration-300 hover:bg-white/10"
                >
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/30 backdrop-blur transition-transform duration-300 group-hover:scale-110 overflow-hidden">
                    {card.icon ? (
                      <img
                        src={card.icon}
                        alt={card.title}
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      <Icon className="text-white" size={26} strokeWidth={2} />
                    )}
                  </div>
                  <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-white">
                    {card.title}
                  </h4>
                  <p className="mt-1 text-xs md:text-sm text-white/85 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
