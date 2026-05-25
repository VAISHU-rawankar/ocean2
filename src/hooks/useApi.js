import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getHeroData,
  getTestimonialsData,
  getProductCategories,
  getProductsByCategory,
  getAboutCompanyData,
  getWhyChooseUsData,
  getAboutPageData,
  getBlogsData,
  getProductDetails,
  getCertificatesData,
  getOurClientsData,
  getProductStrengthData,
  getWelcomeVideoData,
  getBannerData,
  getBannerByPage,
  getContactUs,
  submitContactForm,
  submitSupplier,
} from "../api/heroApi";
 
export const useHeroData = () => {
  return useQuery({
    queryKey: ["heroData"],
    queryFn: getHeroData,
  });
};

export const useTestimonialsData = () => {
  return useQuery({
    queryKey: ["testimonialsData"],
    queryFn: getTestimonialsData,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: getProductCategories,
  });
};

export const useProductsByCategory = (slug) => {
  return useQuery({
    queryKey: ["productsByCategory", slug],
    queryFn: () => getProductsByCategory(slug),
    enabled: !!slug,
  });
};

export const useAboutCompanyData = () => {
  return useQuery({
    queryKey: ["aboutCompanyData"],
    queryFn: getAboutCompanyData,
  });
};

export const useWhyChooseUsData = () => {
  return useQuery({
    queryKey: ["whyChooseUsData"],
    queryFn: getWhyChooseUsData,
  });
};

export const useAboutPageData = () => {
  return useQuery({
    queryKey: ["aboutPageData"],
    queryFn: getAboutPageData,
  });
};

export const useBlogsData = () => {
  return useQuery({
    queryKey: ["blogsData"],
    queryFn: getBlogsData,
  });
};

export const useProductDetails = (slug) => {
  return useQuery({
    queryKey: ["productDetails", slug],
    queryFn: () => getProductDetails(slug),
    enabled: !!slug,
  });
};

export const useCertificatesData = () => {
  return useQuery({
    queryKey: ["certificatesData"],
    queryFn: getCertificatesData,
  });
};

export const useOurClientsData = () => {
  return useQuery({
    queryKey: ["ourClientsData"],
    queryFn: getOurClientsData,
  });
};

export const useProductStrengthData = () => {
  return useQuery({
    queryKey: ["productStrengthData"],
    queryFn: getProductStrengthData,
  });
};

export const useWelcomeVideoData = () => {
  return useQuery({
    queryKey: ["welcomeVideoData"],
    queryFn: getWelcomeVideoData,
  });
};

export const useBannerData = () => {
  return useQuery({
    queryKey: ["bannerData"],
    queryFn: getBannerData,
  });
};

export const useBannerByPage = (pageKey) => {
  return useQuery({
    queryKey: ["bannerByPage", pageKey],
    queryFn: () => getBannerByPage(pageKey),
    enabled: !!pageKey,
  });
};

export const useContactUs = (pageKey) => {
  return useQuery({
    queryKey: ["contactUs", pageKey],
    queryFn: () => getContactUs(pageKey),
    enabled: !!pageKey,
  });
};

// --- Mutations ---

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: submitContactForm,
  });
};

export const useSubmitSupplier = () => {
  return useMutation({
    mutationFn: submitSupplier,
  });
};
