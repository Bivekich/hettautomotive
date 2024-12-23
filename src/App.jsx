import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Production from "./components/Production";
import Advantages from "./components/Advantages";
import Geography from "./components/Geography";
import News from "./components/News";
import Products from "./components/Products";
import Banner from "./components/Banner";
import AboutBanner from "./components/AboutBanner";
import YandexMap from "./components/Map";
import WhereToBuy from "./components/WhereToBuy";
import SEOtext from "./components/SEOtext";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import ProductionMore from "./components/ProductionMore";
import NewsPage from "./components/NewsPage";
import ContactPage from "./components/ContactPage";
import ContactForm from "./components/ContactForm";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <Header />
                  <Banner />
                  <AboutUs />
                  <Production />
                  <Advantages />
                  <Geography />
                  <News />
                  <Products />
                  <Footer />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Header />
                  <AboutBanner
                    title="О компании Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <AboutUs />
                  <WhereToBuy />
                  <YandexMap />
                  <Footer />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <Header />
                  <AboutBanner
                    title="Продукция Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <ProductionMore />
                  <SEOtext />
                  <WhereToBuy />
                  <YandexMap />
                  <Footer />
                </>
              }
            />{" "}
            <Route
              path="/news"
              element={
                <>
                  <Header />
                  <AboutBanner
                    title="Новости компании Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <NewsPage />
                  <YandexMap />
                  <Footer />
                </>
              }
            />
            <Route
              path="/contacts"
              element={
                <>
                  <Header />
                  <AboutBanner
                    title="Контактная информация"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <ContactPage />
                  <ContactForm />
                  <Footer />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <Header />
                  <AboutBanner
                    title="Аккумуляторы Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <YandexMap />
                  <Footer />
                </>
              }
            />
          </Routes>
        </Router>
      )}
    </AnimatePresence>
  );
}

export default App;
