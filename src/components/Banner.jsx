import React, { useState, useCallback } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const slides = [
    {
      number: "01",
      subtitle: "Почему выбирают нас",
      title: "Настоящие эксперты в области производства автозапчастей",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734",
      srcSet:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2be1a4a74d5229ad75f19f0ea23d354d2bf024fb8943ed5a9ae02ee33ae0e734?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=2000 2000w",
    },
    {
      number: "02",
      subtitle: "Наши преимущества",
      title: "Качество и надежность каждой детали",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5",
      srcSet:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bb46b8c6943b074b9a2bcbbc31ceadebdee33a57b7db2017ca7929bfacc97ce5?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=2000 2000w",
    },
    {
      number: "03",
      subtitle: "Инновации и развитие",
      title: "Современные технологии производства",
      backgroundImage:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548",
      srcSet:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/39f4e83d36b3558576962d2cf3e047d51c905da6fbbbd408455d197cbfa16548?placeholderIfAbsent=true&apiKey=fa4b243dc5ba4bd7bd0ba9fd4faf0bd2&width=2000 2000w",
    },
  ];

  return (
    <div className="flex items-center h-[650px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          onClick={() => handleSlideClick(index)}
          className={`
            flex relative flex-col cursor-pointer transition-all duration-500 h-full overflow-hidden
            ${
              activeSlide === index
                ? "flex-1 shrink self-stretch px-80 py-16 my-auto basis-0 min-w-[240px] max-md:px-5 max-md:max-w-full"
                : "w-40 flex-col justify-between self-stretch px-16 pt-16 my-auto text-zinc-300"
            }
          `}
        >
          <img
            loading="lazy"
            srcSet={slide.srcSet}
            src={slide.backgroundImage}
            alt={`Slide ${slide.number}`}
            className={`absolute inset-0 w-full h-full object-cover`}
          />

          {activeSlide !== index && (
            <div className="absolute inset-0 bg-black/50 hover:bg-black/30 transition-colors duration-300" />
          )}

          <div
            className={`relative z-10 ${
              activeSlide === index ? "max-w-[950px]" : ""
            }`}
          >
            <div
              className={`text-4xl font-bold ${
                activeSlide === index ? "text-neutral-100" : "text-zinc-300"
              }`}
            >
              {slide.number}
            </div>

            {activeSlide === index && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col mt-44 w-full max-md:mt-10 max-md:max-w-full"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold leading-none text-neutral-100 max-md:max-w-full"
                >
                  {slide.subtitle}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 text-5xl font-bold leading-[60px] text-neutral-100 max-md:max-w-full max-md:text-4xl max-md:leading-10"
                >
                  {slide.title}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex gap-2 items-center self-start px-8 py-4 mt-10 bg-hett-1 hover:bg-green-600 transition-colors"
                >
                  <div className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
                    Подробнее
                  </div>
                  <FaArrowRight className="text-white" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
