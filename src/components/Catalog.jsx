import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  API_URL,
  getCatalogProducts,
  getProductCategory,
  getBrands,
  getModels,
  getModifications,
  getProductCategories,
} from "../services/api";
import { motion } from "framer-motion";
import Container from "./Container";

const FilterDropdown = ({
  title,
  icon,
  options = [],
  onSelect,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    // If clicking the already selected option, deselect it
    if (option === selectedOption) {
      onSelect(null);
    } else {
      onSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full sm:flex-1 sm:min-w-[200px] sm:max-w-[300px]"
      ref={dropdownRef}
    >
      <div
        className="flex items-center h-11 px-4 border border-gray-400 cursor-pointer w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`truncate text-base sm:text-lg font-bold ${
            selectedOption ? "text-green-600" : "text-gray-400"
          }`}
        >
          {selectedOption || title}
        </span>
        <motion.img
          src={icon}
          alt={`${title} icon`}
          className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square ml-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 flex flex-col items-center bg-white border border-gray-400 w-full"
        >
          <div className="flex flex-col mt-4 w-[calc(100%-16px)]">
            <input
              type="text"
              placeholder="Поиск"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-400 text-sm text-neutral-400 w-full"
            />
          </div>

          <div className="flex relative flex-col items-center mt-4 w-full max-h-[242px] overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="flex z-0 gap-2 px-4 py-2.5 w-full cursor-pointer hover:bg-gray-50"
                onClick={() => handleOptionClick(option)}
              >
                <div
                  className={`flex shrink-0 my-auto w-3 h-3 rounded-sm ${
                    selectedOption === option
                      ? "bg-green-600 flex items-center justify-center"
                      : "border border-gray-400"
                  }`}
                >
                  {selectedOption === option && (
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b448a275f7bdbfb646aed82535cf5dcdfbaa131e7db6335135b1da717f72e615"
                      className="object-contain w-3 aspect-[1.5]"
                      alt="checkmark"
                    />
                  )}
                </div>
                <div className="grow shrink text-base text-gray-600 truncate">
                  {option}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

FilterDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) {
    return null;
  }

  const imageUrl = product.images?.[0]?.url;

  const handleClick = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="flex flex-wrap gap-8 items-start px-8 py-10 border border-solid border-zinc-400 max-md:px-5 cursor-pointer w-full"
    >
      {imageUrl && (
        <img
          loading="lazy"
          srcSet={`${API_URL}${imageUrl}?width=100 100w, ${API_URL}${imageUrl}?width=200 200w, ${API_URL}${imageUrl}?width=400 400w, ${API_URL}${imageUrl}?width=800 800w, ${API_URL}${imageUrl}?width=1200 1200w, ${API_URL}${imageUrl}?width=1600 1600w, ${API_URL}${imageUrl}?width=2000 2000w`}
          src={`${API_URL}${imageUrl}`}
          alt={product.name}
          className="object-contain shrink-0 aspect-[1.04] w-[207px]"
        />
      )}
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <div className="text-2xl font-extrabold leading-7 text-neutral-900">
          {product.name}
        </div>
        {product.articleNumber && (
          <div className="mt-8 text-2xl leading-snug text-gray-400">
            Артикул: {product.articleNumber}
          </div>
        )}
        <div className="mt-8 text-2xl leading-8 text-neutral-900">
          {product.specifications?.map((spec, index) => (
            <div key={index}>
              {spec.label}: {spec.value}
              <br />
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center self-start px-8 py-4 mt-8 bg-hett-1 hover:bg-green-600 transition-colors duration-300 min-h-[60px] max-md:px-5">
          <div className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
            Подробнее о товаре
          </div>
          <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f768dc0bc0f7cf7a8ce71675970b30a2473b0ea98d39b37565db3fc3cd9e6fbc"
              className="object-contain self-stretch my-auto w-3.5 aspect-[1.25]"
              alt="arrow"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    articleNumber: PropTypes.string,
    slug: PropTypes.string.isRequired,
    specifications: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

const Catalog = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Filter states
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modifications, setModifications] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: null,
    model: null,
    modification: null,
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await getBrands();
        setBrands(brandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  // Fetch models when brand is selected
  useEffect(() => {
    const fetchModels = async () => {
      if (selectedFilters.brand) {
        try {
          const modelsData = await getModels(selectedFilters.brand.id);
          setModels(modelsData);
          // Reset model and modification selections when brand changes
          setSelectedFilters((prev) => ({
            ...prev,
            model: null,
            modification: null,
          }));
        } catch (error) {
          console.error("Error fetching models:", error);
        }
      } else {
        setModels([]);
      }
    };

    fetchModels();
  }, [selectedFilters.brand]);

  // Fetch modifications when model is selected
  useEffect(() => {
    const fetchModifications = async () => {
      if (selectedFilters.model) {
        try {
          const modificationsData = await getModifications(
            selectedFilters.model.id
          );
          setModifications(modificationsData);
          // Reset modification selection when model changes
          setSelectedFilters((prev) => ({
            ...prev,
            modification: null,
          }));
        } catch (error) {
          console.error("Error fetching modifications:", error);
        }
      } else {
        setModifications([]);
      }
    };

    fetchModifications();
  }, [selectedFilters.model]);

  const handleSearch = async () => {
    try {
      setIsSearching(true);
      const filters = {
        category: categorySlug,
        brand: selectedFilters.brand?.id,
        model: selectedFilters.model?.id,
        modification: selectedFilters.modification?.id,
      };

      const productsData = await getCatalogProducts(filters);
      setProducts(productsData.data || []);
    } catch (error) {
      console.error("Failed to search products:", error);
      setError(error.message);
    } finally {
      setIsSearching(false);
    }
  };

  // Update the fetchData useEffect to not automatically fetch on filter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (categorySlug) {
          const categoryData = await getProductCategory(categorySlug);
          setCategory(categoryData);
        }

        const productsData = await getCatalogProducts({
          category: categorySlug,
        });
        setProducts(productsData.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]); // Only re-fetch when category changes

  const handleFilterSelect = (filterType, value) => {
    if (filterType === "category") {
      // Navigate to the selected category
      if (value) {
        navigate(`/catalog/${value.slug}`);
      }
      return;
    }

    if (value === null) {
      setSelectedFilters((prev) => {
        const newFilters = { ...prev, [filterType]: null };
        // If brand is deselected, also clear model and modification
        if (filterType === "brand") {
          newFilters.model = null;
          newFilters.modification = null;
        }
        // If model is deselected, also clear modification
        if (filterType === "model") {
          newFilters.modification = null;
        }
        return newFilters;
      });
      return;
    }

    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 pt-8 sm:pt-16 pb-10">
        {category && (
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
            {category.name}
          </h1>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row z-0 gap-3 sm:gap-5 items-stretch sm:items-start w-full mb-6 sm:mb-8">
          <FilterDropdown
            title="Категория"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/120bd9cdb085bbc6acafbf2a4db17046c1f3e859ef9cbdc28cc0bcbc572866a6"
            options={categories.map((cat) => cat.name)}
            onSelect={(value) =>
              handleFilterSelect(
                "category",
                categories.find((c) => c.name === value)
              )
            }
            selectedOption={category?.name}
          />
          <FilterDropdown
            title="Бренд"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/120bd9cdb085bbc6acafbf2a4db17046c1f3e859ef9cbdc28cc0bcbc572866a6"
            options={brands.map((brand) => brand.name)}
            onSelect={(value) =>
              handleFilterSelect(
                "brand",
                brands.find((b) => b.name === value)
              )
            }
            selectedOption={selectedFilters.brand?.name}
          />
          <FilterDropdown
            title="Модель"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/11e09494d5828c0a461356da0ce3de799ce910322067e0edf11156449efef8f4"
            options={models.map((model) => model.name)}
            onSelect={(value) =>
              handleFilterSelect(
                "model",
                models.find((m) => m.name === value)
              )
            }
            selectedOption={selectedFilters.model?.name}
          />
          <FilterDropdown
            title="Модификация"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4e5434977730f4841422da40a0e2d4f7c9f23774ce325137526bf99433ab9907"
            options={modifications.map((mod) => mod.name)}
            onSelect={(value) =>
              handleFilterSelect(
                "modification",
                modifications.find((m) => m.name === value)
              )
            }
            selectedOption={selectedFilters.modification?.name}
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="h-11 px-8 sm:px-12 py-2 font-semibold text-base sm:text-lg text-white bg-hett-1 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? "Поиск..." : "Найти"}
          </button>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="mt-8 sm:mt-16 text-center">No products found</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-16">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Catalog;
