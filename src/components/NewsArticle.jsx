import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "./Container";
import { getArticle, API_URL } from "../services/api";
import SEO from "./SEO";

export default function NewsArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticle(slug);
        setArticle(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) return null;
  if (error) return null;
  if (!article) return null;

  // Prepare SEO data
  const seoData = article.seo || {
    metaTitle: article.title,
    metaDescription: article.description,
    metaImage: article.image,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      image: [`${API_URL}${article.image.url}`],
      datePublished: article.date,
      articleBody: article.content.replace(/<[^>]*>/g, ""),
    },
  };

  return (
    <Container>
      <SEO {...seoData} />
      <article className="flex flex-col px-80 py-24 max-md:px-5">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-neutral-900"
        >
          {article.title}
        </motion.h1>

        <motion.time
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-neutral-600"
        >
          {new Date(article.date).toLocaleDateString("ru-RU")}
        </motion.time>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src={`${API_URL}${article.image.url}`}
          alt=""
          className="mt-8 w-full h-[500px] object-cover"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-xl leading-relaxed text-neutral-900"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </Container>
  );
}
