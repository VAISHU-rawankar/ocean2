import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import PageHero from "../../components/PageHero";
import AboutBanner from "../../../public/new.jpeg";
import AboutImg from "../../assets/AboutUs.jpeg";
import HomeAboutImg from "../../assets/HomeAbout.jpg";
import SEO from "../../components/SEO";
import { useAboutPageData, useBannerByPage } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";

const AboutUs = () => {
  const { data: aboutData, isLoading: loadingAbout, error: aboutError } = useAboutPageData();
  const { data: bannerData, isLoading: loadingBanner } = useBannerByPage("about_us");
  
  const loading = loadingAbout || loadingBanner;
  const error = aboutError;

  const _motion = motion;
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageHover = {
    hover: { scale: 1.02, transition: { duration: 0.35, ease: "easeOut" } },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !aboutData) {
    return null; // Or some error UI
  }

  return (
    <div className="w-full bg-linear-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <SEO
        title="About Us"
        description="Learn more about Covenant Peniel Exim, a leading exporter of premium Indian spices, grains, and food products."
      />
      <PageHero
        title={bannerData?.title || "About Us"}
        backgroundImage={bannerData?.image || AboutBanner}
        overlayOpacity={55}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        ></motion.div>
      </PageHero>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="px-6 md:px-8 py-14 md:py-16 max-w-7xl mx-auto relative"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#FF2801] rounded-full blur-3xl opacity-10" />
          <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-[#434343] rounded-full blur-3xl opacity-10" />
        </div>
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
          {/* Image Container */}
          <motion.div variants={fadeLeft} className="w-full md:w-1/2">
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-105 bg-white ring-1 ring-[rgba(67,67,67,0.18)]">
              <img
                src={aboutData.about.image || AboutImg}
                alt={aboutData.about.heading}
                className="w-full h-full object-cover scale-[1.02]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
            </div>
          </motion.div>

          {/* Text Container */}
          <motion.div variants={fadeRight} className="w-full md:w-1/2">
            <h1 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              {aboutData.about.heading}
            </h1>
            <motion.div
              variants={underlineVariants}
              className="mt-5 h-1 w-28 bg-linear-to-r from-[#FF2801] to-[#434343] rounded-full origin-left"
            />
            <div
              className="mt-6 text-slate-600 text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData.about.description }}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="px-6 md:px-8 py-10 md:py-12 max-w-7xl mx-auto md:mb-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {aboutData.vision_cards.map((card, index) => {
            const isMission = card.card_name.toLowerCase().includes("mission");
            const Icon = isMission ? Target : Eye;
            const bgClass = isMission
              ? "bg-[#FF2801]/10 ring-[rgba(255,40,1,0.25)]"
              : "bg-[#434343]/10 ring-[rgba(67,67,67,0.25)]";
            const iconColor = isMission ? "text-[#FF2801]" : "text-[#434343]";

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex-shrink-0 rounded-2xl p-3 ring-1 ${bgClass}`}
                  >
                    <Icon
                      className={`w-8 h-8 ${iconColor}`}
                      strokeWidth={1.6}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {card.card_name}
                    </h3>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* What We Do Section */}
      {aboutData.questions[1] && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative px-6 md:px-8 pb-16 md:pb-20 max-w-7xl mx-auto"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-6 left-8 w-72 h-72 bg-[#434343] rounded-full blur-3xl opacity-12" />
            <div className="absolute bottom-8 right-6 w-64 h-64 bg-[#FF2801] rounded-full blur-3xl opacity-10" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <motion.div variants={fadeLeft} className="order-1 md:order-1">
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {aboutData.questions[1].heading}
              </h2>
              <motion.div
                variants={underlineVariants}
                className="mt-5 h-1 w-28 bg-linear-to-r from-[#FF2801] to-[#434343] rounded-full origin-left"
              />
              <motion.div
                variants={fadeUp}
                className="mt-6 bg-white/60 backdrop-blur-sm  p-6 md:p-8 border border-slate-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className="text-slate-700 text-base leading-relaxed font-light"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.questions[1].description,
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              whileHover="hover"
              className="order-2 md:order-2"
            >
              <motion.div
                variants={imageHover}
                className="relative  overflow-hidden h-80 md:h-96 bg-white ring-1 ring-[rgba(67,67,67,0.18)]"
              >
                <img
                  src={aboutData.questions[1].image || AboutImg}
                  alt={aboutData.questions[1].heading}
                  className="w-full h-full object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-12 flex justify-center">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-5xl h-px bg-linear-to-r from-transparent via-[#434343] to-transparent origin-center"
            />
          </div>
        </motion.section>
      )}

      {/* Who We Are Section */}
      {aboutData.questions[1] && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative px-6 md:px-8 py-14 md:py-0 max-w-7xl mx-auto"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-8 w-72 h-72 bg-[#434343] rounded-full blur-3xl opacity-12" />
            <div className="absolute bottom-10 left-6 w-64 h-64 bg-[#FF2801] rounded-full blur-3xl opacity-10" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
            <motion.div
              variants={fadeLeft}
              whileHover="hover"
              className="order-2 md:order-1"
            >
              <motion.div
                variants={imageHover}
                className="relative overflow-hidden h-80 md:h-105 bg-white shadow-xl ring-1 ring-[rgba(67,67,67,0.18)]"
              >
                <img
                  src={aboutData.questions[0].image || HomeAboutImg}
                  alt={aboutData.questions[0].heading}
                  className="w-full h-full object-cover scale-[1.02]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/5 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} className="order-1 md:order-2">
              <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                {aboutData.questions[0].heading}
              </h2>
              <motion.div
                variants={underlineVariants}
                className="mt-5 h-1 w-28 bg-linear-to-r from-[#FF2801] to-[#434343] rounded-full origin-left"
              />
              <motion.div
                variants={fadeUp}
                className="mt-6 bg-white/60 backdrop-blur-sm  p-6 md:p-8 border border-slate-100/50 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div
                  className="text-slate-700 text-base leading-relaxed font-light"
                  dangerouslySetInnerHTML={{
                    __html: aboutData.questions[0].description,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Stat Strip */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="px-6 md:px-8 py-10 max-w-7xl mx-auto"
      >
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#FF2801] via-[#ff6b4a] to-[#434343] p-1 shadow-lg">
          <div className="rounded-[1.4rem] bg-white/95 backdrop-blur-sm px-6 py-8 md:px-10 md:py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 text-center">
              {[
                { num: "25+", label: "Countries Served" },
                { num: "100+", label: "Products" },
                { num: "100%", label: "Quality Assured" },
                { num: "24/7", label: "Support" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  <span className="text-3xl md:text-4xl font-extrabold bg-linear-to-r from-[#434343] to-[#434343] bg-clip-text text-transparent">
                    {s.num}
                  </span>
                  <span className="mt-1 text-xs md:text-sm font-semibold tracking-wide uppercase text-slate-700">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        className="px-6 md:px-8 py-16 md:py-20 md:mt-10 bg-linear-to-b from-[rgba(67,67,67,0.06)] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {aboutData.values.heading}
            </h2>
            <motion.div
              variants={underlineVariants}
              className="h-1 w-28 bg-linear-to-r from-transparent via-[#434343] to-transparent mx-auto origin-center"
            />
            <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed">
              Principles that guide how we serve customers and deliver quality
              at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {aboutData.values.cards.map((card, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 hover:shadow-lg transition text-left"
              >
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
