import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "./Container";
import { getArticles, API_URL } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function NewsItem({ title, date, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      onClick={onClick}
      className={`flex flex-col justify-center py-5 pl-8 w-full border-l-[5px] cursor-pointer 
      ${isActive ? "border-hett-1" : "border-neutral-500"} 
      max-md:pl-5 max-md:max-w-full hover:border-hett-1 transition-colors`}
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
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(1, 5);
        if (data.data) {
          setArticles(data.data);
          setSelectedArticle(data.data[0]);
          setFeaturedArticle(data.data[0]);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setFeaturedArticle(article);
  };

  const handleReadMore = () => {
    navigate(`/news/${selectedArticle.slug}`);
  };

  if (isLoading) return null;
  if (error) return null;
  if (!articles.length) return null;

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
    <div className="relative">
      <div className="absolute inset-0 bg-neutral-900 z-[-1]" />

      <Container>
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
                src={`${API_URL}${selectedArticle.image.url}`}
                alt={selectedArticle.title}
                className="object-cover w-full h-[430px] max-md:max-w-full"
              />

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10 text-xl leading-8 text-white max-md:max-w-full"
              >
                {selectedArticle.description}
              </motion.p>

              <motion.button
                onClick={handleReadMore}
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

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full"
            >
              {articles.map((article, index) => (
                <div key={article.id} className={index > 0 ? "mt-8" : ""}>
                  <NewsItem
                    title={article.title}
                    date={new Date(article.date).toLocaleDateString("ru-RU")}
                    isActive={article.id === selectedArticle?.id}
                    onClick={() => handleArticleClick(article)}
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="gap-2.5 self-start py-2.5 mt-8 text-2xl font-semibold leading-relaxed text-white border-b-2 border-hett-1"
              >
                <Link to="/news">Все новости</Link>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </Container>
    </div>
  );
}
