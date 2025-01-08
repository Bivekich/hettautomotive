import { motion } from "framer-motion";

export default function NewsPage() {
  return (
    <section className="flex overflow-hidden flex-col px-80 py-24 max-md:px-5">
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl leading-8 text-black"
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-2xl leading-8 text-black"
        >
          Одним из главных преимуществ Hett Automotive является её надёжность.
          Клиенты могут быть уверены в том, что они получат качественные
          автозапчасти, которые прослужат им долгое время.
        </motion.p>
      </motion.div>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 max-md:mt-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold leading-none text-black max-md:text-4xl"
        >
          О производителе Hett Automotive
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 max-md:mt-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl leading-8 text-black"
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
            className="mt-8 text-2xl leading-8 text-black"
          >
            Одним из главных преимуществ Hett Automotive является её надёжность.
            Клиенты могут быть уверены в том, что они получат качественные
            автозапчасти, которые прослужат им долгое время.
          </motion.p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df0d77e28c22d02db7efc0423abfbca45cdcfbea56a05c5155c3489617329e4"
          alt="Новости Hett Automotive"
          className="object-cover mt-16 w-full aspect-[2.98] max-md:mt-10"
        />
      </motion.div>

      {/* Store Locations Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 max-md:mt-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold leading-none text-black"
        >
          Адреса магазинов
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-2xl leading-8 text-black max-md:mt-10"
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
      </motion.div>
    </section>
  );
}
