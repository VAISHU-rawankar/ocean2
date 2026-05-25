import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useProductStrengthData } from "../../hooks/useApi";

// Card Component
const MarketCard = ({ card }) => {
  return (
    <div className="relative w-80 shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all">
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#00BED7] to-[#C6D869] shadow-md">
          {card.image ? (
            <img
              src={card.image}
              alt={card.title}
              className="h-7 w-7 object-contain"
              loading="lazy"
            />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-white" strokeWidth={2} />
          )}
        </div>
        <h3 className="flex-1 text-lg font-bold text-slate-900">
          {card.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">
        {card.description}
      </p>
      <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-[#00BED7] to-[#C6D869]" />
    </div>
  );
};

export default function IndianMarketAndClients() {
  const { data: marketData, isLoading: loading } = useProductStrengthData();

  const cards = marketData?.cards || [];

  // Split cards into two rows
  const firstRow = cards.slice(0, Math.ceil(cards.length / 2));
  const secondRow = cards.slice(Math.ceil(cards.length / 2));

  return (
    <div className="w-full bg-linear-to-b from-slate-50 via-white to-slate-50 overflow-hidden py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#00BED7]/10 to-[#C6D869]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-slate-700 border border-[#00BED7]/20 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#00BED7] animate-pulse" />
            Why Indian Market
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {marketData?.heading || "Why the Indian market is"}{" "}
            <span className="bg-linear-to-r from-[#00BED7] to-[#C6D869] bg-clip-text text-transparent">
              Best?
            </span>
          </h2>

          <div className="h-1.5 w-32 bg-linear-to-r from-[#00BED7] to-[#C6D869] rounded-full mx-auto mb-6" />

          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            India offers unmatched diversity in climate, soil, and produce,
            creating a strong base for consistent, high-quality food supply
            across the globe.
          </p>
        </div>

        {/* Marquee Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BED7]"></div>
          </div>
        ) : (
          <div className="relative">
            {/* First Row - Left to Right */}
            <div className="marquee-container group mb-6">
              <div className="marquee-content">
                {[...firstRow, ...firstRow].map((card, index) => (
                  <MarketCard key={`row1-${card.id}-${index}`} card={card} />
                ))}
              </div>
            </div>

            {/* Second Row - Right to Left */}
            <div className="marquee-container marquee-reverse group">
              <div className="marquee-content">
                {[...secondRow, ...secondRow].map((card, index) => (
                  <MarketCard key={`row2-${card.id}-${index}`} card={card} />
                ))}
              </div>
            </div>

            {/* linear Overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-white to-transparent z-10"></div>
          </div>
        )}
      </div>

      <style>{`
        .marquee-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          gap: 1.5rem;
          animation: scroll-left 40s linear infinite;
          width: fit-content;
        }

        .marquee-reverse .marquee-content {
          animation: scroll-right 40s linear infinite;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
