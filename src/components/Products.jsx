import { motion } from "framer-motion";
import Container from "./Container";
import { useState, useEffect } from "react";
import { getProductsData } from "../services/api";
import { FaArrowRight } from "react-icons/fa";

function ProductSection({ title, description, Link, image, index }) {
  // Alternate image position based on index
  const imagePosition = index % 2 === 0 ? "left" : "right";

  const ImageComponent = () => (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex flex-col w-full lg:w-[48%] overflow-hidden ${
        imagePosition === "right" ? "lg:order-2" : ""
      }`}
    >
      {image ? (
        <div className="flex flex-col justify-center items-center bg-gray-200 px-4 sm:px-6 md:px-9 pt-8 sm:pt-10 md:pt-12 pb-1">
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            loading="lazy"
            src={`${import.meta.env.VITE_STRAPI_API_URL}${image.url}`}
            alt={title}
            className="object-contain w-full aspect-[1.34]"
          />
        </div>
      ) : (
        <div className="flex shrink-0 bg-gray-200 h-[300px] sm:h-[400px] md:h-[460px]" />
      )}
    </motion.div>
  );

  const ContentComponent = () => (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex flex-col w-full lg:w-[48%] justify-center ${
        imagePosition === "right" ? "lg:order-1" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 sm:mt-10 lg:mt-16 text-lg sm:text-xl lg:text-2xl leading-snug sm:leading-relaxed lg:leading-8 text-black"
      >
        {description}
      </motion.p>
      <motion.a
        href={Link}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-10 lg:mt-16 bg-hett-1 min-h-[50px] sm:min-h-[60px] hover:bg-green-600 transition-all"
      >
        <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
          Где купить сувенирную продукцию
        </span>
        <FaArrowRight className="text-white" />
      </motion.a>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center mt-12 sm:mt-16 w-full"
    >
      <ImageComponent />
      <ContentComponent />
    </motion.div>
  );
}

export default function Products() {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const data = await getProductsData();
        console.log("Products data:", data);
        if (data.data) {
          setProductsData(data.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productsData.length) return <div>No products available</div>;

  return (
    <section className="relative overflow-x-hidden">
      <Container>
        <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 py-12 sm:py-16 md:py-20 lg:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black"
          >
            Продукция
          </motion.h1>

          {productsData.map((product, index) => (
            <ProductSection
              key={product.id}
              title={product.title}
              description={product.description}
              Link={product.Link}
              image={product.image}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
