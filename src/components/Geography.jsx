import { motion } from "framer-motion";
import Container from "./Container";

export default function Geography() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Full width background */}
      <div className="absolute inset-0 bg-hett-2" />

      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between relative"
        >
          {/* Map Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col w-full lg:w-1/2 min-h-[400px] lg:min-h-[680px]"
          >
            <div className="flex flex-col justify-center items-center h-full px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-40 bg-hett-1">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/422d79e46e58dffed98ed7c2fa4fd865ff74548b01d1aad29e63c3117686e0f3"
                alt="Hett Automotive Geographic Map"
                className="object-contain w-full max-w-[749px] aspect-[2]"
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center w-full lg:w-1/2 px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-24 lg:py-32"
          >
            <div className="flex flex-col w-full">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-black">
                География Hett Automotive
              </h1>

              <p className="mt-8 sm:mt-12 lg:mt-16 text-lg sm:text-xl lg:text-2xl leading-snug sm:leading-relaxed lg:leading-8 text-black">
                Одним из главных преимуществ Hett Automotive является её
                надёжность. Клиенты могут быть уверены в том, что они получат
                качественные автозапчасти, которые прослужат им долгое время.
              </p>

              {/* Geography Button */}
              <button className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-8 sm:mt-12 lg:mt-16 bg-hett-1 hover:bg-green-600 transition-all min-h-[50px] sm:min-h-[60px]">
                <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
                  География
                </span>
                <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
                    alt="Arrow Icon"
                    className="object-contain self-stretch my-auto w-3.5 aspect-[1.25]"
                  />
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
