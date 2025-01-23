import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { API_URL, getCatalogProduct } from "../services/api";
import Container from "./Container";

const ImageGallery = ({ images, product }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]?.url || null);

  return (
    <div className="flex flex-col w-full lg:w-[590px]">
      {/* Main Image */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-center px-4 sm:px-8 lg:px-14 py-6 sm:py-8 bg-white">
          {selectedImage && (
            <img
              loading="lazy"
              src={`${API_URL}${selectedImage}`}
              alt={`${product?.name || "Продукт"} - основное изображение`}
              className="object-contain w-full aspect-[1.15]"
            />
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 1 && (
        <div className="flex flex-wrap gap-3 sm:gap-5 items-center mt-6 sm:mt-10">
          {images.map((image, index) => (
            <img
              key={index}
              loading="lazy"
              src={`${API_URL}${image.url}`}
              alt={`${product?.name || "Продукт"} - изображение ${index + 1}`}
              className={`object-contain shrink-0 self-stretch my-auto aspect-[1.39] w-[70px] sm:w-[90px] cursor-pointer ${
                selectedImage === image.url ? "border-2 border-green-600" : ""
              }`}
              onClick={() => setSelectedImage(image.url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ),
  product: PropTypes.shape({
    name: PropTypes.string,
  }),
};

const Specifications = ({ specifications, articleNumber, whereToBuyLink }) => {
  if (!specifications) return null;

  return (
    <div className="flex flex-col flex-1 w-full lg:w-auto mt-8 lg:mt-0 min-w-[240px]">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-none text-neutral-900">
        Характеристики
      </h2>
      {articleNumber && (
        <div className="mt-3 sm:mt-4 text-xl sm:text-2xl leading-snug text-gray-400">
          Артикул: {articleNumber}
        </div>
      )}
      <div className="flex flex-col mt-6 sm:mt-8 w-full text-base sm:text-xl lg:text-2xl leading-snug text-neutral-900">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex flex-wrap gap-2 sm:gap-2.5 items-end w-full mb-3 sm:mb-4"
          >
            <div>{spec.label}</div>
            <div className="flex-1 shrink h-px border border-gray-400 border-dashed basis-0 min-w-[100px]" />
            <div className="text-right">{spec.value}</div>
          </div>
        ))}
      </div>
      <a
        href={whereToBuyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-2 items-center self-start px-6 sm:px-8 py-3 sm:py-4 mt-6 sm:mt-8 bg-hett-1 min-h-[50px] sm:min-h-[60px] hover:bg-green-700 transition-colors"
      >
        <span className="self-stretch my-auto text-base sm:text-lg font-semibold leading-tight text-white">
          Где купить
        </span>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7c1f9100bb18e9ca1e9905495b55ad4b051483e255022a5b0a947a18953cece"
          alt="Arrow"
          className="object-contain self-stretch my-auto w-2.5 aspect-[1.25]"
        />
      </a>
    </div>
  );
};

Specifications.propTypes = {
  specifications: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  articleNumber: PropTypes.string,
  whereToBuyLink: PropTypes.string.isRequired,
};

const ProductInfo = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getCatalogProduct(slug);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) return <div></div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Container>
      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          <ImageGallery images={product.images} product={product} />
          <Specifications
            specifications={product.detailedSpecifications}
            articleNumber={product.articleNumber}
            whereToBuyLink={product.whereToBuyLink}
          />
        </div>
        {product.description && (
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-none text-neutral-900 mb-6 sm:mb-8">
              Описание
            </h2>
            <div className="text-base sm:text-lg lg:text-xl leading-relaxed text-black whitespace-pre-wrap max-w-[1000px]">
              {product.description}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ProductInfo;
