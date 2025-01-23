import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import { useState, useEffect } from "react";
import { getGeographyData } from "../services/api";
import arrow from "../assets/arrow.svg";

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

  const slides = geographyData?.slides || [];
  const hasMultipleSlides = slides.length > 1;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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

  if (!geographyData || slides.length === 0) return null;

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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full lg:w-1/2 h-[400px] lg:h-[680px]"
          >
            <div className="absolute inset-0 bg-hett-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <img
                    loading="lazy"
                    src={`${import.meta.env.VITE_STRAPI_API_URL}${
                      slides[currentSlide]?.map?.url
                    }`}
                    alt={`География поставок Hett Automotive ${
                      hasMultipleSlides ? `(карта ${currentSlide + 1})` : ""
                    }`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col w-full lg:w-1/2 h-[400px] lg:h-[680px]"
          >
            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-32">
              {/* Animated Content */}
              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col"
                  >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                      {slides[currentSlide]?.title || "География поставок"}
                    </h1>

                    <p className="mt-8 sm:mt-12 lg:mt-16 text-lg sm:text-xl lg:text-[22px] leading-snug sm:leading-relaxed lg:leading-8 text-black">
                      {slides[currentSlide]?.description || ""}
                    </p>

                    {/* Geography Button - Only show if both buttonText and buttonLink exist */}
                    {slides[currentSlide]?.buttonText &&
                      slides[currentSlide]?.buttonLink && (
                        <a
                          href={slides[currentSlide].buttonLink}
                          className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-8 sm:mt-12 lg:mt-16 bg-hett-1 hover:bg-green-600 transition-all min-h-[50px] sm:min-h-[60px]"
                        >
                          <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
                            {slides[currentSlide].buttonText}
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
                      )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls - Fixed at bottom */}
              {hasMultipleSlides && (
                <div className="flex items-center gap-4 mt-8">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-[82px] h-[55px] bg-white hover:bg-gray-100 transition-colors"
                    aria-label="Previous slide"
                  >
                    <img
                      src={arrow}
                      alt="Previous"
                      className="w-6 h-6 transform rotate-180"
                    />
                  </button>

                  <div className="flex items-center text-neutral-400 text-[24px] font-bold">
                    {String(currentSlide + 1).padStart(2, "0")}/
                    {String(slides.length).padStart(2, "0")}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-[82px] h-[55px] bg-white hover:bg-gray-100 transition-colors"
                    aria-label="Next slide"
                  >
                    <img src={arrow} alt="Next" className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
