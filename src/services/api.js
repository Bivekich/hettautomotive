import axios from "axios";

export const API_URL =
  import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const getBanners = async () => {
  const response = await fetch(`${API_URL}/api/banners?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch banner data");
  return response.json();
};

export const getAboutData = async () => {
  const response = await fetch(`${API_URL}/api/abouts`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch about data");
  return response.json();
};

export const getAdvantageData = async () => {
  const response = await fetch(`${API_URL}/api/advantage`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch advantage data");
  return response.json();
};

export const getGeographyData = async () => {
  const response = await fetch(`${API_URL}/api/geography?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch geography data");
  return response.json();
};

export const getProductsData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOnlineStores = async () => {
  const response = await fetch(`${API_URL}/api/online-stores?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch online stores data");
  return response.json();
};

export const getPhysicalStores = async () => {
  const response = await fetch(`${API_URL}/api/physical-stores?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch physical stores data");
  return response.json();
};

export const getContactData = async () => {
  const response = await fetch(`${API_URL}/api/contact?populate=*`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch contact data");
  return response.json();
};

export const getFooterData = async () => {
  const response = await fetch(`${API_URL}/api/footer`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch footer data");
  return response.json();
};

export const getArticles = async (page = 1, pageSize = 9) => {
  const response = await fetch(
    `${API_URL}/api/news-items?populate=*&sort=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch articles");
  return response.json();
};

export const getArticle = async (slug) => {
  const response = await fetch(
    `${API_URL}/api/news-items?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch article");
  const data = await response.json();
  return data.data[0];
};

export const getProductCategories = async () => {
  try {
    const response = await fetch(
      `${API_URL}/api/product-categories?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch product categories");
    }

    const data = await response.json();
    console.log("Raw category response:", JSON.stringify(data, null, 2));
    console.log("Category attributes sample:", data.data?.[0]?.attributes);
    return data;
  } catch (error) {
    console.error("Error in getProductCategories:", error);
    throw error;
  }
};

export const getProductCategory = async (slug) => {
  if (!slug) {
    console.error("No slug provided to getProductCategory");
    return null;
  }

  try {
    const response = await fetch(
      `${API_URL}/api/product-categories?filters[slug][$eq]=${slug}&populate=catalogProducts`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch product category");
    }

    const data = await response.json();
    console.log("Category API Response:", data);

    if (!data.data?.[0]) {
      console.error("No category found with slug:", slug);
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error("Error in getProductCategory:", error);
    throw error;
  }
};

export async function getCatalogProducts(filters = {}) {
  try {
    const queryParams = new URLSearchParams();

    // Add filters if provided
    if (filters.category) {
      queryParams.append("filters[category][slug][$eq]", filters.category);
    }
    if (filters.brand) {
      queryParams.append("filters[brand][id][$eq]", filters.brand);
    }
    if (filters.model) {
      queryParams.append("filters[model][id][$eq]", filters.model);
    }
    if (filters.modification) {
      queryParams.append(
        "filters[modification][id][$eq]",
        filters.modification
      );
    }

    // Add populate parameter for related data
    queryParams.append("populate[0]", "brand");
    queryParams.append("populate[1]", "model");
    queryParams.append("populate[2]", "modification");
    queryParams.append("populate[3]", "images");
    queryParams.append("populate[4]", "specifications");

    console.log(
      "Fetching catalog products with params:",
      queryParams.toString()
    );
    const response = await fetch(
      `${API_URL}/api/catalog-products?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Catalog products response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching catalog products:", error);
    throw error;
  }
}

// Get unique filter values for brand, model, and modification
export async function getFilterOptions() {
  try {
    const response = await fetch(
      `${API_URL}/api/catalog-products?fields[0]=brand&fields[1]=model&fields[2]=modification`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Extract unique values
    const brands = [
      ...new Set(data.data.map((product) => product.attributes.brand)),
    ];
    const models = [
      ...new Set(data.data.map((product) => product.attributes.model)),
    ];
    const modifications = [
      ...new Set(data.data.map((product) => product.attributes.modification)),
    ];

    return {
      brands,
      models,
      modifications,
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
}

export const getCatalogProduct = async (slug) => {
  const response = await fetch(
    `${API_URL}/api/catalog-products?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch catalog product");
  const data = await response.json();
  return data.data[0];
};

export const getProducts = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  queryParams.append("populate", "category");

  if (filters.category) {
    console.log("Adding category filter:", filters.category);
    queryParams.append("filters[category][slug][$eq]", filters.category);
  }

  try {
    const url = `${API_URL}/api/products?${queryParams}`;
    console.log("Fetching products from:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    console.log("Products API Response:", data);
    return data;
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
};

export const getProduct = async (slug) => {
  const response = await fetch(
    `${API_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch product");
  const data = await response.json();
  return data.data[0];
};

export const getBrands = async () => {
  try {
    const response = await fetch(`${API_URL}/api/brands?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

export const getModels = async (brandId) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("populate", "*");

    if (brandId) {
      queryParams.append("filters[brand][id][$eq]", brandId);
    }

    console.log("Fetching models with params:", queryParams.toString());
    const response = await fetch(`${API_URL}/api/models?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch models");
    }

    const data = await response.json();
    console.log("Models response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

export const getModifications = async (modelId) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("populate", "*");

    if (modelId) {
      queryParams.append("filters[model][id][$eq]", modelId);
    }

    console.log("Fetching modifications with params:", queryParams.toString());
    const response = await fetch(
      `${API_URL}/api/modifications?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error("Failed to fetch modifications");
    }

    const data = await response.json();
    console.log("Modifications response:", data);
    return data.data;
  } catch (error) {
    console.error("Error fetching modifications:", error);
    throw error;
  }
};

export const getBannerByPage = async (page) => {
  const response = await fetch(
    `${API_URL}/api/about-banners/page/${page}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  if (!response.ok) throw new Error(`Failed to fetch banner for page: ${page}`);
  return response.json();
};

export const getCategoriesData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_STRAPI_API_URL}/api/categories?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getModelsData = async (queryParams) => {
  try {
    const url = new URL(`${import.meta.env.VITE_STRAPI_API_URL}/api/models`);
    if (queryParams) {
      url.search = queryParams.toString();
    }
    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw error;
  }
};

export const getModificationsData = async (queryParams) => {
  try {
    const url = new URL(
      `${import.meta.env.VITE_STRAPI_API_URL}/api/modifications`
    );
    if (queryParams) {
      url.search = queryParams.toString();
    }
    const response = await axios.get(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching modifications:", error);
    throw error;
  }
};

// SEO endpoints
export const getSeoBySlug = async (slug) => {
  try {
    const response = await axios.get(`${API_URL}/api/seo/${slug}?populate=*`);
    return response;
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return { data: null };
  }
};

export const getContentTypeSeo = async (contentType, id) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/${contentType}/${id}?populate[seo][populate]=*`
    );
    return response;
  } catch (error) {
    console.error("Error fetching content type SEO:", error);
    return { data: null };
  }
};
