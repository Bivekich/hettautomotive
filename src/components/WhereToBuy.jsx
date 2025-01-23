import { useState, useEffect } from "react";
import { getOnlineStores, getPhysicalStores } from "../services/api";

function OnlineStore({ logo, title, url, logoWidth, logoAspect }) {
  return (
    <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0 min-w-[240px] max-w-[300px]">
      <div className="flex justify-start">
        <img
          loading="lazy"
          src={`${import.meta.env.VITE_STRAPI_API_URL}${logo?.url}`}
          className={`object-contain max-w-full`}
          alt={title}
        />
      </div>
      <div className="mt-5 leading-8 text-black">{title}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 leading-snug text-green-600 hover:text-green-700 transition-colors"
      >
        {url}
      </a>
    </div>
  );
}

function PhysicalStore({ name, description, link }) {
  return (
    <div className="flex flex-col p-4 md:p-7 border border-solid border-zinc-400">
      <div className="text-xl md:text-2xl font-bold leading-tight text-neutral-900">
        {name}
      </div>
      <div className="mt-1 text-black text-base md:text-xl">{description}</div>
      {link && (
        <div className="mt-1 hover:text-green-700 transition-colors text-green-600 text-base md:text-xl">
          {link}
        </div>
      )}
    </div>
  );
}

export default function WhereToBuy() {
  const [onlineStores, setOnlineStores] = useState([]);
  const [physicalStores, setPhysicalStores] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Москва");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Get unique cities from physical stores
  const cities = [...new Set(physicalStores.map((store) => store.city))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [onlineData, physicalData] = await Promise.all([
          getOnlineStores(),
          getPhysicalStores(),
        ]);

        setOnlineStores(onlineData.data);
        setPhysicalStores(physicalData.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching stores data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Return null if loading or error
  if (isLoading || error) return null;

  // Return null if no data
  if (!onlineStores?.length && !physicalStores?.length) return null;

  const filteredStores = physicalStores.filter(
    (store) => store.city === selectedCity
  );

  return (
    <div className="flex overflow-hidden flex-col px-5 md:px-20 lg:px-80 pt-24 pb-10">
      <h1 className="text-4xl md:text-5xl font-bold leading-none text-black">
        Где купить?
      </h1>

      {/* Online Stores Section - Only show if there are online stores */}
      {onlineStores?.length > 0 && (
        <div className="flex flex-col mt-8 md:mt-16 w-full">
          <h2 className="text-3xl md:text-4xl font-bold leading-none text-black">
            Онлайн
          </h2>
          <div className="flex flex-wrap gap-5 md:gap-20 items-center mt-6 md:mt-10 w-full text-xl md:text-2xl">
            {onlineStores.map((store) => (
              <OnlineStore
                key={store.id}
                logo={store.logo}
                title={store.title}
                url={store.url}
                logoWidth={store.logoWidth}
                logoAspect={store.logoAspect}
              />
            ))}
          </div>
        </div>
      )}

      {/* Physical Stores Section - Only show if there are physical stores */}
      {physicalStores?.length > 0 && (
        <div className="flex flex-col mt-8 md:mt-16 w-full text-xl md:text-2xl leading-snug">
          <h2 className="text-3xl md:text-4xl font-bold leading-none text-black">
            Адреса магазинов
          </h2>

          <div className="relative">
            <button
              className="flex gap-1 items-center self-start pb-2.5 mt-6 md:mt-10 text-xl md:text-2xl font-semibold leading-relaxed text-green-600 whitespace-nowrap border-b border-green-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{selectedCity}</span>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/47b051a4e7c59fdc33aafc74ab87d9b6c29c5ee6dec28d94e3276ffa57d95392"
                className={`object-contain shrink-0 w-3.5 aspect-square transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                alt={isOpen ? "Стрелка вверх" : "Стрелка вниз"}
              />
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-1 py-2 bg-white border border-gray-200 rounded-md shadow-lg min-w-[200px]">
                {cities.map((city) => (
                  <button
                    key={city}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                      city === selectedCity ? "text-green-600" : "text-black"
                    }`}
                    onClick={() => {
                      setSelectedCity(city);
                      setIsOpen(false);
                    }}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 mt-6 md:mt-10">
            {filteredStores.map((store) => (
              <PhysicalStore
                key={store.id}
                name={store.name}
                description={store.description}
                link={store.link}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
