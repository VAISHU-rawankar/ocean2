import React from "react";
import spices from "../assets/spices.jpeg";
import grains from "../assets/grains.jpeg";
import fruits from "../assets/Fruits.jpeg";
import vegetables from "../assets/vegitable.jpeg";
import pulses from "../assets/Pulse.jpeg";
import rice from "../assets/Rice.jpeg";
import tea from "../assets/Tea.jpeg";
import herbs from "../assets/Herbs.jpeg";
import turmeric from "../assets/Haldi.jpeg";
import coffee from "../assets/coffee.jpeg";
import oilseeds from "../assets/oilseeds.jpeg";
import onion from "../assets/onion.jpeg";

const ITEMS = [
  { src: spices, alt: "Spices" },
  { src: grains, alt: "Grains" },
  { src: fruits, alt: "Fruits" },
  { src: vegetables, alt: "Vegetables" },
  { src: pulses, alt: "Pulses" },
  { src: rice, alt: "Rice" },
  { src: tea, alt: "Tea" },
  { src: herbs, alt: "Herbs" },
  { src: turmeric, alt: "Turmeric" },
  { src: coffee, alt: "Coffee" },
  { src: oilseeds, alt: "Oilseeds" },
  { src: onion, alt: "Onion" },
];

export default function ProductMarquee() {
  // Duplicate the list so the translate -50% loop is seamless.
  const looped = [...ITEMS, ...ITEMS];

  return (
    <section className="relative overflow-hidden border-y border-[#C6D869]/40 bg-white py-5">
      {/* edge fades so items don't pop in/out abruptly */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent" />

      <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
        {looped.map((item, i) => (
          <div
            key={i}
            className="group relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-[#C6D869]/40 shadow-sm transition-transform duration-300 hover:scale-105 hover:border-[#F5B921] hover:shadow-md"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.alt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
