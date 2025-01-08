import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { useState, useEffect } from "react";
import { getContactData } from "../services/api";

export default function ContactPage() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getContactData();
        if (data.data) {
          setContactData(data.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching contact data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!contactData) return null;

  return (
    <>
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
          {contactData?.title || "Контакты"}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-2xl leading-8 text-black max-md:mt-10 max-md:max-w-full"
        >
          <p>{contactData?.companyName || ""}</p>
          <p>{contactData?.ogrn || ""}</p>
          <p>{contactData?.inn || ""}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-10 items-start mt-16 w-full leading-tight max-md:mt-10 max-md:max-w-full"
        >
          {contactData?.contactDetails?.map((detail, index) => (
            <motion.div
              key={detail.id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px]"
            >
              <div className="text-2xl font-semibold text-gray-400">
                {detail?.value || ""}
              </div>
              <div className="flex gap-2.5 items-start mt-2.5">
                <div className="font-medium text-neutral-900">
                  {detail?.label || ""}
                </div>
                {detail?.hasMap && detail?.buttonMapLink && (
                  <a
                    href={detail.buttonMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-hett-1 hover:text-green-700 transition-colors"
                  >
                    Показать на карте
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {contactData?.mapUrl && (
          <iframe
            src={contactData.mapUrl}
            width="100%"
            height="500"
            frameBorder="0"
            title="Hett Automotive Map"
            className="mt-20 w-full"
          />
        )}
      </motion.section>
      <ContactForm
        formTitle={contactData?.formTitle || "Связаться с нами"}
        formDescription={contactData?.formDescription || ""}
        formEmail={contactData?.formEmail || ""}
      />
    </>
  );
}
