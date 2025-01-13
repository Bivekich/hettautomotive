import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { getFooterData, getProductCategories } from "../services/api";

export default function Footer() {
  const [footerData, setFooterData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [footerResponse, categoriesResponse] = await Promise.all([
          getFooterData(),
          getProductCategories(),
        ]);

        if (footerResponse.data) {
          setFooterData(footerResponse.data);
        }
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  if (isLoading) return null;
  if (error) return null;
  if (!footerData) return null;

  return (
    <footer className="flex overflow-hidden flex-col px-4 sm:px-8 md:px-16 lg:px-40 xl:px-80 pt-8 pb-10 bg-neutral-900">
      {/* Top Section with Logo and Contact */}
      <Container>
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-10 justify-between items-center w-full min-h-[60px] sm:min-h-[70px] md:min-h-[83px]">
          {/* Logo Section */}
          <div
            onClick={() => handleNavigation("/")}
            className="flex overflow-hidden gap-4 md:gap-6 items-center self-stretch pl-3 sm:pl-4 md:pl-5 my-auto bg-slate-50 h-[60px] sm:h-[70px] md:h-[83px] min-w-[200px] hover:opacity-90 transition-opacity cursor-pointer"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b1599ad811cd4fe3e75d82a9a323e347dafda3546589d0763171f6c8326cb8b"
              alt="Company Logo"
              className="object-contain shrink-0 self-stretch my-auto aspect-[3.5] w-[120px] sm:w-[140px] md:w-[154px]"
            />
            <div className="flex flex-col justify-center items-center self-stretch my-auto bg-hett-1 h-[60px] sm:h-[70px] md:h-[83px] w-[60px] sm:w-[70px] md:w-[84px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fadb7b4a3170104373df386fc3fb2449ec8b72580e752080c723f4b4a2bf5634"
                alt="Green Logo"
                className="object-contain aspect-[1.04] w-[35px] sm:w-[42px] md:w-[50px]"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex gap-4 sm:gap-6 md:gap-8 items-center self-stretch my-auto text-base sm:text-lg font-bold leading-relaxed text-white uppercase">
            <a
              href={`tel:${footerData?.headerPhone || "+7 (495) 260 20 60"}`}
              className="self-stretch my-auto hover:text-hett-1 transition-colors cursor-pointer whitespace-nowrap"
            >
              {footerData.headerPhone}
            </a>
            <div className="flex gap-4 sm:gap-6 md:gap-8">
              <a
                href={
                  footerData.telegramLink.startsWith("http")
                    ? footerData.telegramLink
                    : `https://${footerData.telegramLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/611067c0053092c14ac1422d83852b3eefea7317344547d49000d14690293695"
                  alt="Telegram"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[1.19] w-[20px] sm:w-[22px] md:w-[25px]"
                />
              </a>
              <a
                href={
                  footerData.whatsappLink.startsWith("http")
                    ? footerData.whatsappLink
                    : `https://${footerData.whatsappLink}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffdb1de3add8517880d03b3f518d2eedd71762fad162a1a9614d6259a8972fa9"
                  alt="WhatsApp"
                  className="object-contain shrink-0 self-stretch my-auto aspect-square w-[18px] sm:w-[20px] md:w-[22px]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-8 md:mt-10">
          {/* Products Column */}
          <div
            className={`flex flex-col ${
              categories.length > 4 ? "sm:col-span-2" : "sm:col-span-1"
            } lg:col-span-1`}
          >
            <h3 className="text-lg sm:text-xl font-bold leading-none text-white">
              Продукция
            </h3>
            <div
              className={`flex ${
                categories.length > 4 ? "flex-row gap-x-8" : "flex-col"
              } mt-6 md:mt-8`}
            >
              {/* First column (first 4 categories) */}
              <nav
                className="flex flex-col gap-y-3 md:gap-y-4 w-full leading-snug text-gray-400
                2xl:text-base
                xl:text-base
                lg:text-sm
                md:text-sm
                max-md:text-xs"
              >
                {categories.slice(0, 4).map((category) => (
                  <div
                    key={category.id}
                    onClick={() =>
                      handleNavigation(`/catalog/${category.slug}`)
                    }
                    className="hover:text-hett-1 transition-colors cursor-pointer"
                  >
                    {category.name}
                  </div>
                ))}
              </nav>

              {/* Second column (next 4 categories) */}
              {categories.length > 4 && (
                <nav
                  className="flex flex-col gap-y-3 md:gap-y-4 w-full leading-snug text-gray-400
                  2xl:text-base
                  xl:text-base
                  lg:text-sm
                  md:text-sm
                  max-md:text-xs"
                >
                  {categories.slice(4, 8).map((category) => (
                    <div
                      key={category.id}
                      onClick={() =>
                        handleNavigation(`/catalog/${category.slug}`)
                      }
                      className="hover:text-hett-1 transition-colors cursor-pointer"
                    >
                      {category.name}
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </div>

          {/* Information Column */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold leading-none text-white">
              Актуальная информация
            </h3>
            <nav className="flex flex-col mt-6 md:mt-8 w-full text-sm sm:text-base leading-snug text-gray-400">
              <div
                onClick={() => handleNavigation("/about")}
                className="hover:text-hett-1 transition-colors cursor-pointer"
              >
                О компании Hett Automotive
              </div>
              <div
                onClick={() => handleNavigation("/news")}
                className="mt-3 md:mt-4 hover:text-hett-1 transition-colors cursor-pointer"
              >
                Новости
              </div>
              <div
                onClick={() => handleNavigation("/contacts")}
                className="mt-3 md:mt-4 hover:text-hett-1 transition-colors cursor-pointer"
              >
                Контактная информация
              </div>
            </nav>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col justify-center w-full leading-tight">
              <a
                href={`tel:${footerData?.phone || "+7 (495) 260 20 60"}`}
                className="text-gray-400 hover:text-hett-1 transition-colors cursor-pointer
                  2xl:text-xl
                  xl:text-lg
                  lg:text-base
                  md:text-base
                  max-md:text-sm font-semibold"
              >
                {footerData.phone}
              </a>
              <div
                className="mt-2 sm:mt-2.5 text-slate-50 font-medium
                2xl:text-sm
                xl:text-sm
                lg:text-xs
                md:text-xs
                max-md:text-xs"
              >
                {footerData.phoneLabel}
              </div>
            </div>
            <div className="flex flex-col justify-center mt-6 md:mt-10 w-full leading-tight whitespace-nowrap">
              <div className="text-lg sm:text-xl font-semibold text-gray-400 hover:text-hett-1 transition-colors cursor-pointer">
                {footerData.email}
              </div>
              <div className="mt-2 sm:mt-2.5 text-xs sm:text-sm font-medium text-slate-50">
                {footerData.emailLabel}
              </div>
            </div>
            <address className="flex flex-col justify-center mt-6 md:mt-10 w-full not-italic">
              <div className="text-lg sm:text-xl font-semibold leading-7 sm:leading-8 text-gray-400 hover:text-hett-1 transition-colors cursor-pointer">
                {footerData.address}
              </div>
              <div className="flex gap-2 sm:gap-2.5 items-start self-start mt-2 sm:mt-2.5 text-xs sm:text-sm leading-tight">
                <div className="font-medium text-slate-50">
                  {footerData.addressLabel}
                </div>
                <a
                  href={footerData.addressMapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-hett-1 hover:text-green-500 transition-colors"
                >
                  Показать на карте
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 justify-between items-start sm:items-center pt-8 md:pt-10 mt-8 sm:mt-16 md:mt-20 w-full text-sm sm:text-base leading-relaxed text-gray-400 border-t border-gray-700">
          <div className="w-full sm:w-auto hover:text-gray-300 transition-colors">
            {footerData.copyright}
          </div>
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 items-start sm:items-center">
            <a
              href={footerData.termsOfUseLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hett-1 transition-colors"
            >
              {footerData.termsOfUse}
            </a>
            <a
              href={footerData.privacyPolicyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hett-1 transition-colors"
            >
              {footerData.privacyPolicy}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
