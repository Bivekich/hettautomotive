import Container from "./Container";

export default function Footer() {
  return (
    <footer className="flex overflow-hidden flex-col px-80 pt-8 pb-10 bg-neutral-900 max-md:px-5">
      {/* Top Section with Logo and Contact */}
      <Container>
        <div className="flex flex-wrap gap-10 justify-between items-center w-full min-h-[83px] max-md:max-w-full">
          {/* Logo Section */}
          <div className="flex overflow-hidden gap-6 items-center self-stretch pl-5 my-auto bg-slate-50 h-[83px] min-w-[240px] hover:opacity-90 transition-opacity cursor-pointer">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b1599ad811cd4fe3e75d82a9a323e347dafda3546589d0763171f6c8326cb8b"
              alt="Company Logo"
              className="object-contain shrink-0 self-stretch my-auto aspect-[3.5] w-[154px]"
            />
            <div className="flex flex-col justify-center items-center self-stretch pr-4 pl-5 my-auto bg-hett-1 h-[84px] w-[84px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fadb7b4a3170104373df386fc3fb2449ec8b72580e752080c723f4b4a2bf5634"
                alt="Green Logo"
                className="object-contain aspect-[1.04] w-[50px]"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex gap-8 items-center self-stretch my-auto text-lg font-bold leading-relaxed text-white uppercase min-w-[240px]">
            <div className="self-stretch my-auto hover:text-hett-1 transition-colors cursor-pointer">
              +7 (495) 260 20 60
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/611067c0053092c14ac1422d83852b3eefea7317344547d49000d14690293695"
              alt="Contact Icon 1"
              className="object-contain shrink-0 self-stretch my-auto aspect-[1.14] w-[25px] hover:scale-110 transition-transform cursor-pointer"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffdb1de3add8517880d03b3f518d2eedd71762fad162a1a9614d6259a8972fa9"
              alt="Contact Icon 2"
              className="object-contain shrink-0 self-stretch my-auto aspect-square w-[22px] hover:scale-110 transition-transform cursor-pointer"
            />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-wrap gap-10 items-start mt-10 w-full max-md:mt-10 max-md:max-w-full">
          {/* Products Column */}
          <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
            <h3 className="text-xl font-bold leading-none text-white">
              Продукция
            </h3>
            <nav className="flex flex-col mt-8 w-full text-base leading-snug text-gray-400">
              <div className="hover:text-hett-1 transition-colors cursor-pointer">
                Аккумуляторы
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Кузовные элементы
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Моторные и трансмиссионные масла
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Автомобильные диски и шины
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Запасные части для ходовой части
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Автомобильные аксессуары
              </div>
            </nav>
          </div>

          {/* Information Column */}
          <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
            <h3 className="text-xl font-bold leading-none text-white">
              Актуальная информация
            </h3>
            <nav className="flex flex-col mt-10 w-full text-base leading-snug text-gray-400">
              <div className="hover:text-hett-1 transition-colors cursor-pointer">
                О компании Hett Automotive
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Новости
              </div>
              <div className="mt-4 hover:text-hett-1 transition-colors cursor-pointer">
                Контактная информация
              </div>
            </nav>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-[240px]">
            <div className="flex flex-col justify-center w-full leading-tight">
              <div className="text-xl font-semibold text-gray-400 hover:text-hett-1 transition-colors cursor-pointer">
                8-936-003-80-43
              </div>
              <div className="mt-2.5 text-sm font-medium text-slate-50">
                Оптовый отдел
              </div>
            </div>
            <div className="flex flex-col justify-center mt-10 w-full leading-tight whitespace-nowrap">
              <div className="text-xl font-semibold text-gray-400 hover:text-hett-1 transition-colors cursor-pointer">
                info@protek-auto.ru
              </div>
              <div className="mt-2.5 text-sm font-medium text-slate-50">
                Почта
              </div>
            </div>
            <address className="flex flex-col justify-center mt-10 w-full not-italic">
              <div className="text-xl font-semibold leading-8 text-gray-400 hover:text-hett-1 transition-colors cursor-pointer">
                Москва, Походный проезд 4 стр1
              </div>
              <div className="flex gap-2.5 items-start self-start mt-2.5 text-sm leading-tight">
                <div className="font-medium text-slate-50">Адрес</div>
                <button className="font-bold text-hett-1 hover:text-green-500 transition-colors">
                  Показать на карте
                </button>
              </div>
            </address>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-wrap gap-10 justify-between items-center pt-10 mt-20 w-full text-base leading-relaxed text-gray-400 border-t border-gray-700 max-md:mt-10 max-md:max-w-full">
          <div className="self-stretch my-auto w-[630px] max-md:max-w-full hover:text-gray-300 transition-colors">
            © 2024 Hett Automotive, все права защищены
          </div>
          <nav className="flex gap-10 items-center self-stretch my-auto min-w-[240px]">
            <div className="self-stretch my-auto hover:text-hett-1 transition-colors cursor-pointer">
              Условия использования
            </div>
            <div className="self-stretch my-auto hover:text-hett-1 transition-colors cursor-pointer">
              Политика защиты данных
            </div>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
