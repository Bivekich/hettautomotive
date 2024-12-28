import { motion } from "framer-motion";
import Container from "./Container";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

const NEWS_ITEMS = [
  {
    id: 1,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  {
    id: 2,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  {
    id: 3,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  {
    id: 4,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  {
    id: 5,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  // ... add more news items
  {
    id: 6,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  {
    id: 7,
    date: "11 Ноября 2024",
    title: "Hett Automotive производит и поставляет запчасти на рынок России.",
    description:
      "Hett Automotive производит и поставляет на рынок России запчасти для автомобилей различных марок.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c4c1e167e328069a96500c39224244283e9feee4fc877350f73b454e9d8904f9",
  },
  // ... add more news items
  // ... add more news items
];

const NewsCard = ({ date, title, description, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
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
              src={image}
              className="object-cover absolute inset-0 size-full"
            />
            <div className="relative gap-2.5  p-2.5 bg-white">{date}</div>
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
    <div
      className="flex overflow-hidden flex-col px-80 pb-20 w-full 
      2xl:px-80 xl:px-60 lg:px-40 md:px-20 max-md:px-5"
    >
      <div className="flex flex-wrap gap-3 justify-center items-center w-full">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-12 h-12 mt-2 border border-solid
            ${
              currentPage === 1
                ? "border-zinc-200 cursor-not-allowed"
                : "border-zinc-300 hover:border-green-600"
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
            className={`flex items-center justify-center w-12 h-12 text-base transition-all duration-200
              ${
                page === currentPage
                  ? "bg-green-600 text-white"
                  : page === "..."
                  ? "cursor-default text-zinc-400"
                  : "text-zinc-600 hover:text-green-600"
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
          className={`flex items-center justify-center w-12 h-12 mt-2
            ${
              currentPage === totalPages
                ? "bg-zinc-50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          <svg
            className={`w-5 h-5 ${
              currentPage === totalPages ? "text-zinc-300" : "text-white"
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
    </div>
  );
};

export default function NewsCatalog() {
  const [currentPage, setCurrentPage] = useState(1);
  const newsRef = useRef(null);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(NEWS_ITEMS.length / itemsPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (newsRef.current) {
      const yOffset = -100; // Offset to account for any fixed headers
      const element = newsRef.current;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return NEWS_ITEMS.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage]);

  return (
    <Container>
      <div ref={newsRef} className="flex flex-col">
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-80 pt-16 pb-20 
          2xl:px-80 xl:px-60 lg:px-40 md:px-20 max-md:px-5"
        >
          {currentItems.map((news) => (
            <NewsCard key={news.id} {...news} />
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
