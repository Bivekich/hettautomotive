import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import Production from "./components/Production";
import Advantages from "./components/Advantages";
import Geography from "./components/Geography";
import News from "./components/News";
import Banner from "./components/Banner";
import AboutBanner from "./components/AboutBanner";
import YandexMap from "./components/Map";
import WhereToBuy from "./components/WhereToBuy";
import SEOtext from "./components/SEOtext";
import CustomPage from "./components/CustomPage";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Catalog from "./components/Catalog";
import ProductionMore from "./components/ProductionMore";
import ProductInfo from "./components/ProductInfo";
import ContactPage from "./components/ContactPage";
import Container from "./components/Container";
import NewsCatalog from "./components/NewsCatalog";
import NewsArticle from "./components/NewsArticle";
import { getCatalogProduct, getSeoBySlug } from "./services/api";
import LoadingProvider from "./components/LoadingProvider";
import { usePageTitle } from "./hooks/usePageTitle";
import Products from "./components/Products";
import SEO from "./components/SEO";

// SEO wrapper component
const PageSEO = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const slug =
          location.pathname === "/" ? "home" : location.pathname.slice(1);

        // First try to get custom page data
        const customPageResponse = await getSeoBySlug(slug);
        if (customPageResponse.data?.[0]) {
          setSeoData({
            metaTitle: customPageResponse.data[0].title,
            metaDescription: customPageResponse.data[0].content,
            metaImage: customPageResponse.data[0].coverImage,
            metaRobots: "index,follow",
            canonicalURL: `${window.location.origin}${location.pathname}`,
          });
          return;
        }

        // If no custom page, try to get regular SEO data
        const response = await fetch(
          `${import.meta.env.VITE_STRAPI_API_URL}/api/seo/${slug}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        if (data?.data?.attributes?.seoData) {
          setSeoData(data.data.attributes.seoData);
        }
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSEO();
  }, [location.pathname]);

  if (!seoData) return null;

  return (
    <SEO
      metaTitle={seoData.metaTitle}
      metaDescription={seoData.metaDescription}
      metaImage={seoData.metaImage}
      metaRobots={seoData.metaRobots || "index,follow"}
      metaViewport={seoData.metaViewport}
      canonicalURL={seoData.canonicalURL}
      keywords={seoData.keywords}
      structuredData={seoData.structuredData}
    />
  );
};

// Page wrapper components
const HomePage = () => {
  usePageTitle("Главная");
  return (
    <>
      <Banner />
      <Container>
        <AboutUs />
        <Production />
        <Advantages />
        <Geography />
        <News />
        <Products />
      </Container>
    </>
  );
};

const AboutPage = () => {
  usePageTitle("О компании");
  return (
    <>
      <AboutBanner page="about" />
      <Container>
        <AboutUs />
        <YandexMap />
      </Container>
    </>
  );
};

const ProductsPage = () => {
  usePageTitle("Продукция");
  return (
    <>
      <AboutBanner page="products" />
      <Container>
        <ProductionMore />
        <SEOtext />
        <WhereToBuy />
        <YandexMap />
      </Container>
    </>
  );
};

const NewsListPage = () => {
  usePageTitle("Новости");
  return (
    <>
      <AboutBanner page="news" />
      <Container>
        <NewsCatalog />
        <YandexMap />
      </Container>
    </>
  );
};

const ContactsPage = () => {
  usePageTitle("Контакты");
  return (
    <>
      <AboutBanner page="contacts" />
      <Container>
        <ContactPage />
      </Container>
    </>
  );
};

const CatalogPage = () => {
  usePageTitle("Каталог");
  return (
    <Container>
      <Catalog />
    </Container>
  );
};

// Wrapper component for product route
const ProductRoute = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getCatalogProduct(slug);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  usePageTitle(product?.name || "Продукт");

  return (
    <>
      <AboutBanner
        title="Продукция Hett Automotive"
        subtitle={product?.name || "Загрузка..."}
      />
      <ProductInfo />
    </>
  );
};

const NewsArticlePage = () => {
  usePageTitle("Новость");
  return <NewsArticle />;
};

function AppContent() {
  return (
    <>
      <PageSEO />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/product/:slug"
          element={
            <Container>
              <ProductRoute />
              <WhereToBuy />
              <YandexMap />
            </Container>
          }
        />
        <Route path="/news" element={<NewsListPage />} />
        <Route path="/news/:slug" element={<NewsArticlePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/catalog/:categorySlug?" element={<CatalogPage />} />
        <Route path="/:slug" element={<CustomPage />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </Router>
  );
}

export default App;
