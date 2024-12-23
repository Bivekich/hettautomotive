const PRODUCTS = [
  {
    id: 1,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0f92659a1087e1337df874ca65419068d1e6d45fed080b7c3271ba4a4896b710",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/fdc797e2de3f495396bdc805c31e0f6a4428ed050a0cb2802c8e8f274abbb2e0",
    imagePosition: "right",
    hasGrayBackground: true,
  },
  {
    id: 3,
    title: "Сувенирная продукция",
    description:
      "Одним из главных преимуществ Hett Automotive является её надёжность. Клиенты могут быть уверены в том, что они получат качественные автозапчасти, которые прослужат им долгое время.",
    buttonText: "Где купить сувенирную продукцию",
    imagePosition: "left",
    hasGrayBackground: true,
  },
];

function ProductSection({
  title,
  description,
  buttonText,
  image,
  imagePosition,
  hasGrayBackground,
}) {
  const ImageComponent = () => (
    <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[620px] max-md:max-w-full">
      {image ? (
        <div
          className={
            hasGrayBackground
              ? "flex flex-col px-9 pt-12 pb-1 bg-gray-200 max-md:px-5 max-md:max-w-full"
              : ""
          }
        >
          <img
            loading="lazy"
            srcSet={`${image}?width=100 100w, ${image}?width=200 200w, ${image}?width=400 400w, ${image}?width=800 800w, ${image}?width=1200 1200w, ${image}?width=1600 1600w, ${image}?width=2000 2000w`}
            alt={title}
            className="object-contain w-full aspect-[1.34] max-md:max-w-full"
          />
        </div>
      ) : (
        <div className="flex shrink-0 bg-gray-200 h-[460px] max-md:max-w-full" />
      )}
    </div>
  );

  const ContentComponent = () => (
    <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
      <h2 className="text-4xl font-bold leading-none text-black max-md:max-w-full">
        {title}
      </h2>
      <p className="mt-16 text-2xl leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {description}
      </p>
      <button className="flex gap-2 items-center self-start px-8 py-4 mt-16 bg-hett-1 min-h-[60px] max-md:px-5 max-md:mt-10">
        <span className="self-stretch my-auto text-lg font-semibold leading-tight text-white">
          {buttonText}
        </span>
        <div className="flex gap-5 justify-center items-center self-stretch my-auto min-h-[26px] w-[26px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cc55b0d0a22cdc82a3bd703c2e87fc9e7d8a4cbc459481b35310d14f9f98978"
            alt="Arrow Icon"
            className="object-contain self-stretch my-auto w-2.5 aspect-[1.11]"
          />
        </div>
      </button>
    </div>
  );

  return (
    <div className="flex flex-wrap gap-10 items-center mt-16 w-full max-md:mt-10 max-md:max-w-full">
      {imagePosition === "left" ? (
        <>
          <ImageComponent />
          <ContentComponent />
        </>
      ) : (
        <>
          <ContentComponent />
          <ImageComponent />
        </>
      )}
    </div>
  );
}

export default function Products() {
  return (
    <section className="flex overflow-hidden flex-col px-80 py-24 max-md:px-5">
      <h1 className="text-5xl font-bold leading-none text-black max-md:max-w-full max-md:text-4xl">
        Продукция
      </h1>

      {PRODUCTS.map((product) => (
        <ProductSection key={product.id} {...product} />
      ))}
    </section>
  );
}
