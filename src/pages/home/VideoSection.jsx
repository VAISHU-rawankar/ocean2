import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useWelcomeVideoData } from "../../hooks/useApi";

export default function VideoSection() {
  const { data: videoData, isLoading: loading } = useWelcomeVideoData();


  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return null;
  }

  if (!videoData || !videoData.links || videoData.links.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {videoData.heading}
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto rounded-full" />
        </Motion.div>

        <div
          className={`grid gap-8 ${
            videoData.links.length === 1
              ? "grid-cols-1 max-w-4xl mx-auto"
              : videoData.links.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {videoData.links.map((link, index) => {
            const videoId = getYouTubeId(link);
            if (!videoId) return null;

            return (
              <Motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Omkara Impex Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </Motion.div>
            );
          })}
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            to="/about-us"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Read More
          </Link>
        </Motion.div>
      </div>
    </section>
  );
}
