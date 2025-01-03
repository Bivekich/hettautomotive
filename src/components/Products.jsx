import { motion } from "framer-motion";
import Container from "./Container";

const PRODUCTS = [
  {
    id: 1,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0f92659a1087e1337df874ca65419068d1e6d45fed080b7c3271ba4a4896b710",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fdc797e2de3f495396bdc805c31e0f6a4428ed050a0cb2802c8e8f274abbb2e0",
    imagePosition: "right",
    hasGrayBackground: true,
  },
  {
    id: 3,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    imagePosition: "left",
    hasGrayBackground: true,
  },
];

function ProductSection({
  title,
  description,
  buttonText,
  image,
  imagePosition,
  hasGrayBackground,
}) {
  const ImageComponent = () => (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex flex-col w-full lg:w-[48%] overflow-hidden ${
        imagePosition === "right" ? "lg:order-2" : ""
      }`}
    >
      {image ? (
        <div
          className={`${
            hasGrayBackground
              ? "flex flex-col px-4 sm:px-6 md:px-9 pt-8 sm:pt-10 md:pt-12 pb-1 bg-gray-200"
              : ""
          }`}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            loading="lazy"
            srcSet={`${image}?width=100 100w, ${image}?width=200 200w, ${image}?width=400 400w, ${image}?width=800 800w, ${image}?width=1200 1200w, ${image}?width=1600 1600w, ${image}?width=2000 2000w`}
            alt={title}
            className="object-contain w-full aspect-[1.34]"
          />
        </div>
      ) : (
        <div className="flex shrink-0 bg-gray-200 h-[300px] sm:h-[400px] md:h-[460px]" />
      )}
    </motion.div>
  );

  const ContentComponent = () => (
    <motion.div
      initial={{ opacity: 0, x: imagePosition === "left" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`flex flex-col w-full lg:w-[48%] justify-center ${
        imagePosition === "right" ? "lg:order-1" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 sm:mt-10 lg:mt-16 text-lg sm:text-xl lg:text-2xl leading-snug sm:leading-relaxed lg:leading-8 text-black"
      >
        {description}
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-10 lg:mt-16 bg-hett-1 min-h-[50px] sm:min-h-[60px] hover:bg-green-600 transition-all"
      >
        <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
          {buttonText}
        </span>
        <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cc55b0d0a22cdc82a3bd703c2e87fc9e7d8a4cbc459481b35310d14f9f98978"
            alt="Arrow Icon"
            className="object-contain self-stretch my-auto w-3.5 aspect-[1.11]"
          />
        </div>
      </motion.button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-center mt-12 sm:mt-16 w-full"
    >
      <ImageComponent />
      <ContentComponent />
    </motion.div>
  );
}

export default function Products() {
  return (
    <section className="relative overflow-x-hidden">
      <Container>
        <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 py-12 sm:py-16 md:py-20 lg:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black"
          >
            Продукция
          </motion.h1>

          {PRODUCTS.map((product) => (
            <ProductSection key={product.id} {...product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
