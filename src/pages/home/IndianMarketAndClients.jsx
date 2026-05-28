import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useProductStrengthData } from "../../hooks/useApi";
import BgImage from "../../assets/Aboutship.jpg";

// Card Component
const MarketCard = ({ card }) => {
  return (
    <div className="relative w-80 shrink-0 cursor-pointer overflow-hidden rounded-2xl border-2 border-[#FF2801]/40 bg-white p-6 transition-all hover:border-[#FF2801] hover:shadow-xl hover:shadow-[#FF2801]/30">
      <div className="mb-4 flex items-start gap-3">
        <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#FF2801] to-[#434343] shadow-md">
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
      <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-[#FF2801] to-[#434343]" />
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
    <div className="relative w-full overflow-hidden py-16">
      {/* Background image + dark brand overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImage})` }}
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-[#434343]/85 via-[#434343]/80 to-[#434343]/90" />
      <div className="absolute inset-0 -z-10 bg-[#FF2801]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white border border-white/30 mb-4">
            <span className="h-2 w-2 rounded-full bg-[#FF2801] animate-pulse" />
            Why Indian Market
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {marketData?.heading || "Why the Indian market is"}{" "}
            <span className="bg-linear-to-r from-[#FF2801] to-white bg-clip-text text-transparent">
              Best?
            </span>
          </h2>

          <div className="h-1.5 w-32 bg-linear-to-r from-[#FF2801] to-white rounded-full mx-auto mb-6" />

          <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed">
            India offers unmatched diversity in climate, soil, and produce,
            creating a strong base for consistent, high-quality food supply
            across the globe.
          </p>
        </div>

        {/* Marquee Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF2801]"></div>
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
