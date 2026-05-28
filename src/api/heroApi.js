// Use proxy in development, full URL in production
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment
  ? "/api"
  : "https://admin.nexaportsglobal.com/api";
export const IMAGE_BASE_URL = "https://admin.nexaportsglobal.com";

export const getHeroData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getherodata`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      // Map the API response to the component format
      const heroData = {
        main_title: result.data.main_title || "",
        description: result.data.description || "",
        images: result.data.images
          ? result.data.images.map((image) => `${IMAGE_BASE_URL}/${image}`)
          : [],
        small_title: result.data.small_title,
        sub_title: result.data.sub_title,
        button_text: result.data.button_text,
        button_link: result.data.button_link,
      };

      return heroData;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching hero data:", error);
    throw error;
  }
};

export const getTestimonialsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;
      return {
        title: data.title || "What Our Clients Say!",
        cards: data.cards
          ? data.cards.map((card, index) => ({
              id: index + 1,
              name: card.heading || "",
              role: "", // API doesn't provide role
              image: card.image_url
                ? card.image_url.startsWith("http")
                  ? card.image_url
                  : `${IMAGE_BASE_URL}/${card.image_url}`
                : "",
              testimonial: card.description || "",
              rating: 5, // API doesn't provide rating, default to 5
            }))
          : [],
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    throw error;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/grocery_categories`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      return result.data.map((category) => ({
        id: category.id,
        name: category.category_name,
        slug: category.slug,
        image: category.category_image
          ? category.category_image.startsWith("http")
            ? category.category_image
            : `${IMAGE_BASE_URL}/${category.category_image}`
          : "", // Fallback or placeholder logic could be added in component
        heroBackgroundImage: category.background_image
          ? category.background_image.startsWith("http")
            ? category.background_image
            : `${IMAGE_BASE_URL}/${category.background_image}`
          : "",
        description: category.description || "",
        heading: category.heading || "",
      }));
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching product categories:", error);
    throw error;
  }
};

export const getProductsByCategory = async (slug) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/productsdata/category/${slug}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Handling different response structures based on user info
    // Case 1: result.data is an array of products
    if (result.status && Array.isArray(result.data)) {
      return result.data.map((product) => ({
        id: product.id,
        name: product.title || product.product_name || product.name,
        slug: product.slug,
        image: product.image_url
          ? product.image_url.startsWith("http")
            ? product.image_url
            : `${IMAGE_BASE_URL}/${product.image_url}`
          : product.background_image_url
            ? product.background_image_url.startsWith("http")
              ? product.background_image_url
              : `${IMAGE_BASE_URL}/${product.background_image_url}`
            : "",
        description: product.description || "",
      }));
    }

    // If status is false (e.g. category not found), return empty array
    if (result.status === false) {
      return [];
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error(`Error fetching products for category ${slug}:`, error);
    // Return empty array on error to prevent UI crash
    return [];
  }
};

export const getAboutCompanyData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/about_our_company`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "success" && result.data) {
      // Map the API response to the component format
      const aboutData = {
        heading: result.data.heading || "",
        description: result.data.description || "",
        icon_url: result.data.icon_url || null,
        icon_class: result.data.icon_class || null,
      };

      return aboutData;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching about company data:", error);
    throw error;
  }
};

export const getWhyChooseUsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getwhychooseusCards`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      // Map the API response to the component format
      const whyChooseUsData = {
        heading: result.data.heading || "Why Choose Us?",
        cards: result.data.cards
          ? result.data.cards.map((card, index) => ({
              id: index + 1,
              number: `0${index + 1}`,
              title: card.title || "",
              description: card.description || "",
              icon: card.icon
                ? card.icon.startsWith("http")
                  ? card.icon
                  : `${IMAGE_BASE_URL}/${card.icon}`
                : "",
              position: index % 2 === 0 ? "left" : "right",
            }))
          : [],
      };

      return whyChooseUsData;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching Why Choose Us data:", error);
    throw error;
  }
};

export const getAboutPageData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/about-us`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;

      const aboutData = {
        about: {
          heading: data.about_heading || "",
          description: data.about_cards?.[0]?.description || "",
          image: data.about_cards?.[0]?.image_url
            ? data.about_cards[0].image_url.startsWith("http")
              ? data.about_cards[0].image_url
              : `${IMAGE_BASE_URL}/${data.about_cards[0].image_url}`
            : "",
        },
        vision_cards: data.vision_cards || [],
        values: {
          heading: data.values_heading || "Values",
          image: data.values_image_url || "",
          cards: data.values_cards
            ? data.values_cards.map((card) => ({
                title: card.value_heading,
                description: card.value_description,
                image: card.value_image_url
                  ? card.value_image_url.startsWith("http")
                    ? card.value_image_url
                    : `${IMAGE_BASE_URL}/${card.value_image_url}`
                  : "",
              }))
            : [],
        },
        questions: data.questions
          ? data.questions.map((q) => ({
              heading: q.question_heading,
              description: q.question_description,
              image: q.question_image_url
                ? q.question_image_url.startsWith("http")
                  ? q.question_image_url
                  : `${IMAGE_BASE_URL}/${q.question_image_url}`
                : "",
            }))
          : [],
      };

      return aboutData;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    throw error;
  }
};

export const getBlogsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blogsdata`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "success" && result.data) {
      return result.data.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.heading,
        date: post.date,
        author: post.author || "Omkara Team",
        readTime: "5 min read", // Default or calculate
        image: post.icon
          ? post.icon.startsWith("http")
            ? post.icon
            : `${IMAGE_BASE_URL}/uploads/blogs/${post.icon}`
          : "",
        content: [], // API doesn't seem to have separate intro content, or we could use the first section
        sections: post.sections
          ? post.sections.map((sec) => ({
              title: sec.heading || sec.title || sec.section_heading,
              image: sec.image
                ? sec.image.startsWith("http")
                  ? sec.image
                  : `${IMAGE_BASE_URL}/uploads/blogs/${sec.image}`
                : sec.image_url
                  ? sec.image_url
                  : null,
              htmlContent: sec.description || "",
            }))
          : [],
        description:
          post.sections && post.sections.length > 0
            ? post.sections[0].description
            : "",
        tag: "BLOG",
        readMore: "Read More",
      }));
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching blogs data:", error);
    throw error;
  }
};

export const getProductDetails = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productsdata/${slug}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;

      const normalize = (str) =>
        str ? str.toLowerCase().trim().replace(/s$/, "") : "";

      const getIngredientVal = (name) => {
        const target = normalize(name);

        if (data.ingredients && data.ingredients.name) {
          const idx = data.ingredients.name.findIndex(
            (item) => normalize(item) === target,
          );
          if (
            idx !== -1 &&
            data.ingredients.qty &&
            data.ingredients.qty[idx] != null
          ) {
            return [data.ingredients.qty[idx]];
          }
        }
        if (data.specifications && data.specifications.key) {
          const idx = data.specifications.key.findIndex(
            (item) => normalize(item) === target,
          );
          if (
            idx !== -1 &&
            data.specifications.value &&
            data.specifications.value[idx] != null
          ) {
            return [data.specifications.value[idx]];
          }
        }
        return [];
      };

      const hasIngredients =
        (data.ingredients &&
          data.ingredients.name &&
          data.ingredients.name.length > 0) ||
        (data.specifications &&
          data.specifications.key &&
          data.specifications.key.some((k) =>
            ["nutrient", "mineral", "vitamin", "protein", "fat"].includes(
              normalize(k),
            ),
          ));

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        categoryName: data.category_name,
        description: data.description || "",
        marketDemand: data.market_demand ? [data.market_demand] : [],
        specificationRows:
          data.specifications &&
          data.specifications.key &&
          data.specifications.value
            ? data.specifications.key.map((key, index) => ({
                label: key,
                value: data.specifications.value[index] || "",
              }))
            : [],
        ingredients: hasIngredients
          ? {
              nutrients: getIngredientVal("Nutrients"),
              minerals: getIngredientVal("Minerals"),
              vitamin: getIngredientVal("Vitamin"),
              protein: getIngredientVal("Protein"),
              fats: getIngredientVal("Fats"),
            }
          : null,
        usesAndBenefits: data.uses_benefits
          ? {
              bullets: data.uses_benefits
                .split("\r\n")
                .map((line) => line.replace(/•\t/g, "").trim())
                .filter((line) => line),
            }
          : null,
        // Map import/export information (may be string or object) into a normalized field
        exportInfo: data.import_export_info
          ? typeof data.import_export_info === "string"
            ? data.import_export_info.trim()
            : data.import_export_info
          : null,
        otherSections: data.other_section
          ? JSON.parse(data.other_section).map((section) => ({
              title: section.title,
              description: section.description,
              image: section.image
                ? section.image.startsWith("http")
                  ? section.image
                  : `${IMAGE_BASE_URL}/uploads/products/${section.image}`
                : null,
            }))
          : [],
        image: data.image_url
          ? data.image_url.startsWith("http")
            ? data.image_url
            : `${IMAGE_BASE_URL}/${data.image_url}`
          : "",
        backgroundImage: data.background_image_url
          ? data.background_image_url.startsWith("http")
            ? data.background_image_url
            : `${IMAGE_BASE_URL}/${data.background_image_url}`
          : "",
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error(`Error fetching product details for ${slug}:`, error);
    throw error;
  }
};

export const getCertificatesData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getcertificates`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;
      return {
        heading: data.heading || "Certifications",
        description: data.description || "",
        heroImage: data.icon
          ? data.icon.startsWith("http")
            ? data.icon
            : `${IMAGE_BASE_URL}/${data.icon}` // Fallback if icon is relative
          : "",
        items: data.items
          ? data.items.map((item, index) => ({
              id: index,
              title: item.title,
              // User sample has full URL in file_url
              url: item.file_url || "",
              fileType: item.file
                ? item.file.split(".").pop().toLowerCase()
                : "",
            }))
          : [],
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching certificates data:", error);
    throw error;
  }
};

export const getOurClientsData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/our-clients`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;
      return {
        heading: data.heading || "Our Clients",
        clients: data.cards
          ? data.cards.map((card) => ({
              id: card.id,
              image: card.icon
                ? card.icon.startsWith("http")
                  ? card.icon
                  : `${IMAGE_BASE_URL}/${card.icon}`
                : "",
              name: card.title || "",
            }))
          : [],
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching Our Clients data:", error);
    throw error;
  }
};

export const getProductStrengthData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/product_strength`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;
      return {
        heading: data.heading || "Why the Indian market is Best?",
        cards: data.cards
          ? data.cards.map((card, index) => ({
              id: index + 1,
              title: card.heading || "",
              description: card.description || "",
              image: card.image_url
                ? card.image_url.startsWith("http")
                  ? card.image_url
                  : `${IMAGE_BASE_URL}/${card.image_url}`
                : null,
            }))
          : [],
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching product strength data:", error);
    throw error;
  }
};

export const getWelcomeVideoData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && result.data) {
      const data = result.data;
      return {
        heading: data.heading || "Welcome To Covenant Peniel Exim",
        links: data.links || [],
      };
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching welcome video data:", error);
    throw error;
  }
};

export const getBannerData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getbanner`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && Array.isArray(result.data)) {
      // Convert array to object keyed by page_key for easier access
      const bannerMap = result.data.reduce((acc, banner) => {
        acc[banner.page_key] = {
          title: banner.title,
          subtitle: banner.subtitle,
          image: banner.banner_image
            ? banner.banner_image.startsWith("http")
              ? banner.banner_image
              : `${IMAGE_BASE_URL}/uploads/cms/${banner.banner_image}`
            : "",
        };
        return acc;
      }, {});
      return bannerMap;
    }

    throw new Error("Invalid API response format");
  } catch (error) {
    console.error("Error fetching banner data:", error);
    // Return empty object instead of throwing to prevent page crash
    return {};
  }
};

export const getBannerByPage = async (pageKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getbanner/${pageKey}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status && Array.isArray(result.data) && result.data.length > 0) {
      const banner = result.data[0];
      return {
        title: banner.title,
        subtitle: banner.subtitle,
        image: banner.banner_image
          ? banner.banner_image.startsWith("http")
            ? banner.banner_image
            : `${IMAGE_BASE_URL}/uploads/cms/${banner.banner_image}`
          : "",
      };
    }

    return null;
  } catch (error) {
    console.error(`Error fetching banner for ${pageKey}:`, error);
    return null;
  }
};

export const getContactUs = async (pageKey) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${pageKey}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
  } catch (error) {
    console.error(`Error fetching banner for ${pageKey}:`, error);
    return null;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const submitSupplier = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting supplier form:", error);
    throw error;
  }
};
