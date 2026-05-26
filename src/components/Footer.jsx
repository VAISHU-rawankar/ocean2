import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SupplierForm from "../pages/Supplierform";
import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import footerImg from "../assets/footer-bg.png";
import FooterImage from "../assets/image.footer.jpg";
import Logo from "/logo1.png";

export default function OMKARAIMPEXFooter() {
  const _motion = motion;
  const [requirementEmail, setRequirementEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

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

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      x: 5,
      color: "#059669",
      transition: { duration: 0.2 },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      backgroundColor: "#059669",
      transition: { duration: 0.3 },
    },
  };

  // Navigation data
  const footerData = {
    information: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Certificates", href: "/certificates" },
      { label: "Blogs", href: "/blogs" },
      { label: "Careers", href: "#" },
      { label: "Contact Us", href: "/contact" },
    ],
    productsRange: [
      { label: "Grains And Cereal" },
      { label: "Pulses" },
      { label: "Spices" },
      { label: "Fruits" },
      { label: "Vegetables" },
      { label: "Dehydrated Products" },
    ],
    branches: [
      { label: "Pune", href: "#" },
      { label: "Mumbai", href: "#" },
      { label: "Bangalore", href: "#" },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmitRequirement = (e) => {
    e.preventDefault();
    const email = requirementEmail.trim();
    const to = "enquiry@oceanmarkexim.com";
    const subject = "Enquiry";
    const body = email ? `Email: ${email}` : "";
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject,
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setRequirementEmail("");
  };

  return (
    <footer className="relative text-slate-900 overflow-hidden border-t border-gray-200">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${footerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
      </div>

      {/* <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-[0.08]">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-600 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div> */}

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {/* About Section */}
            <motion.div variants={columnVariants} className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <img src={Logo} alt="OMKARAIMPEX" className="" />
              </motion.div>

              <p className="text-slate-700 text-sm leading-relaxed mb-8">
                We safely move and deliver food with quality, care, and
                efficiency
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    icon: Facebook,
                    label: "Facebook",
                    url: "https://www.facebook.com/share/1DRvGZ16Nj/?mibextid=wwXIfr",
                  },
                  // {
                  //   icon: Youtube,
                  //   label: "YouTube",
                  //   url: "https://www.youtube.com/channel/UC333333333333333333333",
                  // },
                  {
                    icon: Instagram,
                    label: "Instagram",
                    url: "https://www.instagram.com/oceanmark_exim?igsh=NXh2MDlxZjI1MXBs&utm_source=qr",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/rohit-nikumbh-483518366/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialVariants}
                    whileHover="hover"
                    className="w-10 h-10 rounded-full bg-white ring-1 ring-black/10 flex items-center justify-center hover:bg-emerald-600 transition-colors duration-300"
                  >
                    <social.icon size={18} className="text-slate-700" />
                  </motion.a>
                ))}
              </div>

              {/* QR Code Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8"
              >
                <h5 className="text-sm font-semibold text-slate-900 mb-3">
                  Download Our Brochure
                </h5>
                <div className="bg-white p-4 rounded-lg shadow-md ring-1 ring-black/10 inline-block">
                  <img
                    src="/Oceanmark-Exim-Brochure.png"
                    alt="QR Code for Brochure"
                    loading="lazy"
                    className="w-32 h-32 object-contain"
                  />
                  {/* <p className="text-xs text-slate-600 text-center mt-2">
                    Scan to download brochure
                  </p> */}
                </div>
              </motion.div>
            </motion.div>

            {/* Information Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-3 relative pb-3">
                  Information
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-full"
                  />
                </h4>
              </div>
              <ul className="space-y-3">
                {footerData.information.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer transition-colors"
                  >
                    <ChevronRight size={16} />
                    {item.label === "Become Supplier" ? (
                      <button
                        onClick={() => setIsSupplierFormOpen(true)}
                        className="text-left hover:text-emerald-700 transition-colors"
                      >
                        {item.label}
                      </button>
                    ) : item.href?.startsWith("/") ? (
                      <Link to={item.href}>{item.label}</Link>
                    ) : (
                      <a href={item.href}>{item.label}</a>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Products Range Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-3 relative pb-3">
                  Products Range
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-full"
                  />
                </h4>
              </div>
              <ul className="space-y-3">
                {footerData.productsRange.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 cursor-pointer transition-colors"
                  >
                    <ChevronRight size={16} />
                    <Link
                      to={`/products/${item.label
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Get In Touch Section */}
            <motion.div variants={columnVariants}>
              <div className="mb-8">
                <h4 className="text-xl font-bold text-slate-900 mb-3 relative pb-3">
                  Stay Connected
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "60px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-full"
                  />
                </h4>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex gap-3"
                >
                  <MapPin
                    size={20}
                    className="text-emerald-500 shrink-0 mt-1"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      REGISTERED ADDRESS:
                    </p>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      5th Floor, A502, The Hub, Parijat Nagar Chowk,
                      <br />
                      Mahatma Nagar Road, Nashik - 422005
                    </p>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex gap-3"
                >
                  <Phone size={20} className="text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      PHONE NUMBER:
                    </p>
                    <p className="text-slate-700 text-sm hover:text-emerald-700 cursor-pointer transition-colors">
                      +91 9156935665
                    </p>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex gap-3"
                >
                  <Mail size={20} className="text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm mb-1">
                      EMAIL:
                    </p>
                    <p className="text-slate-700 text-sm hover:text-emerald-700 cursor-pointer transition-colors">
                      enquiry@oceanmarkexim.com
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden leading-none -mb-px">
          <img
            src={FooterImage}
            alt="Global logistics — ship, truck and air freight"
            className="block w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[300px] object-cover object-center"
            style={{ imageRendering: "auto" }}
          />
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <p className="text-slate-700 text-sm text-center md:text-left">
              © 2025{" "}
              <span className="font-semibold text-slate-900">
                Oceanmark Exim
              </span>
              , Designed & Developed by{" "}
              <a
                href="#"
                className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
              >
                AnantKamal Software Labs
              </a>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.6 }}
          className="h-px bg-linear-to-r from-transparent via-slate-300 to-transparent origin-left"
        />
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-15 z-50 p-3 rounded-full bg-[#006837] text-white shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Supplier Form Modal */}
      <AnimatePresence>
        {isSupplierFormOpen && (
          <div className="fixed inset-0 z-100">
            <SupplierForm onClose={() => setIsSupplierFormOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
