import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "./Container";
import AboutBanner from "./AboutBanner";
import YandexMap from "./Map";
import { getSeoBySlug } from "../services/api";
import { usePageTitle } from "../hooks/usePageTitle";
import ReactMarkdown from "react-markdown";

export default function CustomPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        const response = await getSeoBySlug(slug);
        if (response.data?.[0]) {
          setPageData(response.data[0]);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPageData();
    }
  }, [slug]);

  usePageTitle(pageData?.title || "Loading...");

  if (isLoading) return null;
  if (error) return <div>Error: {error}</div>;
  if (!pageData) return <div>Page not found</div>;

  return (
    <>
      <AboutBanner page={slug} />
      <Container>
        <section className="flex overflow-hidden flex-col px-80 pt-24 pb-16 max-md:px-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl"
          >
            {pageData.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-[22px] leading-8 text-black max-md:mt-10 max-md:max-w-full"
          >
            {pageData.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-black prose-headings:text-black prose-strong:text-black prose-li:text-black"
              >
                <ReactMarkdown>{pageData.content}</ReactMarkdown>
              </motion.div>
            )}
          </motion.div>
        </section>
        <YandexMap />
      </Container>
    </>
  );
}
