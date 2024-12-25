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
import Catalog from "./components/Catalog";
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
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <AboutUs />
                  <Production />
                  <Advantages />
                  <Geography />
                  <News />
                  <Products />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <AboutBanner
                    title="О компании Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <AboutUs />
                  <WhereToBuy />
                  <YandexMap />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                  <AboutBanner
                    title="Продукция Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <ProductionMore />
                  <SEOtext />
                  <WhereToBuy />
                  <YandexMap />
                </>
              }
            />
            <Route
              path="/news"
              element={
                <>
                  <AboutBanner
                    title="Новости компании Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <NewsPage />
                  <YandexMap />
                </>
              }
            />
            <Route
              path="/contacts"
              element={
                <>
                  <AboutBanner
                    title="Контактная информация"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <ContactPage />
                  <ContactForm />
                </>
              }
            />
            <Route
              path="/search"
              element={
                <>
                  <AboutBanner
                    title="Аккумуляторы Hett Automotive"
                    subtitle="Подзаголовок для краткой информации"
                  />
                  <YandexMap />
                </>
              }
            />
            <Route
              path="/catalog"
              element={
                <>
                  <Catalog />
                </>
              }
            />
          </Routes>
          <Footer />
        </Router>
      )}
    </AnimatePresence>
  );
}

export default App;
