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
        if (response.data) {
          setCategories(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    const url = `/catalog/${category.slug}`;
    navigate(url);
  };

  if (loading) return <div></div>;
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 w-full max-md:max-w-full"
      >
        {categories.slice(0, 10).map((category) => {
          const categoryName = category?.name;
          const categorySlug = category?.slug;
          console.log("Raw category:", category);
          console.log("Image data:", category?.image);

          const categoryImage = category?.image?.url
            ? `${import.meta.env.VITE_STRAPI_API_URL}${category.image.url}`
            : null;

          console.log(
            "VITE_STRAPI_API_URL:",
            import.meta.env.VITE_STRAPI_API_URL
          );
          console.log("Final image URL:", categoryImage);

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
              className="flex flex-col items-center px-7 py-8 bg-white border hover:z-10 cursor-pointer hover:border-zinc-400"
            >
              <div className="flex flex-col justify-center items-center h-[140px] w-full">
                <div className="flex flex-col justify-center items-center px-5 py-8 bg-white w-full h-full max-md:px-5">
                  {categoryImage && (
                    <>
                      <img
                        loading="lazy"
                        src={categoryImage}
                        alt={`Категория продукции: ${categoryName}`}
                        className="object-contain w-auto h-full"
                        onError={(e) => {
                          console.error("Image failed to load:", e);
                          console.log("Failed image URL:", e.target.src);
                        }}
                      />
                      <div style={{ display: "none" }}>{categoryImage}</div>
                    </>
                  )}
                </div>
              </div>
              <h2 className="mt-5 text-md font-medium leading-6 text-center text-black pb-4">
                {categoryName}
              </h2>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
