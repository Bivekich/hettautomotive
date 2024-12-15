export default function YandexMap() {
  return (
    <div className="w-full overflow-hidden mt-20">
      <h1 className="text-4xl ml-[320px] font-bold leading-none text-black max-md:max-w-full mb-8">
        Магазин на карте
      </h1>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A6d38c6c66e895056c2d30cee5b28604470ed7b83e2df1c1c96b722edff797552&amp;source=constructor"
        width="1920"
        height="540"
        frameBorder="0"
        title="Hett Automotive Map"
        className="w-full"
      />
    </div>
  );
}
