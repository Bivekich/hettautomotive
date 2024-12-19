const ONLINE_STORES = [
  {
    id: 1,
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/575e22350852dd2d1d965dc149da403fa41b4752f6c9a5b6a88ee75e263c7032",
    title: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
    logoWidth: "201px",
    logoAspect: "2.48",
  },
  {
    id: 2,
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/5add29fc08c831d66a8652f4c143905954414d3aef40a7eae2fb2840a1cd4ae9",
    title: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
    logoWidth: "248px",
    logoAspect: "3.06",
  },
  {
    id: 3,
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/575e22350852dd2d1d965dc149da403fa41b4752f6c9a5b6a88ee75e263c7032",
    title: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
    logoWidth: "201px",
    logoAspect: "2.48",
  },
  {
    id: 4,
    logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/5add29fc08c831d66a8652f4c143905954414d3aef40a7eae2fb2840a1cd4ae9",
    title: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
    logoWidth: "248px",
    logoAspect: "3.06",
  },
];

const PHYSICAL_STORES = [
  {
    id: 1,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
  {
    id: 2,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
  {
    id: 3,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
  {
    id: 4,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
  {
    id: 5,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
  {
    id: 6,
    name: "Название магазина 1",
    description: "Интернет-магазин автозапчастей",
    url: "https://exist.ru/",
  },
];

function OnlineStore({ logo, title, url, logoWidth, logoAspect }) {
  return (
    <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px]">
      <img
        loading="lazy"
        srcSet={`${logo}?width=100 100w, ${logo}?width=2000 2000w`}
        className={`object-contain max-w-full aspect-[${logoAspect}] w-[${logoWidth}]`}
        alt={title}
      />
      <div className="mt-5 leading-8 text-black">{title}</div>
      <div className="mt-5 leading-snug text-green-600">{url}</div>
    </div>
  );
}

function PhysicalStore({ name, description, url }) {
  return (
    <div className="flex flex-col p-4 md:p-7 border border-solid border-zinc-400">
      <div className="text-xl md:text-2xl font-bold leading-tight text-neutral-900">
        {name}
      </div>
      <div className="mt-1 text-black text-base md:text-xl">{description}</div>
      <div className="mt-1 hover:text-green-700 transition-colors text-green-600 text-base md:text-xl">
        {url}
      </div>
    </div>
  );
}

export default function WhereToBuy() {
  return (
    <div className="flex overflow-hidden flex-col px-5 md:px-20 lg:px-80 pt-24 pb-10">
      <h1 className="text-4xl md:text-5xl font-bold leading-none text-black">
        Где купить?
      </h1>

      {/* Online Stores Section */}
      <div className="flex flex-col mt-8 md:mt-16 w-full">
        <h2 className="text-3xl md:text-4xl font-bold leading-none text-black">
          Онлайн
        </h2>
        <div className="flex flex-wrap gap-5 md:gap-20 items-center mt-6 md:mt-10 w-full text-xl md:text-2xl">
          {ONLINE_STORES.map((store) => (
            <OnlineStore key={store.id} {...store} />
          ))}
        </div>
      </div>

      {/* Physical Stores Section */}
      <div className="flex flex-col mt-8 md:mt-16 w-full text-xl md:text-2xl leading-snug">
        <h2 className="text-3xl md:text-4xl font-bold leading-none text-black">
          Адреса магазинов
        </h2>

        <button className="flex gap-1 items-center self-start pb-2.5 mt-6 md:mt-10 text-xl md:text-2xl font-semibold leading-relaxed text-green-600 whitespace-nowrap border-b border-green-600">
          <span>Москва</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/47b051a4e7c59fdc33aafc74ab87d9b6c29c5ee6dec28d94e3276ffa57d95392"
            className="object-contain shrink-0 w-3.5 aspect-square"
            alt="Arrow icon"
          />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-6 md:mt-10">
          {PHYSICAL_STORES.map((store) => (
            <PhysicalStore key={store.id} {...store} />
          ))}
        </div>
      </div>
    </div>
  );
}
