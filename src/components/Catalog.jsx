import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const FilterDropdown = ({
  title,
  icon,
  options = [],
  onSelect,
  selectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div
        className="flex gap-2 items-center py-2 pr-5 pl-5 border border-gray-400 min-w-[240px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`self-stretch my-auto w-[200px] text-lg font-bold ${
            selectedOption ? "text-green-600" : "text-gray-400"
          }`}
        >
          {title}
        </span>
        <img
          src={icon}
          alt={`${title} icon`}
          className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 flex flex-col items-center bg-white border border-gray-400 w-full">
          <div className="flex flex-col mt-4 max-w-full w-[220px]">
            <input
              type="text"
              placeholder="Поиск"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-400 text-sm text-neutral-400"
            />
          </div>

          <div className="flex relative flex-col items-center mt-4 w-full max-h-[242px] overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="flex z-0 gap-2 px-5 py-2.5 w-full cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
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
                <div className="grow shrink text-base text-gray-600 w-[198px]">
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-wrap grow shrink gap-8 items-start px-8 py-10 border border-zinc-400 min-w-[240px] w-[496px] max-md:px-5 max-md:max-w-full">
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="object-contain shrink-0 aspect-[1.04] w-[207px]"
        />
      )}
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <h3 className="text-2xl font-bold leading-7 text-neutral-900">
          {product.title}
        </h3>
        <div className="mt-8 text-2xl leading-snug text-gray-400">
          Артикул: {product.articleNumber}
        </div>
        <div className="mt-8 text-2xl leading-8 text-neutral-900">
          {product.specifications.map((spec, index) => (
            <div key={index}>
              {spec}
              <br />
            </div>
          ))}
        </div>
        <button className="flex gap-2 items-center self-start px-8 py-3 mt-8 bg-hett-1 hover:bg-green-700 transition-colors">
          <span className="text-lg font-semibold text-white">
            Подробнее о товаре
          </span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f768dc0bc0f7cf7a8ce71675970b30a2473b0ea98d39b37565db3fc3cd9e6fbc"
            alt="Arrow"
            className="w-2.5 aspect-[1.25]"
          />
        </button>
      </div>
    </div>
  );
};

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    brand: "",
    model: "",
    modification: "",
    category: "",
  });

  // Update filters when URL parameters change
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedFilters((prev) => ({
        ...prev,
        category: category,
      }));
    }
  }, [searchParams]);

  // Mock filter options
  const filterOptions = {
    brand: [
      "Abbarth",
      "Acura",
      "Alfa Romeo",
      "Alpina",
      "Astra",
      "Audi",
      "Baic",
      "HETT",
      "Другие бренды",
    ],
    model: ["Модель A", "Модель B", "Модель C"],
    modification: ["Модификация 1", "Модификация 2", "Модификация 3"],
    category: ["Запчасти", "Аксессуары", "Расходники"],
  };

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const mockProducts = {
    section1: [
      /* your product data */
    ],
    section2: [
      /* your product data */
    ],
  };

  return (
    <div className="flex overflow-hidden relative flex-col px-80 pt-16 max-md:px-5">
      {/* Filters */}
      <div className="flex z-0 flex-wrap gap-5 items-start w-full">
        <FilterDropdown
          title="Марка"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/87fd2aef37e74526933619f5d80fc151fb792149ba1b0200bcf753f8c7dbc348"
          options={filterOptions.brand}
          onSelect={(value) => handleFilterSelect("brand", value)}
          selectedOption={selectedFilters.brand}
        />
        <FilterDropdown
          title="Модель"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/11e09494d5828c0a461356da0ce3de799ce910322067e0edf11156449efef8f4"
          options={filterOptions.model}
          onSelect={(value) => handleFilterSelect("model", value)}
          selectedOption={selectedFilters.model}
        />
        <FilterDropdown
          title="Модификация"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/4e5434977730f4841422da40a0e2d4f7c9f23774ce325137526bf99433ab9907"
          options={filterOptions.modification}
          onSelect={(value) => handleFilterSelect("modification", value)}
          selectedOption={selectedFilters.modification}
        />
        <FilterDropdown
          title="Категория"
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/120bd9cdb085bbc6acafbf2a4db17046c1f3e859ef9cbdc28cc0bcbc572866a6"
          options={filterOptions.category}
          onSelect={(value) => handleFilterSelect("category", value)}
          selectedOption={selectedFilters.category}
        />
        <button className="px-8 py-2 font-semibold text-lg text-white bg-hett-1 hover:bg-green-700 transition-colors">
          Найти
        </button>
      </div>

      {/* Product Sections */}
      {Object.entries(mockProducts).map(([sectionTitle, products], index) => (
        <div key={sectionTitle}>
          <h2 className="z-0 mt-16 text-4xl font-bold leading-none text-black max-md:mt-10 max-md:max-w-full max-md:text-4xl">
            Раздел {index + 1}
          </h2>
          <div className="flex z-0 flex-wrap gap-10 items-start mt-16 w-full max-md:mt-10 max-md:max-w-full">
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
