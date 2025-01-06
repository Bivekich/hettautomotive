import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductCategories } from "../services/api";

export default function ProductionMore() {
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

  const handleCategoryClick = (category) => {
    const categorySlug = category?.slug;
    console.log("Full category object:", category);

    if (!categorySlug) {
      console.error("No slug found for category:", category);
      return;
    }

    const url = `/catalog/${categorySlug}`;
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
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 w-full max-md:max-w-full border-r border-zinc-400"
      >
        {categories.slice(0, 8).map((category, index) => {
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
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleCategoryClick(category)}
              className={`flex flex-col grow shrink-0 items-center px-7 py-8 w-full bg-white hover:z-10 
                border-t border-l border-zinc-400
                ${
                  index >= categories.length - (categories.length % 4 || 4)
                    ? "border-b"
                    : ""
                }
                lg:last:border-b lg:[&:nth-child(4n)]:border-r
                sm:last:border-b sm:[&:nth-child(2n)]:border-r sm:[&:nth-last-child(-n+2)]:border-b
                last:border-b last:border-r [&:nth-last-child(-n+1)]:border-b
                hover:border hover:border-zinc-400 cursor-pointer`}
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
