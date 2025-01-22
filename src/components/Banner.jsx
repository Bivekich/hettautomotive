import { useState, useCallback, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { getBanners } from "../services/api";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSlideClick = useCallback(
    (index) => {
      if (!isAnimating && index !== activeSlide) {
        setIsAnimating(true);
        setActiveSlide(index);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }
    },
    [isAnimating, activeSlide]
  );

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const data = await getBanners();
        console.log("Banner data:", data);
        const mappedSlides = data.data.map((item) => {
          const backgroundUrl = item.Background
            ? `${import.meta.env.VITE_STRAPI_API_URL}${item.Background.url}`
            : "/background_img.png";

          console.log("Background URL:", backgroundUrl);

          return {
            number: item.Number,
            subtitle: item.Subtitle,
            title: item.Title,
            link: item.Link || "/",
            backgroundImage: backgroundUrl,
            imageName: item.Background?.name || `Слайд ${item.Number}`,
            srcSet: item.Background?.formats
              ? Object.entries(item.Background.formats)
                  .map(
                    ([formatName, format]) =>
                      `${import.meta.env.VITE_STRAPI_API_URL}${format.url} ${
                        format.width
                      }w`
                  )
                  .join(", ")
              : "",
          };
        });

        console.log("Mapped slides:", mappedSlides);
        setSlides(mappedSlides);
      } catch (err) {
        console.error("Error fetching banner data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="max-w-[2200px] mx-auto">
      <div className="flex md:flex-row flex-col items-stretch md:items-center h-auto md:h-[610px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`
              flex relative flex-col cursor-pointer transition-all duration-500 overflow-hidden
              ${
                activeSlide === index
                  ? "flex-1 shrink self-stretch px-5 md:px-80 py-16 basis-0 min-h-[500px] md:min-h-0 min-w-0 md:min-w-[240px]"
                  : "h-20 md:h-auto md:w-40 flex-col justify-between self-stretch px-5 md:px-16 pt-5 md:pt-16 text-zinc-300"
              }
            `}
          >
            <img
              loading="lazy"
              srcSet={slide.srcSet}
              src={slide.backgroundImage}
              alt={slide.imageName}
              className={`absolute inset-0 w-full h-full object-cover`}
            />

            {activeSlide !== index && (
              <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors duration-300" />
            )}

            <div
              className={`relative z-10 ${
                activeSlide === index ? "max-w-[950px]" : ""
              } ${activeSlide === index && index > 0 ? "-ml-0 md:-ml-40" : ""}`}
            >
              <div
                className={`text-2xl md:text-4xl font-bold flex items-center justify-between ${
                  activeSlide === index ? "text-neutral-100" : "text-zinc-300"
                }`}
              >
                {slide.number}
                {activeSlide !== index && (
                  <span className="md:hidden ml-2 text-base md:text-lg">
                    {slide.subtitle}
                  </span>
                )}
              </div>

              {activeSlide === index && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col mt-8 md:mt-44 w-full max-md:mt-10"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-bold leading-none text-neutral-100"
                  >
                    {slide.subtitle}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 md:mt-10 text-3xl md:text-5xl font-bold leading-tight md:leading-[60px] text-neutral-100"
                  >
                    {slide.title}
                  </motion.div>
                  <motion.a
                    href={slide.link}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex gap-2 items-center self-start px-6 md:px-8 py-3 md:py-4 mt-6 md:mt-10 bg-hett-1 hover:bg-green-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="self-stretch my-auto text-base md:text-lg font-semibold leading-tight text-white">
                      Подробнее
                    </div>
                    <FaArrowRight className="text-white" />
                  </motion.a>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
