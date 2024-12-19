import { motion } from "framer-motion";

const PRODUCT_CATEGORIES = [
  {
    title: "Аккумуляторы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/702692b5314f849a5cfb7f54b83c70f940392e2b7e7f2bf0d074514d7df8cec2",
    imageClass: "object-contain aspect-[1.33] w-[88px]",
  },
  {
    title: "Кузовные элементы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8891ed0b659f8d4ecf5b1ac30dd9385314aaaa02d81aca2688e83b863e72f365",
    imageClass: "object-contain aspect-[1.01] w-[69px]",
  },
  {
    title: "Аккумуляторы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/702692b5314f849a5cfb7f54b83c70f940392e2b7e7f2bf0d074514d7df8cec2",
    imageClass: "object-contain aspect-[1.33] w-[88px]",
  },
  {
    title: "Автомобильные диски и шины",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7a2e3d344ebba6ad4aabb7fbbe70d19079e782df0473bcabf1cd57f293ecaf14",
    imageClass: "object-contain w-20 aspect-square",
  },
  {
    title: "Кузовные элементы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8891ed0b659f8d4ecf5b1ac30dd9385314aaaa02d81aca2688e83b863e72f365",
    imageClass: "object-contain aspect-[1.01] w-[69px]",
  },
  {
    title: "Автомобильные аксессуары",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c8c9ad53a3aa5d270f4610d32f9d0c2f9e6a52fc59a9c57cf4e4c94d0dc89622",
    imageClass: "object-contain aspect-[0.82] w-[72px]",
  },
  {
    title: "Запасные части для ходовой части",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/948aaf7d5761c8ce633c7d07b08d22b5ca388b373823fb09b37eba013e808996",
    imageClass: "object-contain w-20 aspect-square",
  },
  {
    title: "Автомобильные диски и шины",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7a2e3d344ebba6ad4aabb7fbbe70d19079e782df0473bcabf1cd57f293ecaf14",
    imageClass: "object-contain w-20 aspect-square",
  },
  {
    title: "Автомобильные аксессуары",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c8c9ad53a3aa5d270f4610d32f9d0c2f9e6a52fc59a9c57cf4e4c94d0dc89622",
    imageClass: "object-contain aspect-[0.82] w-[72px]",
  },
  {
    title: "Запасные части для ходовой части",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/948aaf7d5761c8ce633c7d07b08d22b5ca388b373823fb09b37eba013e808996",
    imageClass: "object-contain w-20 aspect-square",
  },
];

export default function ProductionMore() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex overflow-hidden flex-col px-80 pt-24 max-md:px-5 pb-2"
    >
      <motion.div
        variants={containerVariants}
        className="flex flex-wrap items-stretch w-full max-md:max-w-full border-r border-zinc-400"
      >
        {PRODUCT_CATEGORIES.map((category, index) => (
          <motion.div
            key={`${category.title}-${index}`}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`flex flex-col grow shrink-0 items-center px-7 py-8 w-1/5 min-w-[240px] max-md:px-5 bg-white hover:z-10 
              border-t border-l border-zinc-400
              hover:border hover:border-zinc-400
              ${index >= PRODUCT_CATEGORIES.length - 5 ? "border-b" : ""}`}
          >
            <div className="flex flex-col justify-center items-center h-[140px] w-full">
              <div className="flex flex-col justify-center items-center px-5 py-8 bg-white w-full h-full max-md:px-5">
                <img
                  loading="lazy"
                  src={category.image}
                  alt={category.title}
                  className={`object-contain ${category.imageClass}`}
                />
              </div>
            </div>
            <h2 className="mt-5 text-xl font-medium leading-6 text-center text-black pb-4">
              {category.title}
            </h2>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
