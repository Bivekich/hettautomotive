import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <img
          src="/smallLogo.png"
          alt="Hett Automotive"
          className="w-24 h-24 object-contain rounded-xl"
        />
        <PulseLoader color="#16A34A" size={15} />
      </motion.div>
    </motion.div>
  );
}
