import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useSubmitSupplier } from "../hooks/useApi";

export default function SupplierForm({ onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "India (+91)",
    mobileNumber: "",
    category: "Farmer",
    adharCard: "",
    productsAvailable: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { mutate: submitForm, isPending: loading } = useSubmitSupplier();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit number";
    }
    if (!formData.adharCard.trim())
      newErrors.adharCard = "Aadhaar number is required";
    else if (!/^\d{12}$/.test(formData.adharCard)) {
      newErrors.adharCard = "Please enter a valid 12-digit Aadhaar number";
    }
    if (!formData.productsAvailable.trim())
      newErrors.productsAvailable = "Products available is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const match = formData.countryCode.match(/\+\d+/);
    const country_code = match ? match[0] : formData.countryCode;

    const payload = {
      full_name: formData.fullName.trim(),
      email: formData.email.trim(),
      country_code,
      mobile: formData.mobileNumber.trim(),
      role: formData.category,
      aadhar: formData.adharCard.trim(),
      products: formData.productsAvailable.trim(),
    };

    submitForm(payload, {
      onSuccess: () => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          resetForm();
          if (onClose) onClose();
        }, 2500);
      },
      onError: (error) => {
        console.error("Supplier submit failed:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Submission failed. Please try again later.",
        }));
      },
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      countryCode: "India (+91)",
      mobileNumber: "",
      category: "Farmer",
      adharCard: "",
      productsAvailable: "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 min-h-screen z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto border-2 border-[#FF2801]/40"
      >
        <div className="absolute left-0 top-0 right-0 h-1.5 rounded-t-2xl bg-linear-to-r from-[#FF2801] via-[#434343] to-[#434343]" />
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#FF2801]/30 p-6 flex justify-between items-center rounded-t-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            BECOME A SUPPLIER WITH US
          </h1>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-[#434343] transition"
            aria-label="Close form"
          >
            <X size={28} />
          </button>
        </div>

        {/* Success / Error Message */}
        {submitted && (
          <div className="mx-6 mt-6 p-4 bg-red-100 border border-green-400 text-red-700 rounded">
            ✓ Form submitted successfully! Thank you for your interest.
          </div>
        )}
        {errors.form && (
          <div className="mx-6 mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.form}
          </div>
        )}

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Full Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF2801]"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF2801]"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Country Code and Mobile Number Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country Code <span className="text-red-500">*</span>
              </label>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF2801] bg-[#FF2801]/10 transition"
              >
                <option>India (+91)</option>
                <option>USA (+1)</option>
                <option>UK (+44)</option>
                <option>Canada (+1)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.mobileNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF2801]"
                }`}
                placeholder="Enter 10-digit number"
                maxLength="10"
              />
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

          {/* I Am A (Category) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              I Am A <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF2801] bg-[#FF2801]/10 transition"
            >
              <option>Farmer</option>
              <option>Distributor</option>
              <option>Manufacturer</option>
              <option>Exporter</option>
              <option>Wholesaler</option>
            </select>
          </div>

          {/* Aadhaar Card and Products Available Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Aadhaar Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="adharCard"
                value={formData.adharCard}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                  errors.adharCard
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF2801]"
                }`}
                placeholder="Enter 12-digit Aadhaar"
                maxLength="12"
              />
              {errors.adharCard && (
                <p className="text-red-500 text-sm mt-1">{errors.adharCard}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Products Available <span className="text-red-500">*</span>
              </label>
              <textarea
                name="productsAvailable"
                value={formData.productsAvailable}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition resize-none ${
                  errors.productsAvailable
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#FF2801]"
                }`}
                placeholder="List your available products"
                rows="4"
              />
              {errors.productsAvailable && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productsAvailable}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border-2 border-[#FF2801] text-[#434343] hover:bg-[#FF2801]/15 font-bold text-lg rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-60"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-linear-to-r from-[#FF2801] via-[#FF2801] to-[#434343] hover:brightness-110 text-white font-bold text-lg rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-60 shadow-md"
              disabled={loading}
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
