import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function ProductCard({ category, image, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="flex flex-wrap gap-8 items-start px-8 py-10 border border-solid border-zinc-400 bg-white cursor-pointer min-w-[240px] max-md:px-5"
    >
      <div className="flex flex-col justify-center items-center h-[140px] w-[207px]">
        {image && (
          <img
            loading="lazy"
            src={image.image}
            alt={`Категория ${category.name}`}
            className={`object-contain ${image.imageClass}`}
          />
        )}
      </div>
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <h2 className="text-2xl font-extrabold leading-7 text-neutral-900">
          {category.name}
        </h2>
        {category.catalogProducts && category.catalogProducts.length > 0 && (
          <div className="mt-8 text-2xl leading-8 text-neutral-900">
            {`${category.catalogProducts.length} ${
              category.catalogProducts.length === 1 ? "товар" : "товаров"
            }`}
          </div>
        )}
        <div className="flex gap-2 items-center self-start px-8 py-4 mt-8 bg-green-600 min-h-[60px] max-md:px-5">
          <div className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
            Подробнее о категории
          </div>
          <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f768dc0bc0f7cf7a8ce71675970b30a2473b0ea98d39b37565db3fc3cd9e6fbc"
              className="object-contain self-stretch my-auto w-2.5 aspect-[1.25]"
              alt="Стрелка вправо"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

ProductCard.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    catalogProducts: PropTypes.array,
  }).isRequired,
  image: PropTypes.shape({
    image: PropTypes.string.isRequired,
    imageClass: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
