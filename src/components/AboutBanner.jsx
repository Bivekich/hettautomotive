export default function AboutBanner({ title, subtitle }) {
  return (
    <section className="relative flex flex-col px-80 pt-60 pb-16 max-md:px-5 max-md:pt-24 min-h-[400px]">
      {/* Background Image */}
      <img
        loading="lazy"
        srcSet="/background_img.png"
        alt="About Banner Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-[950px]">
        <p className="text-2xl text-neutral-100">{subtitle}</p>
        <h1 className="mt-4 text-5xl font-bold leading-none text-neutral-100 max-md:text-4xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
