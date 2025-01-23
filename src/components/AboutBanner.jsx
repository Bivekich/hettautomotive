import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getBannerByPage } from "../services/api";
import { API_URL } from "../services/api";

export default function AboutBanner({ page }) {
  const [bannerData, setBannerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true);
        const response = await getBannerByPage(page);
        console.log("Banner response:", response);
        setBannerData(response.data);
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, [page]);

  if (isLoading) {
    return <div className="min-h-[400px]"></div>;
  }

  const bannerUrl = bannerData?.banner?.url
    ? `${API_URL}${bannerData.banner.url}`
    : "/background_img.png";

  const srcSet = bannerData?.banner?.formats
    ? Object.entries(bannerData.banner.formats)
        .map(([, format]) => `${API_URL}${format.url} ${format.width}w`)
        .join(", ")
    : "";

  return (
    <section className="relative flex flex-col px-80 pt-60 pb-16 max-md:px-5 max-md:pt-24 min-h-[400px] max-w-[2200px] mx-auto">
      <img
        loading="lazy"
        src={bannerUrl}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, 2200px"
        alt={bannerData?.banner?.alternativeText || "About Banner Background"}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-[950px]"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-neutral-100"
        >
          {bannerData?.subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-5xl font-bold leading-none text-neutral-100 max-md:text-4xl"
        >
          {bannerData?.title}
        </motion.h1>
      </motion.div>
    </section>
  );
}

AboutBanner.propTypes = {
  page: PropTypes.string.isRequired,
};
