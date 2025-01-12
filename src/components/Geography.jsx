import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { useState, useEffect } from "react";
import { getGeographyData } from "../services/api";

export default function Geography() {
  const [geographyData, setGeographyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchGeographyData = async () => {
      try {
        const data = await getGeographyData();
        if (data.data) {
          setGeographyData(data.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching geography data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchGeographyData();
  }, []);

  const images = geographyData?.maps || [];
  const hasMultipleImages = images.length > 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-red-50 text-red-600">
        <p>Error loading geography data: {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-50">
        <p>Loading geography data...</p>
      </div>
    );
  }

  if (!geographyData || images.length === 0) return null;

  return (
    <div className="relative overflow-x-hidden mt-10">
      <div className="absolute inset-0 bg-hett-2" />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between relative"
        >
          {/* Map Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col w-full lg:w-1/2 min-h-[400px] lg:min-h-[680px]"
          >
            <div className="relative flex flex-col justify-center items-center h-full px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-40 bg-hett-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full"
                >
                  <img
                    loading="lazy"
                    src={`${import.meta.env.VITE_STRAPI_API_URL}${
                      images[currentSlide]?.url
                    }`}
                    alt={
                      images[currentSlide]?.alternativeText ||
                      `География поставок Hett Automotive ${
                        hasMultipleImages ? `(карта ${currentSlide + 1})` : ""
                      }`
                    }
                    className="object-contain w-full max-w-[749px] aspect-[2]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons - Only show if there are multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-12 h-12 bg-white/30 hover:bg-white/50 transition-colors rounded-full"
                    aria-label="Previous slide"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transform rotate-180"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-12 h-12 bg-white/30 hover:bg-white/50 transition-colors rounded-full"
                    aria-label="Next slide"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* Slide Indicators - Only show if there are multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-32"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                {geographyData?.title || "География поставок"}
              </h1>

              <p className="mt-8 sm:mt-12 lg:mt-16 text-lg sm:text-xl lg:text-2xl leading-snug sm:leading-relaxed lg:leading-8 text-black">
                {geographyData?.description || ""}
              </p>

              {/* Geography Button */}
              <a
                href={geographyData?.Link || "#"}
                className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-8 sm:mt-12 lg:mt-16 bg-hett-1 hover:bg-green-600 transition-all min-h-[50px] sm:min-h-[60px]"
              >
                <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
                  {geographyData?.buttonText || "География"}
                </span>
                <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
                    alt="Стрелка"
                    className="object-contain self-stretch my-auto w-3.5 aspect-[1.25]"
                  />
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
