import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CatalogProductCard({ product, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="flex flex-wrap gap-8 items-start px-8 py-10 border border-solid border-zinc-400 max-md:px-5"
    >
      <img
        loading="lazy"
        srcSet={`${product.image}?width=100 100w, ${product.image}?width=200 200w, ${product.image}?width=400 400w, ${product.image}?width=800 800w, ${product.image}?width=1200 1200w, ${product.image}?width=1600 1600w, ${product.image}?width=2000 2000w`}
        src={product.image}
        alt={product.name}
        className="object-contain shrink-0 aspect-[1.04] w-[207px]"
      />
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <div className="text-2xl font-extrabold leading-7 text-neutral-900">
          {product.name}
        </div>
        <div className="mt-8 text-2xl leading-snug text-gray-400">
          Артикул: {product.articleNumber}
        </div>
        <div className="mt-8 text-2xl leading-8 text-neutral-900">
          {product.specifications.map((spec, index) => (
            <div key={index}>
              {spec.label}: {spec.value}
              <br />
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center self-start px-8 py-4 mt-8 bg-green-600 min-h-[60px] max-md:px-5">
          <div className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
            Подробнее о товаре
          </div>
          <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f768dc0bc0f7cf7a8ce71675970b30a2473b0ea98d39b37565db3fc3cd9e6fbc"
              className="object-contain self-stretch my-auto w-2.5 aspect-[1.25]"
              alt="arrow"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

CatalogProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    articleNumber: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    specifications: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
