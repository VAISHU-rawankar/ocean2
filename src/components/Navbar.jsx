import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Phone,
  X,
  Youtube,
  Globe,
} from "lucide-react";
import Logo from "/logo4.png";
import { SiGoogletranslate } from "react-icons/si";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isDesktopProductsOpen, setIsDesktopProductsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,gu,mr,bn,ta,te,kn,ml,pa,ur,or,as,es,fr,de,ar,ru,pt,zh-CN,ja,ko,it,nl,tr,vi,th,id,ms,fa,pl,uk,ro,el,cs,sv,hu,da,fi,no,he,af,sq,hy,az,eu,bg,ca,hr,sk,sl",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    const existingScript = document.querySelector(
      'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  const productCategories = [
    "Grains and Cereal",
    "Pulses",
    "Spices",
    "Fruits",
    "Vegetables",
    // "Oilseeds",
    // "Floriculture",
    // "Herbs",
    "Dry Fruits",
    "Beverages",
    "Dehydrated Products",
    "Organic Natural Products",
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down and past the header height (64px = 16 * 4)
      else if (currentScrollY > 64) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "en,hi,gu,mr,bn,ta,te,kn,ml,pa,ur,or,as,es,fr,de,ar,ru,pt,zh-CN,ja,ko,it,nl,tr,vi,th,id,ms,fa,pl,uk,ro,el,cs,sv,hu,da,fi,no,he,af,sq,hy,az,eu,bg,ca,hr,sk,sl",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element",
        );
      }
    };

    const existingScript = document.querySelector(
      'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <>
      <header className="fixed z-50 left-0 right-0 top-0 transition-all duration-500 ease-in-out font-sans">
        {/* Top Bar */}
        <div
          className={`w-full bg-linear-to-r from-[#FF2801] via-[#e62500] to-[#434343] text-white overflow-hidden transition-all duration-500 ease-in-out ${
            isVisible ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
              {/* Contact Information - Left Side */}
              <div className="flex flex-row items-center gap-4 sm:gap-6">
                <a
                  href="tel:+918885111263"
                  className="flex items-center gap-2 hover:text-gray-100 transition-all duration-300 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#434343] transition-all duration-300 shadow-sm">
                    <Phone size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium">
                    +91 8885 111 263
                  </span>
                </a>

                <a
                  href="mailto:sales@covenantpeniel.com"
                  className="flex items-center gap-2 hover:text-gray-100 transition-all duration-300 group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#434343] transition-all duration-300 shadow-sm">
                    <Mail size={14} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                    sales@covenantpeniel.com
                  </span>
                  <span className="text-xs sm:text-sm font-medium sm:hidden">
                    Email Us
                  </span>
                </a>
              </div>

              {/* CTA Message - Center (Hidden on small mobile to save space) */}
              <div className="hidden lg:block text-center">
                <p className="text-sm font-bold tracking-wide">
                  Premium Indian Spices & Agro Exported Worldwide!
                </p>
              </div>

              {/* Social Media - Right Side */}
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div
                  className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF2801] hover:scale-110 transition-all duration-300 shadow-sm overflow-hidden cursor-pointer"
                  title="Choose Language"
                >
                  <SiGoogletranslate color="black" size={14} />
                  <div
                    id="google_translate_element"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer [&_select]:w-full [&_select]:h-full [&_select]:opacity-0 [&_select]:cursor-pointer"
                  ></div>
                </div>

                <a
                  href="https://www.facebook.com/share/1DRvGZ16Nj/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Facebook page"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF2801] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                  <Facebook size={14} />
                </a>

                {/* <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our YouTube channel"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF2801] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                  <Youtube size={14} />
                </a> */}

                <a
                  href="https://www.instagram.com/oceanmark_exim?igsh=NXh2MDlxZjI1MXBs&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our Instagram page"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF2801] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                  <Instagram size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/rohit-nikumbh-483518366/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our LinkedIn page"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#FF2801] hover:scale-110 transition-all duration-300 shadow-sm"
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-white border-b border-slate-200 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="Covenant Peniel Exim"
                  className="h-16 w-auto object-contain"
                  style={{ imageRendering: "auto" }}
                />
              </Link>

              <div className="hidden items-center gap-8 md:flex">
                <Link
                  to="/"
                  className="text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                >
                  About Us
                </Link>
                <div className="relative group">
                  <button
                    className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                    type="button"
                    onClick={() =>
                      setIsDesktopProductsOpen(!isDesktopProductsOpen)
                    }
                  >
                    Products
                    <ChevronDown
                      size={16}
                      className={`transition ${isDesktopProductsOpen ? "rotate-180" : "group-hover:rotate-180"}`}
                    />
                  </button>

                  <div
                    className={`absolute left-0 top-full mt-3 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow-xl transition-all duration-200 ${
                      isDesktopProductsOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                    }`}
                  >
                    <Link
                      to="/products"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700 transition"
                      onClick={() => setIsDesktopProductsOpen(false)}
                    >
                      All Products
                    </Link>
                    {productCategories.map((item) => {
                      const slug = item.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <Link
                          key={slug}
                          to={`/products/${slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-700 transition"
                          onClick={() => setIsDesktopProductsOpen(false)}
                        >
                          {item}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link
                  to="/certificates"
                  className="text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                >
                  Certificates
                </Link>

                <Link
                  to="/blogs"
                  className="text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-semibold text-slate-700 hover:text-red-700 transition"
                >
                  Contact
                </Link>
              </div>

              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6 lg:px-8">
              <Link
                to="/"
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                About Us
              </Link>

              <button
                onClick={toggleProducts}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Products
                <ChevronDown
                  size={18}
                  className={`transition ${isProductsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isProductsOpen && (
                <div className="space-y-1 rounded-md bg-slate-50 p-2">
                  <Link
                    to="/products"
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                    onClick={closeMenu}
                  >
                    All Products
                  </Link>
                  {productCategories.map((item) => {
                    const slug = item.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <Link
                        key={slug}
                        to={`/products/${slug}`}
                        className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
                        onClick={closeMenu}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              )}

              <Link
                to="/certificates"
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Certificates
              </Link>

              <Link
                to="/blogs"
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={closeMenu}
              >
                Contact
              </Link>

              <Link
                to="/contact"
                className="mt-2 block rounded-md bg-red-600 px-3 py-2 text-center text-base font-semibold text-white hover:bg-red-700 transition"
                onClick={closeMenu}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
