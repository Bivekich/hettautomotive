import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "./Container";
import search from "../assets/search.svg";
import { getFooterData, searchProducts } from "../services/api";
import debounce from "lodash/debounce";

function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={`
        fixed top-0 left-0 w-full h-screen bg-black
        transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
        md:hidden
        z-50
      `}
    >
      <nav className="flex flex-col items-center justify-center h-full p-4">
        <div
          className="py-6 text-white hover:text-hett-1 transition-colors cursor-pointer text-xl font-bold uppercase"
          onClick={() => handleNavigation("/about")}
        >
          О компании Hett Automotive
        </div>
        <div
          className="py-6 text-white hover:text-hett-1 transition-colors cursor-pointer text-xl font-bold uppercase"
          onClick={() => handleNavigation("/products")}
        >
          Продукция
        </div>
        <div
          className="py-6 text-white hover:text-hett-1 transition-colors cursor-pointer text-xl font-bold uppercase"
          onClick={() => handleNavigation("/news")}
        >
          Новости
        </div>
        <div
          className="py-6 text-white hover:text-hett-1 transition-colors cursor-pointer text-xl font-bold uppercase"
          onClick={() => handleNavigation("/contacts")}
        >
          Контакты
        </div>
      </nav>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-hett-1 transition-colors"
        aria-label="Close menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const [footerData, setFooterData] = useState(null);

  // Handle clicks outside of search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await searchProducts(query);

        if (response?.data) {
          const products = response.data.map((item) => ({
            id: item.id,
            name: item.name || "",
            article: item.articleNumber || "",
            slug: item.slug || "",
            brand: item.brand?.name || "",
            model: item.model?.name || "",
          }));

          // Additional client-side filtering to ensure matches
          const validProducts = products.filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.article.toLowerCase().includes(query.toLowerCase())
          );

          setSearchResults(validProducts.slice(0, 5));
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300)
  ).current;

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(true);
    debouncedSearch(query);
  };

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getFooterData();
        if (data.data) {
          setFooterData(data.data);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };

    fetchFooterData();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    return () => {
      setIsMobileMenuOpen(false);
    };
  }, [navigate]);

  return (
    <Container>
      <header ref={headerRef} className="flex flex-col mt-4 sm:mt-6 md:mt-10">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 w-full">
          {/* Logo and Burger Row */}
          <div className="flex justify-between items-center w-full md:w-auto">
            {/* Logo Section */}
            <div
              className="flex overflow-hidden gap-4 md:gap-6 items-center self-stretch pl-3 sm:pl-4 md:pl-5 my-auto bg-black h-[60px] sm:h-[70px] md:h-[83px] min-w-[200px] hover:opacity-90 transition-opacity cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/85a55d59db65cb2af3fda1985ef65b73d87177ce8f405a12e74fdb0665cf30aa"
                alt="Логотип Hett Automotive"
                className="object-contain shrink-0 self-stretch my-auto aspect-[3.5] w-[120px] sm:w-[140px] md:w-[154px]"
              />
              <div className="flex flex-col justify-center items-center self-stretch my-auto bg-hett-1 h-[60px] sm:h-[70px] md:h-[83px] w-[60px] sm:w-[70px] md:w-[84px]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dacf395a37190826413cfcf1398c3446eb7c6df93fcb32d6adb2be5a3f4c8c9"
                  alt="Зеленый логотип Hett Automotive"
                  className="object-contain aspect-[1.04] w-[35px] sm:w-[42px] md:w-[50px]"
                />
              </div>
            </div>
          </div>

          {/* Contact Info Row */}
          <div className="flex justify-end py-4 md:py-0 md:flex-1 md:items-center">
            {/* Burger Menu Button - Visible only on Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1 p-2 mr-auto"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-0.5 bg-neutral-600"></div>
              <div className="w-6 h-0.5 bg-neutral-600"></div>
              <div className="w-6 h-0.5 bg-neutral-600"></div>
            </button>

            <div className="flex gap-4 sm:gap-6 md:gap-8 items-center text-base sm:text-md font-bold leading-relaxed uppercase text-neutral-600">
              <a
                href={`tel:${footerData?.headerPhone || "+7 (495) 260 20 60"}`}
                className="text-lg font-bold leading-relaxed text- hover:text-hett-1 transition-colors cursor-pointer whitespace-nowrap"
              >
                {footerData?.headerPhone || null}
              </a>
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                <a
                  href={
                    footerData?.telegramLink
                      ? footerData.telegramLink.startsWith("http")
                        ? footerData.telegramLink
                        : `https://${footerData.telegramLink}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b83586420c9dc8893b65c6f6328eb37b69afbc6bde34d83480e77ee40852577b"
                    alt="Telegram"
                    className="object-contain aspect-[1.19] w-[18px] sm:w-[20px] md:w-[22px]"
                  />
                </a>
                <a
                  href={
                    footerData?.whatsappLink
                      ? footerData.whatsappLink.startsWith("http")
                        ? footerData.whatsappLink
                        : `https://${footerData.whatsappLink}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b60a59975eee0c801ff4dd79163ad55004f48024b27bcf29a3140c1469fc934"
                    alt="Мессенджер WhatsApp"
                    className="object-contain aspect-square w-[18px] sm:w-[20px] md:w-[22px]"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Hidden on Mobile */}
        <nav className="hidden md:flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between roboto-condensed-bold items-center px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 pb- sm:pb-6 md:py-5 w-full text-sm sm:text-[17px] font-bold leading-relaxed uppercase">
          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex gap-6 lg:gap-10 items-center self-stretch my-auto text-neutral-600">
            <div
              className="self-stretch my-auto whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/about")}
            >
              О компании Hett Automotive
            </div>
            <div
              className="self-stretch my-auto whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Продукция
            </div>
            <div
              className="self-stretch my-auto whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/news")}
            >
              Новости
            </div>
            <div
              className="self-stretch my-auto whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/contacts")}
            >
              Контакты
            </div>
          </div>
          <div ref={searchRef} className="relative">
            <div className="flex gap-1 items-center">
              <img src={search} alt="Поиск" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(true)}
                placeholder="ПОИСК"
                className="placeholder:text-neutral-400 text-[17px] outline-none leading-tight p-2"
              />
              {isSearching && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-hett-1 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-50 w-[300px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.slug}`);
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium text-neutral-600">
                      {product.brand && product.model
                        ? `${product.brand} ${product.model} - ${product.name}`
                        : product.name}
                    </div>
                    {product.article && (
                      <div className="text-sm text-gray-500">
                        Артикул: {product.article}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </header>
    </Container>
  );
}
