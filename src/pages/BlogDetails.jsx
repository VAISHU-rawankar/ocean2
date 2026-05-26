import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { ChevronRight, Share2, Clock, User } from "lucide-react";
import BlogImg from "../assets/about-banner.jpg";
import { useBlogsData } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

export default function BlogDetails() {
  const { slug } = useParams();
  const { data: posts = [], isLoading: loading, error: queryError } = useBlogsData();
  
  const post = posts?.find((p) => p.slug === slug);
  const error = queryError?.message;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
          <Link
            to="/blogs"
            className="text-[#5e7a17] hover:underline mt-4 block"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-linear-to-b from-gray-50 to-white min-h-screen">
        <SEO title="Blog Post Not Found" />
        <PageHero
          title="Blog Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blogs" },
            { label: "Not Found" },
          ]}
          backgroundColor="from-slate-700 to-slate-900"
          overlayOpacity={45}
          className="min-h-64 md:min-h-72"
        />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full bg-[#006837] px-6 py-3 text-white font-semibold hover:bg-[#005028] transition duration-300"
          >
            <ChevronRight size={18} />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white min-h-screen">
      <PageHero
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          { label: post.title },
        ]}
        overlayOpacity={45}
        className="min-h-64 md:min-h-72"
        heroImageAlt={post.title}
        backgroundImage={post.image || BlogImg}
        heroImageClassName="object-cover"
        priority={true}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="mb-8 flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-600">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 ring-1 ring-slate-200">
            <User size={14} />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 ring-1 ring-slate-200">
            <Clock size={14} />
            <span>{post.date}</span>
          </div>
          <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
            <Share2 size={14} />
            <span>Share</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 md:p-10 shadow-sm mb-12">
          <div className="prose prose-sm md:prose-base max-w-none">
            <div className="space-y-6 text-slate-700 leading-relaxed mb-12">
              {post.content.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base md:text-[17px] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {post.sections.length > 0 && (
              <div className="space-y-14">
                {post.sections.map((section) => (
                  <motion.section
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="pb-10 last:pb-0"
                  >
                    <div className="flex items-start gap-4 mb-8">
                      <div className="shrink-0 w-1.5 h-10 rounded-full bg-linear-to-b from-[#C6D869] to-[#F5B921]" />
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    {section.image && (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.35 }}
                        className="mb-8 rounded-2xl overflow-hidden border-2 border-[#C6D869]/30"
                      >
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-80 md:h-96 object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </motion.div>
                    )}

                    {section.htmlContent && (
                      <div
                        className="space-y-5 text-slate-700 leading-relaxed mb-8 prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: section.htmlContent,
                        }}
                      />
                    )}
                  </motion.section>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/blogs"
            className="inline-flex justify-center items-center gap-2 rounded-full bg-[#006837] px-8 py-4 font-semibold text-white hover:bg-[#005028] transition duration-300 shadow-md hover:shadow-lg"
          >
            <ChevronRight size={18} className="rotate-180" />
            Back to Blog
          </Link>
          <Link
            to="/contact"
            className="inline-flex justify-center items-center gap-2 rounded-full border border-slate-300 px-8 py-4 font-semibold text-slate-900 hover:bg-slate-50 transition duration-300"
          >
            Contact Us
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
