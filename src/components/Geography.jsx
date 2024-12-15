import { motion } from "framer-motion";

export default function Geography() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-between"
    >
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col min-w-[240px] w-[939px] max-md:max-w-full min-h-[680px]"
      >
        <div className="flex flex-col justify-center items-end h-full px-20 py-40 bg-hett-1 max-md:px-5 max-md:py-24 max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/422d79e46e58dffed98ed7c2fa4fd865ff74548b01d1aad29e63c3117686e0f3"
            alt="Hett Automotive Geographic Map"
            className="object-contain mb-0 max-w-full aspect-[2] w-[749px] max-md:mb-2.5"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col flex-1 shrink justify-center py-32 pr-80 pl-10 bg-hett-2 basis-0 min-h-[680px] min-w-[240px]"
      >
        <div className="flex flex-col flex-1 justify-between w-full max-md:max-w-full">
          <div className="flex flex-col w-full max-md:max-w-full">
            <h1 className="text-4xl font-bold leading-none text-black max-md:max-w-full">
              География Hett Automotive
            </h1>

            <p className="mt-16 text-2xl leading-8 text-black max-md:mt-10 max-md:max-w-full">
              Одним из главных преимуществ Hett Automotive является её
              надёжность. Клиенты могут быть уверены в том, что они получат
              качественные автозапчасти, которые прослужат им долгое время.
            </p>

            {/* Geography Button */}
            <button className="flex gap-2 items-center self-start px-8 py-4 mt-16 bg-hett-1 hover:bg-green-600 transition-all min-h-[60px] max-md:px-5 max-md:mt-10">
              <span className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
                География
              </span>
              <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
                  alt="Arrow Icon"
                  className="object-contain self-stretch my-auto w-2.5 aspect-[1.25]"
                />
              </div>
            </button>
          </div>

          {/* Pagination */}
          <div className="mt-36 text-2xl font-bold leading-none text-neutral-400 max-md:mt-10 max-md:max-w-full">
            01/03
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
