import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "./Container";

function MobileMenu({ isOpen }) {
  const navigate = useNavigate();

  return (
    <Container>
      <div
        className={`
      fixed top-[143px] left-0 right-0 bg-neutral-900 
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-y-0" : "-translate-y-full"}
      md:hidden
    `}
      >
        <nav className="flex flex-col p-5 text-md font-bold uppercase">
          <div
            className="py-4 text-neutral-600 hover:text-hett-1 transition-colors cursor-pointer"
            onClick={() => navigate("/about")}
          >
            О компании Hett Automotive
          </div>
          <div
            className="py-4 text-neutral-600 hover:text-hett-1 transition-colors cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Продукция
          </div>
          <div
            className="py-4 text-neutral-600 hover:text-hett-1 transition-colors cursor-pointer"
            onClick={() => navigate("/news")}
          >
            Новости
          </div>
          <div
            className="py-4 text-neutral-600 hover:text-hett-1 transition-colors cursor-pointer"
            onClick={() => navigate("/contacts")}
          >
            Контакты
          </div>
          <div
            className="py-4 text-neutral-600 hover:text-hett-1 transition-colors cursor-pointer"
            onClick={() => navigate("/search")}
          >
            Поиск
          </div>
        </nav>
      </div>
    </Container>
  );
}

MobileMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Container>
      <header className="flex flex-col mt-10">
        {/* Top Bar */}
        <div className="flex flex-wrap gap-10 justify-between items-center px-80 pb-8 w-full max-md:px-5 max-md:max-w-full">
          {/* Logo Section */}
          <div
            className="flex overflow-hidden gap-6 items-center self-stretch pl-5 my-auto bg-black h-[83px] min-w-[240px] hover:opacity-90 transition-opacity cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/85a55d59db65cb2af3fda1985ef65b73d87177ce8f405a12e74fdb0665cf30aa"
              alt="Company Logo"
              className="object-contain shrink-0 self-stretch my-auto aspect-[3.5] w-[154px]"
            />
            <div className="flex flex-col justify-center items-center self-stretch my-auto bg-hett-1 h-[83px] w-[84px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4dacf395a37190826413cfcf1398c3446eb7c6df93fcb32d6adb2be5a3f4c8c9"
                alt="Green Logo"
                className="object-contain aspect-[1.04] w-[50px]"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex gap-8 items-center self-stretch my-auto text-lg font-bold leading-relaxed uppercase min-w-[240px] text-neutral-600">
            <div className="self-stretch my-auto hover:text-hett-1 transition-colors cursor-pointer">
              +7 (495) 260 20 60
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b83586420c9dc8893b65c6f6328eb37b69afbc6bde34d83480e77ee40852577b"
              alt="Contact Icon 1"
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.19] w-[25px] hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b60a59975eee0c801ff4dd79163ad55004f48024b27bcf29a3140c1469fc934"
              alt="Contact Icon 2"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px] hover:scale-110 transition-transform cursor-pointer"
            />
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex flex-wrap gap-10 justify-between items-center px-80 pb-8 w-full text-md font-bold leading-relaxed uppercase max-md:px-5 max-md:max-w-full">
          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex gap-10 items-center self-stretch my-auto min-w-[240px] text-neutral-600 w-[480px] max-md:max-w-full">
            <div
              className="self-stretch my-auto whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/about")}
            >
              О компании Hett Automotive
            </div>
            <div
              className="self-stretch px-0.5 my-auto whitespace-nowrap w-[100px] hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Продукция
            </div>
            <div
              className="self-stretch my-auto w-20 whitespace-nowrap hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/news")}
            >
              Новости
            </div>
            <div
              className="self-stretch my-auto whitespace-nowrap w-[90px] hover:text-hett-1 transition-colors cursor-pointer"
              onClick={() => navigate("/contacts")}
            >
              Контакты
            </div>
          </div>

          {/* Burger Menu Button - Visible only on Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-1"
          >
            <div className="w-6 h-0.5 bg-neutral-600"></div>
            <div className="w-6 h-0.5 bg-neutral-600"></div>
            <div className="w-6 h-0.5 bg-neutral-600"></div>
          </button>
        </nav>
      </header>
    </Container>
  );
}
