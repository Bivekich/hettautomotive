import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
export default function ContactPage() {
  const contactDetails = [
    {
      value: "8-936-003-80-43",
      label: "Номер телефона",
    },
    {
      value: "info@protek-auto.ru",
      label: "Почта",
    },
    {
      value: "Москва, Походный проезд 4 стр1",
      label: "Адрес",
      hasMap: true,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex overflow-hidden flex-col px-80 pt-24 pb-10 max-md:px-5"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl"
      >
        Реквизиты Hett Automotive
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-16 text-2xl leading-8 text-black max-md:mt-10 max-md:max-w-full"
      >
        <p>ООО "ПРОТЕК"</p>
        <p>ОГРН 1225000146282</p>
        <p>ИНН 5007117840</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-10 items-start mt-16 w-full leading-tight max-md:mt-10 max-md:max-w-full"
      >
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px]"
          >
            <div className="text-2xl font-semibold text-gray-400">
              {detail.value}
            </div>
            <div className="flex gap-2.5 items-start mt-2.5">
              <div className="font-medium text-neutral-900">{detail.label}</div>
              {detail.hasMap && (
                <button className="font-bold text-hett-1 hover:text-green-700 transition-colors">
                  Показать на карте
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A6d38c6c66e895056c2d30cee5b28604470ed7b83e2df1c1c96b722edff797552&amp;source=constructor"
        width="100%"
        height="500"
        frameBorder="0"
        title="Hett Automotive Map"
        className="mt-20 w-full"
      />
    </motion.section>
  );
}
