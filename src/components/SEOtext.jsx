import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="flex overflow-hidden flex-col pt-24 pl-80 text-black pr-[600px] max-md:px-5">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold leading-none max-md:max-w-full max-md:text-4xl"
      >
        Заголовок SEO текста
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 text-[22px] leading-8 max-md:mt-10 max-md:max-w-full"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Hett Automotive стремится предоставлять своим клиентам качественные
          автозапчасти по доступным ценам. Компания постоянно работает над
          улучшением своей продукции и расширением ассортимента, чтобы
          удовлетворить потребности автовладельцев.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          Одним из главных преимуществ Hett Automotive является её надёжность.
          Клиенты могут быть уверены в том, что они получат качественные
          автозапчасти, которые прослужат им долгое время.
        </motion.p>
      </motion.div>
    </section>
  );
}
