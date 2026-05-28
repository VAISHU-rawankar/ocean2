import React from "react";
import About from "./About";
import HeroSection from "../../components/HeroSection";
import ProductMarquee from "../../components/ProductMarquee";
import PropularProducts from "../home/PopularProducts";
import WhyChooseUs from "../home/WhyChooseUs";
import ProductRange from "./ProductRange";
import Testomonials from "./Testimonials";
import VideoSection from "./VideoSection";
import IndianMarketAndClients from "./IndianMarketAndClients";
import SEO from "../../components/SEO";

function Home() {
  return (
    <div>
      <SEO
        title="Home"
        description="Covenant Peniel Exim - Your trusted partner for premium quality Indian spices, grains, and food exports."
      />
      <HeroSection />
      <ProductMarquee />
      <About />
      <PropularProducts />
      <WhyChooseUs />
      <ProductRange />
      <Testomonials />
      <VideoSection />
      <IndianMarketAndClients />
    </div>
  );
}

export default Home;
