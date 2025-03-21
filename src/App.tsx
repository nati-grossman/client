import React from "react";
import LanguageSwitcher from "./components/LanguageSwitcher";
// import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RoutesComponent from "./components/Routes/RoutesComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  //<Navigation />
  return (
    <>
      <div style={{ direction: "rtl" }}>
        <LanguageSwitcher />
        <BrowserRouter>
          <div className="main-content">
            <Header />
            <div className="container mt-4 nav-footer-spacing">
              <RoutesComponent />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;

/*
for nati : 
npm install --force
npm start
npm install react-bootstrap --legacy-peer-deps
*/
