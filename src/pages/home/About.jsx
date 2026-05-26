import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import HomeAbout from "../../assets/HomeAbout.jpg";
import { useAboutCompanyData, useWhyChooseUsData } from "../../hooks/useApi";

const _motion = motion;

function FeatureCard({ image, title, desc }) {
  return (
    <div className="rounded-xl border-2 border-[#C6D869]/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C6D869] hover:shadow-md hover:shadow-[#C6D869]/30">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#C6D869]/20 text-[#7a9a1f] overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="h-6 w-6 object-contain" />
        ) : (
          <Sparkles size={18} />
        )}
      </div>
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{desc}</p>
    </div>
  );
}

export default function OMKARAIMPEXComponent() {
  const { data } = useAboutCompanyData();
  const { data: whyChooseUs } = useWhyChooseUsData();

  const aboutData = data || {
    heading: "Oceanmark – Global Importers & Exporters of Food Products",
    description:
      "Oceanmark Exim is an India-based merchant export company specializing in high-quality agricultural commodities and Indian spices. We source directly from trusted farmers and manufacturers to ensure consistent quality and global compliance.",
    icon_url: null,
  };

  const featureCards = (whyChooseUs?.cards || []).map((card) => ({
    image: card.icon,
    title: card.title,
    desc: card.description,
  }));

  // Split cards roughly in half for the two scrolling columns.
  const mid = Math.ceil(featureCards.length / 2);
  const colA = featureCards.slice(0, mid);
  const colB = featureCards.slice(mid);

  // Animation variants for the left side (scroll-triggered).
  const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-16 sm:py-20">
      <div className="absolute inset-0 bg-linear-to-br from-[#C6D869]/10 via-white to-[#F5B921]/10" />

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:gap-6 lg:px-8">
        {/* LEFT — Image + intro text + stats */}
        <motion.div
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C6D869]/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#5e7a17]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7a9a1f]" />
            About Oceanmark Exim
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
            {aboutData.heading}
          </h1>

          <div className="h-1 w-24 rounded-full bg-linear-to-r from-[#C6D869] to-[#F5B921]" />

          <div className="relative overflow-hidden rounded-3xl border-2 border-[#C6D869]/40 bg-white shadow-lg">
            <img
              src={aboutData.icon_url || HomeAbout}
              alt="Oceanmark Exim"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-72 lg:h-80"
            />
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 text-xs sm:text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">
                  Quality-focused sourcing
                </p>
                <p className="text-slate-600">
                  Handpicked produce from trusted farms across India
                </p>
              </div>
              <div className="shrink-0 rounded-full bg-[#C6D869] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                Since 2025
              </div>
            </div>
          </div>

        </motion.div>

        {/* RIGHT — Two columns of cards scrolling bottom → top */}
        <motion.div
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[520px] overflow-hidden lg:h-[600px]"
        >
          {/* fade masks top + bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-linear-to-b from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-slate-50 to-transparent" />

          <div className="grid grid-cols-2 gap-3 hover:[&>div]:[animation-play-state:paused]">
            {/* Column A — scrolls faster */}
            <div className="animate-scroll-up-fast flex flex-col gap-3">
              {[...colA, ...colA].map((card, i) => (
                <FeatureCard key={`a-${i}`} {...card} />
              ))}
            </div>

            {/* Column B — scrolls slower (parallax feel), offset down */}
            <div className="animate-scroll-up-slow mt-6 flex flex-col gap-3">
              {[...colB, ...colB].map((card, i) => (
                <FeatureCard key={`b-${i}`} {...card} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
