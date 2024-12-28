import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PRODUCT_CATEGORIES = [
  {
    title: "Аккумуляторы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3a25d9a058685eeb34ea3f188ab78c84ee3b3ee13bc51e9bad5a4b5d4958587d",
    imageClass: "aspect-[1.33] w-[88px]",
  },
  {
    title: "Кузовные элементы",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7811a4e105af5e39f3d5b65f37eddf68acfcf781c464d87983388aa03fb77fb5",
    imageClass: "aspect-[1.01] w-[69px]",
  },
  {
    title: "Автомобильные диски и шины",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7a2e3d344ebba6ad4aabb7fbbe70d19079e782df0473bcabf1cd57f293ecaf14",
    imageClass: "w-20 aspect-square",
  },
  {
    title: "Запасные части для ходовой части",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/948aaf7d5761c8ce633c7d07b08d22b5ca388b373823fb09b37eba013e808996",
    imageClass: "w-20 aspect-square",
  },
  {
    title: "Автомобильные аксессуары",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c8c9ad53a3aa5d270f4610d32f9d0c2f9e6a52fc59a9c57cf4e4c94d0dc89622",
    imageClass: "aspect-[0.82] w-[72px]",
  },
];

export default function Production() {
  const navigate = useNavigate();

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

  const handleCategoryClick = (category) => {
    navigate(`/catalog?category=${category}`);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex overflow-hidden flex-col px-80 pt-24 max-md:px-5 pb-2"
    >
      <motion.h1
        variants={itemVariants}
        className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl"
      >
        Продукция Hett Automotive
      </motion.h1>

      <motion.div
        variants={containerVariants}
        className="flex flex-wrap items-stretch mt-16 w-full max-md:mt-10 max-md:max-w-full"
      >
        {PRODUCT_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleCategoryClick(category.category)}
            className={`flex flex-col grow shrink-0 items-center px-7 py-8 w-1/5 min-w-[240px] max-md:px-5 border border-zinc-400 bg-white cursor-pointer`}
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
