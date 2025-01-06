import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import PropTypes from "prop-types";

const BOT_TOKEN = "7513881907:AAH_IymyRIz68huTLhdvBdxcq4ZLUOdhPW4";
const CHAT_ID = "-4696602082";

const ContactForm = ({ formTitle, formDescription, formEmail }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: formEmail,
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    const message = `
📬 Новая заявка с сайта:

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
💬 Сообщение: ${formData.message}
    `.trim();

    try {
      await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      });

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: "", phone: "", email: formEmail, message: "" });

      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus({
        loading: false,
        success: false,
        error:
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
      });
    }
  };

  return (
    <div className="flex flex-col px-80 py-20 max-md:px-5">
      <h1 className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl">
        {formTitle}
      </h1>

      <div className="flex flex-col mt-16 w-full text-2xl leading-snug max-md:mt-10">
        <p className="text-neutral-900">{formDescription}</p>
        <a
          href={`mailto:${formEmail}`}
          className="mt-5 text-hett-1 hover:text-green-700 transition-colors"
        >
          {formEmail}
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-16 w-full max-md:mt-10"
      >
        <div className="flex flex-wrap gap-10 items-start w-full text-2xl">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status.loading}
            className="flex-1 px-8 py-4 border border-zinc-400 min-h-[56px] min-w-[240px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1 disabled:bg-gray-100"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={status.loading}
            className="flex-1 px-8 py-4 border border-zinc-400 min-h-[56px] min-w-[240px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1 disabled:bg-gray-100"
          />
        </div>

        <textarea
          name="message"
          placeholder="Ваш вопрос"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status.loading}
          className="px-8 pt-8 pb-16 mt-10 w-full text-2xl border border-zinc-400 min-h-[112px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1 disabled:bg-gray-100"
        />

        <div className="relative mt-10">
          <button
            type="submit"
            disabled={status.loading}
            className="flex gap-2 items-center self-start px-8 py-4 bg-hett-1 min-h-[60px] max-md:px-5 hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            <span className="text-lg font-semibold text-white">
              {status.loading ? "Отправка..." : "Отправить"}
            </span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
              alt="Submit arrow"
              className="w-3.5 aspect-[1.25] object-contain transition-transform"
            />
          </button>

          <AnimatePresence>
            {status.success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 mt-4 text-green-600"
              >
                Сообщение успешно отправлено!
              </motion.div>
            )}
            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 mt-4 text-red-600"
              >
                {status.error}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formDescription: PropTypes.string.isRequired,
  formEmail: PropTypes.string.isRequired,
};

export default ContactForm;
