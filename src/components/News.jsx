import { motion } from "framer-motion";

const NEWS_ITEMS = [
  {
    id: 1,
    title:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок",
    date: "11 Ноября 2024",
    isActive: true,
  },
  {
    id: 2,
    title:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок",
    date: "11 Ноября 2024",
  },
  {
    id: 3,
    title:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок",
    date: "11 Ноября 2024",
  },
  {
    id: 4,
    title:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок",
    date: "11 Ноября 2024",
  },
];

function NewsItem({ title, date, isActive }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col justify-center py-5 pl-8 w-full border-l-[5px] 
      ${isActive ? "border-hett-1" : "border-neutral-500"} 
      max-md:pl-5 max-md:max-w-full`}
    >
      <h3 className="text-xl leading-8 text-white max-md:max-w-full">
        {title}
      </h3>
      <time className="mt-4 text-base font-semibold leading-relaxed text-gray-400 max-md:max-w-full">
        {date}
      </time>
    </motion.div>
  );
}

export default function News() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="flex overflow-hidden flex-col px-80 py-24 bg-neutral-900 max-md:px-5">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold leading-none text-white max-md:max-w-full max-md:text-4xl"
      >
        Новости
      </motion.h1>

      <div className="flex flex-wrap gap-10 items-start mt-16 w-full max-md:mt-10 max-md:max-w-full">
        {/* Featured News */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col flex-1 shrink basis-0 min-h-[679px] min-w-[240px] max-md:max-w-full"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/02d56fc38dcb3cbef1bb75aa8ed05f7c86f4ebf25f52dbe82a17734f6cd6f862?width=300"
            alt="Featured News"
            className="object-contain flex-1 w-full aspect-[1.44] max-md:max-w-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-xl leading-8 text-white max-md:max-w-full"
          >
            Hett Automotive производит и поставляет на рынок России запчасти для
            автомобилей различных марок. Hett Automotive производит и поставляет
            на рынок России запчасти для автомобилей.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex gap-2 items-center self-start px-8 py-4 mt-10 bg-hett-1 hover:bg-green-600 transition-all min-h-[60px] max-md:px-5"
          >
            <span className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
              Читать подробнее
            </span>
            <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
                alt="Arrow Icon"
                className="object-contain self-stretch my-auto w-3.5"
              />
            </div>
          </motion.button>
        </motion.article>

        {/* News List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full"
        > 
          {NEWS_ITEMS.map((item, index) => (
            <div key={item.id} className={index > 0 ? "mt-8" : ""}>
              <NewsItem {...item} />
            </div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="gap-2.5 self-start py-2.5 mt-8 text-2xl font-semibold leading-relaxed text-white border-b-2 border-hett-1"
          >
            Все новости
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
