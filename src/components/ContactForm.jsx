import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col px-80 py-20 max-md:px-5">
      <h1 className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl">
        Обратная связь
      </h1>

      <div className="flex flex-col mt-16 w-full text-2xl leading-snug max-md:mt-10">
        <p className="text-neutral-900">
          По вопросам использования и распространения нашей продукции,
          сотрудничества
        </p>
        <a
          href="mailto:parthers@hettautomotive.ru"
          className="mt-5 text-hett-1 hover:text-green-700 transition-colors"
        >
          parthers@hettautomotive.ru
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
            className="flex-1 px-8 py-4 border border-zinc-400 min-h-[56px] min-w-[240px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 px-8 py-4 border border-zinc-400 min-h-[56px] min-w-[240px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1"
          />
        </div>

        <textarea
          name="question"
          placeholder="Ваш вопрос"
          value={formData.question}
          onChange={handleChange}
          className="px-8 pt-8 pb-16 mt-10 w-full text-2xl border border-zinc-400 min-h-[112px] max-md:px-5 focus:outline-none focus:ring-1 focus:ring-hett-1"
        />

        <button
          type="submit"
          className="flex gap-2 items-center self-start px-8 py-4 mt-10 bg-hett-1 min-h-[60px] max-md:px-5 hover:bg-green-700 transition-colors"
        >
          <span className="text-lg font-semibold text-white">Отправить</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
            alt="Submit arrow"
            className="w-3.5 aspect-[1.25] object-contain transition-transform"
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
