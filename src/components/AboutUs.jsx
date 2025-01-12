import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAboutData } from "../services/api";
import ReactMarkdown from "react-markdown";

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getAboutData();
        console.log("About data:", data);
        if (data.data && data.data.length > 0) {
          setAboutData(data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
        setError(err.message);
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
        className="mt-16 text-[22px] leading-8 
           xl:mt-16
           lg:mt-12
          md:mt-10
          max-md:mt-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-[22px] max-w-none"
        >
          <ReactMarkdown>{aboutData?.mainText || ""}</ReactMarkdown>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-md:mt-6 prose prose-[22px] max-w-none"
        >
          <ReactMarkdown>{aboutData?.additionalText || ""}</ReactMarkdown>
        </motion.div>
      </motion.div>
    </section>
  );
}
