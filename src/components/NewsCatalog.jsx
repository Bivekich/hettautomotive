import { motion } from "framer-motion";
import Container from "./Container";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { getArticles, API_URL } from "../services/api";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NewsCard = ({ date, title, description, image, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={handleClick}
      className="w-full cursor-pointer hover:scale-[1.02] transition-transform"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-full text-sm font-semibold leading-relaxed text-neutral-900">
          <div className="flex relative flex-col items-start px-5 pt-48 pb-5 w-full aspect-[1.66] max-md:pt-24">
            <motion.img
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              loading="lazy"
              src={`${API_URL}${image.url}`}
              className="object-cover absolute inset-0 size-full"
            />
            <div className="relative gap-2.5 p-2.5 bg-white">
              {new Date(date).toLocaleDateString("ru-RU")}
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden flex-col mt-5 w-full">
          <div className="text-xl font-medium leading-6 text-green-600">
            {title}
          </div>
          <div className="mt-5 text-lg leading-6 text-neutral-900">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

NewsCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = useMemo(() => {
    const pageNumbers = [];

    // Logic to show ellipsis for many pages
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <div className="flex justify-center items-center gap-3 py-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-12 h-12 border ${
          currentPage === 1
            ? "border-zinc-200 bg-zinc-50 cursor-not-allowed"
            : "border-zinc-300 bg-white hover:border-green-600"
        }`}
      >
        <svg
          className={`w-5 h-5 ${
            currentPage === 1 ? "text-zinc-300" : "text-zinc-600"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </motion.button>

      {pages.map((page, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`flex items-center justify-center w-12 h-12 text-base transition-all duration-200 border ${
            page === currentPage
              ? "bg-green-600 text-white border-green-600"
              : page === "..."
              ? "cursor-default text-zinc-400 border-transparent"
              : "text-zinc-600 hover:text-green-600 border-zinc-300 hover:border-green-600"
          }`}
        >
          {page}
        </motion.button>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-12 h-12 border ${
          currentPage === totalPages
            ? "border-zinc-200 bg-zinc-50 cursor-not-allowed"
            : "border-zinc-300 bg-white hover:border-green-600"
        }`}
      >
        <svg
          className={`w-5 h-5 ${
            currentPage === totalPages ? "text-zinc-300" : "text-zinc-600"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default function NewsCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const newsRef = useRef(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(currentPage, itemsPerPage);
        if (data.data) {
          setArticles(data.data);
          setTotalArticles(data.meta.pagination.total);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (newsRef.current) {
      const yOffset = -100;
      const element = newsRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  if (isLoading) return null;
  if (error) return null;
  if (!articles.length) return null;

  const totalPages = Math.ceil(totalArticles / itemsPerPage);

  return (
    <Container>
      <div ref={newsRef} className="flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 pt-16">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              date={article.date}
              title={article.title}
              description={article.description}
              image={article.image}
              slug={article.slug}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Container>
  );
}
