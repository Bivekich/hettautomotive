import { motion } from "framer-motion";

export default function CompanyIntro() {
  return (
    <section className="flex overflow-hidden flex-col pt-24 pb-10 pl-80 text-black pr-[650px] max-md:px-5">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold leading-none max-md:max-w-full max-md:text-4xl"
      >
        Hett Automotive
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-2xl leading-8 max-md:mt-10 max-md:max-w-full"
      >
        Одним из главных преимуществ Hett Automotive является её надёжность.
        Клиенты могут быть уверены в том, что они получат качественные
        автозапчасти, которые прослужат им долгое время.
      </motion.p>
    </section>
  );
}
