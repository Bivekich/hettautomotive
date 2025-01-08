import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAboutData } from "../services/api";

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutData();
        console.log("About data:", data);
        if (data.data && data.data.length > 0) {
          setAboutData(data.data[0]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (!aboutData) return null;

  return (
    <section
      className="flex overflow-hidden flex-col pt-24 pl-80 text-black pr-[600px] 
      2xl:pl-80 2xl:pr-[600px]
      xl:pl-60 xl:pr-[400px]
      lg:pl-40 lg:pr-[200px]
      md:pl-20 md:pr-20
      max-md:px-5 max-md:pt-16"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold leading-none 
          xl:text-5xl
          lg:text-4xl
          md:text-3xl
          max-md:text-2xl"
      >
        {aboutData?.title || "О компании"}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 text-2xl leading-8 
          xl:text-2xl xl:mt-16
          lg:text-xl lg:mt-12
          md:text-lg md:mt-10
          max-md:mt-8 max-md:text-base"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {aboutData?.mainText || ""}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-md:mt-6"
        >
          {aboutData?.additionalText || ""}
        </motion.p>
      </motion.div>
    </section>
  );
}
