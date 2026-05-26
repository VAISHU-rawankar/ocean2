import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  useBannerByPage,
  useContactUs,
  useSubmitContactForm,
} from "../hooks/useApi";

export default function ContactBranches() {
  const { data: bannerData, isLoading: loadingBanner } =
    useBannerByPage("contact_us");
  const { data: contact, isLoading: loadingContact } =
    useContactUs("contact_us");
  const { mutate: submitForm, isPending: isSubmitting } =
    useSubmitContactForm();

  const loading = loadingBanner || loadingContact;
  const [submitMessage, setSubmitMessage] = useState(null);
  const [_submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    mobileNumber: "",
    companyName: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage(null);
    setSubmitted(false);

    submitForm(formData, {
      onSuccess: (response) => {
        if (response.success) {
          setSubmitted(true);
          setSubmitMessage({ type: "success", text: response.message });
          setFormData({
            fullName: "",
            email: "",
            countryCode: "+91",
            mobileNumber: "",
            companyName: "",
            message: "",
          });
          setTimeout(() => {
            setSubmitted(false);
            setSubmitMessage(null);
          }, 3000);
        } else {
          setSubmitMessage({
            type: "error",
            text: response.message || "Something went wrong. Please try again.",
          });
        }
      },
      onError: () => {
        setSubmitMessage({
          type: "error",
          text: "Failed to send message. Please try again later.",
        });
      },
    });
  };
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="w-full bg-linear-to-b from-white via-green-50 to-white">
      <SEO
        title="Contact Us"
        description="Get in touch with oceanmarkexim for your Indian food export requirements. We are here to serve you."
      />
      <PageHero
        title={bannerData?.title || "Contact Us"}
        backgroundImage={bannerData?.image}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col justify-start"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 relative">
              {contact?.address_title}
              <span className="absolute bottom-0 left-0 w-16 h-1 rounded bg-linear-to-r from-[#C6D869] to-[#F5B921]"></span>
            </h2>

            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-[#006837]" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-gray-700 text-base leading-relaxed font-medium">
                    {contact?.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Mail className="w-6 h-6 text-[#006837]" strokeWidth={2} />
                </div>
                <div>
                  <a
                    href="mailto:enquiry@nexaportsglobal.com"
                    className="text-gray-700 hover:text-[#006837] transition text-base font-medium"
                  >
                    {contact?.emails[0]}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Phone className="w-6 h-6 text-[#006837]" strokeWidth={2} />
                </div>
                <div>
                  <div className="space-y-1">
                    {contact?.phone_numbers.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone}`}
                        className="text-gray-700 hover:text-[#006837] transition text-base font-medium"
                      >
                        {phone} <br />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-110 rounded-2xl overflow-hidden shadow-md border-2 border-[#C6D869]/40">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6082.577792267853!2d73.74698934976806!3d20.002931038540208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddebc422ba8ce5%3A0xeac222c3f79c2550!2sOceanMark%20Exim!5e1!3m2!1sen!2sin!4v1768892635526!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OceanMark Exim Location"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Right: Connect With Us Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative bg-white rounded-2xl p-8 md:p-10 shadow-lg border-2 border-[#C6D869]/40 overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-1.5 w-32 rounded-tl-2xl bg-linear-to-r from-[#C6D869] to-[#F5B921]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 relative">
              CONNECT WITH US
              <span className="absolute bottom-0 left-0 w-16 h-1 rounded bg-linear-to-r from-[#C6D869] to-[#F5B921]"></span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Country Code & Mobile Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Country Code <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition bg-white cursor-pointer"
                  >
                    <option value="+91">India (+91)</option>
                    <option value="+1">USA (+1)</option>
                    <option value="+44">UK (+44)</option>
                    <option value="+61">Australia (+61)</option>
                    <option value="+86">China (+86)</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition"
                  placeholder="Your company"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6D869] focus:border-transparent transition resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-linear-to-r from-[#C6D869] via-[#a4c34a] to-[#006837] hover:brightness-110 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {contact?.contact_btn_name || "Send Message"}
                  </>
                )}
              </button>

              {/* Status Message */}
              {submitMessage && (
                <div
                  className={`px-4 py-3 rounded-lg text-center font-semibold animate-pulse ${
                    submitMessage.type === "success"
                      ? "bg-green-50 border border-green-300 text-green-800"
                      : "bg-red-50 border border-red-300 text-red-800"
                  }`}
                >
                  {submitMessage.type === "success" ? "✓ " : "⚠ "}
                  {submitMessage.text}
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Branches Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-20 pt-12 border-t border-[#C6D869]/30"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {contact?.branch_heading}
            </h2>
            <div className="w-24 h-1 rounded mx-auto bg-linear-to-r from-[#C6D869] to-[#F5B921]"></div>
          </div>

          {/* Branches Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
            }}
            className="flex flex-wrap justify-center gap-8"
          >
            {contact?.branches?.map((branch, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6 }}
                className="w-full md:max-w-md bg-white rounded-2xl p-8 border-2 border-[#C6D869]/40 hover:border-[#C6D869] shadow-md hover:shadow-2xl hover:shadow-[#C6D869]/20 transition duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C6D869]/25 rounded-lg group-hover:bg-[#C6D869]/40 transition">
                    <MapPin
                      className="w-6 h-6 text-[#5e7a17]"
                      strokeWidth={2}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5e7a17] transition">
                      {branch.branch_location}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {branch.branch_address}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      {/* Decorative Background Elements */}
      <div className="fixed top-0 right-0 -z-10 w-96 h-96 bg-[#C6D869] rounded-full blur-3xl opacity-15 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-[#F5B921] rounded-full blur-3xl opacity-10 pointer-events-none"></div>
    </div>
  );
}
