import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductCategories } from "../services/api";

export default function Production() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        console.log("Categories from backend:", response);

        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Unexpected API response structure:", response);
          setError("Invalid data structure received from API");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const handleCategoryClick = (category) => {
    if (!category?.slug) {
      console.error("No slug found for category:", category);
      return;
    }

    const url = `/catalog/${category.slug}`;
    console.log("Navigating to:", url);
    navigate(url);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!categories.length) return <div>No categories found</div>;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex overflow-hidden flex-col px-80 pt-24 max-md:px-5 pb-2"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl"
      >
        Продукция Hett Automotive
      </motion.h1>

      <motion.div
        variants={containerVariants}
        className="flex flex-wrap items-stretch mt-16 w-full max-md:mt-10 max-md:max-w-full"
      >
        {categories.slice(0, 4).map((category) => {
          const categoryName = category?.name;
          const categorySlug = category?.slug;
          const categoryImage = category?.image?.url
            ? `${import.meta.env.VITE_API_URL || "http://localhost:1337"}${
                category.image.url
              }`
            : null;

          console.log("Category data:", category); // For debugging

          if (!categoryName || !categorySlug) {
            console.warn("Category missing required fields:", category);
            return null;
          }

          return (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCategoryClick(category)}
              className="flex flex-col grow shrink-0 items-center px-7 py-8 w-1/5 min-w-[240px] max-md:px-5 border border-zinc-400 bg-white cursor-pointer"
            >
              <div className="flex flex-col justify-center items-center h-[140px] w-full">
                <div className="flex flex-col justify-center items-center px-5 py-8 bg-white w-full h-full max-md:px-5">
                  {categoryImage && (
                    <img
                      loading="lazy"
                      src={categoryImage}
                      alt={categoryName}
                      className="object-contain w-auto h-full"
                    />
                  )}
                </div>
              </div>
              <h2 className="mt-5 text-xl font-medium leading-6 text-center text-black pb-4">
                {categoryName}
              </h2>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
