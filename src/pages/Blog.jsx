import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { useBlogsData, useBannerByPage } from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogPage = () => {
  const { data: posts = [], isLoading: loadingPosts, error: blogError } = useBlogsData();
  const { data: bannerData, isLoading: loadingBanner } = useBannerByPage("blogs");

  const loading = loadingPosts || loadingBanner;
  const error = blogError?.message;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-linear-to-b from-[rgba(67,67,67,0.03)] via-white to-[rgba(255,40,1,0.04)]">
      <SEO
        title="Blog"
        description="Read the latest insights and articles about sustainable eating, food export, and healthy living from Covenant Peniel Exim."
      />
      <PageHero
        title={bannerData?.title || "Blog"}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        backgroundColor={
          !bannerData?.image ? "from-red-600 to-emerald-700" : undefined
        }
        backgroundImage={bannerData?.image}
        overlayOpacity={45}
        className="min-h-64 md:min-h-72"
        priority={true}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-white/90 text-sm md:text-base">
            Read our latest articles and insights from the team.
          </p>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Latest insights
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-600 max-w-xl">
              Stories and updates from Covenant Peniel Exim on global food trade,
              sourcing, and quality.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-500 ring-1 ring-slate-200/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#434343]" />
            Covenant Peniel Exim Blog
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
              }}
            >
            <Link
              to={`/blogs/${post.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-[#FF2801]/40 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF2801]/20 hover:border-[#FF2801]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />
                <img
                  src={post.image}
                  alt={post.title}
                  loading={index < 3 ? "eager" : "lazy"}
                  fetchpriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                  <span className="inline-flex items-center rounded-full bg-linear-to-r from-[#434343] to-[#FF2801] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm">
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-3 line-clamp-2 text-lg md:text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#434343]">
                  {post.title}
                </h3>

                <div
                  className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />

                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-[#434343]">
                  {post.readMore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
