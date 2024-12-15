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
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
