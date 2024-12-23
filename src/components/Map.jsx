export default function YandexMap() {
  return (
    <div className="flex overflow-hidden flex-col px-80 max-md:px-5">
      <h1 className="text-4xl font-bold leading-none text-black max-md:max-w-full">
        Магазин на карте
      </h1>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A6d38c6c66e895056c2d30cee5b28604470ed7b83e2df1c1c96b722edff797552&amp;source=constructor"
        width="100%"
        height="500"
        frameBorder="0"
        title="Hett Automotive Map"
        className="mt-10 w-full"
      />
    </div>
  );
}
