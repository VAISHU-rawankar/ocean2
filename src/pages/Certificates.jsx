import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ChevronLeft, ChevronRight } from "lucide-react";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import CertificatesHeroBg from "../assets/slider-2.jpg";
import { useCertificatesData, useBannerByPage } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CertificatesComponent() {
  const { data, isLoading: loadingCertificates } = useCertificatesData();
  const { data: bannerData, isLoading: loadingBanner } =
    useBannerByPage("certificates");

  const loading = loadingCertificates || loadingBanner;
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleNext = () => {
    if (data?.items && selectedIndex !== null) {
      setSelectedIndex((prev) => (prev + 1) % data.items.length);
    }
  };

  const handlePrev = () => {
    if (data?.items && selectedIndex !== null) {
      setSelectedIndex((prev) =>
        prev === 0 ? data.items.length - 1 : prev - 1,
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Failed to load certificates.</p>
      </div>
    );
  }

  const { heading, description, items: certificates } = data;
  const currentCert =
    selectedIndex !== null ? certificates[selectedIndex] : null;

  return (
    <div className="w-full bg-slate-50">
      <SEO
        title={heading}
        description="View our certifications and accreditations including TPCI, APEDA, and ISO."
      />
      <PageHero
        title={bannerData?.title || heading}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Certificates" }]}
        backgroundImage={bannerData?.image || CertificatesHeroBg}
        overlayOpacity={60}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md border border-white/20"
        >
          <Award className="h-4 w-4" />
          Certified Excellence
        </motion.div>
      </PageHero>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          {/* Description Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-16 text-center max-w-4xl mx-auto"
          >
            <div
              className="text-lg text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-slate-900 text-center mb-12"
          >
            Our Accreditations
          </motion.h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {certificates.map((cert, index) => {
              const isPdf = cert.fileType === "pdf";
              return (
                <motion.div
                  key={cert.id}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedIndex(index)}
                  className="group relative cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#C6D869]/30 transition-all duration-300 border-2 border-[#C6D869]/30 hover:border-[#C6D869]"
                >
                  <div className="absolute left-0 top-0 h-1 w-10 rounded-tl-xl bg-linear-to-r from-[#C6D869] to-[#F5B921] transition-all duration-300 group-hover:w-full group-hover:rounded-tr-xl z-10" />
                  <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
                    {isPdf ? (
                      <iframe
                        src={`${cert.url}#toolbar=0&navpanes=0&scrollbar=0`}
                        title={cert.title}
                        className="w-full h-full object-cover pointer-events-none"
                        tabIndex="-1"
                        scrolling="no"
                        style={{ overflow: "hidden" }}
                      />
                    ) : (
                      <img
                        src={cert.url}
                        alt={cert.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Hover Overlay */}
                    {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"></div> */}
                  </div>

                  <div className="p-5 text-center bg-white relative z-10">
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#F5B921] transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && currentCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-colors"
            >
              <X size={28} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all hover:scale-110 hidden sm:flex"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all hover:scale-110 hidden sm:flex"
            >
              <ChevronRight size={32} />
            </button>

            {/* Content Container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`relative bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden ${currentCert.fileType === "pdf" ? "w-full max-w-6xl h-[85vh]" : "w-auto max-w-6xl h-auto max-h-[85vh]"}`}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="flex-1 bg-white overflow-hidden flex items-center justify-center relative">
                {currentCert.fileType === "pdf" ? (
                  <iframe
                    src={`${currentCert.url}#toolbar=0&navpanes=0`}
                    title={currentCert.title}
                    className="w-full h-full bg-white"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                ) : (
                  <img
                    src={currentCert.url}
                    alt={currentCert.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Mobile Navigation Controls */}
              <div className="sm:hidden flex items-center justify-between p-4 border-t border-slate-100 bg-white">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F5B921] text-white hover:bg-[#00a9c0]"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
