import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getAdvantageData } from "../services/api";

export default function CompanyIntro() {
  const [advantageData, setAdvantageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvantageData = async () => {
      try {
        const data = await getAdvantageData();
        console.log("Advantage data:", data);
        if (data.data) {
          setAdvantageData(data.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching advantage data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAdvantageData();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (!advantageData) return null;

  return (
    <section
      className="flex overflow-hidden flex-col pt-24 pb-10 pl-80 text-black pr-[650px]
      2xl:pl-80 2xl:pr-[650px]
      xl:pl-60 xl:pr-[450px]
      lg:pl-40 lg:pr-[250px]
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
        {advantageData?.title || "Преимущества"}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-2xl leading-8 
          xl:text-2xl xl:mt-16
          lg:text-xl lg:mt-12
          md:text-lg md:mt-10
          max-md:mt-8 max-md:text-base"
      >
        {advantageData?.description || ""}
      </motion.p>
    </section>
  );
}
