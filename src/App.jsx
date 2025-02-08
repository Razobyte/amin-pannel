import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Components/Admin";
import Register from "./AdminLoginPage/Register";
import Login from "./AdminLoginPage/Login";
import Home from "./ComponentsPage/Home";
import Services from "./ComponentsPage/Services";
import Industry from "./ComponentsPage/Industry";
import BannerPage from "./ComponentsPage/BannerPage";
import Clients from "./ComponentsPage/AboutPages/Clients";
import Blogs from "./ComponentsPage/AboutPages/Blogs";
import Videos from "./ComponentsPage/Videos";
import Healthcare from "./ComponentsPage/IndustryPages/Healthcare";
import IT from "./ComponentsPage/IndustryPages/IT"; 
import Portfolio from "./ComponentsPage/Portfolio";
import Testlmonials from "./ComponentsPage/Testlmonials";
import Design from "./ServicesPages/Design";
import Development from "./ServicesPages/Development";
import Marketing from "./ServicesPages/Marketing";
import GameDevlope from "./ServicesPages/GameDevlope";
import MobileApp from "./ServicesPages/MobileApp";
import Maintenance from "./ServicesPages/Maintenance";
import Ecommerce from "./ServicesPages/Ecommerce";
import AuthRoute from "./MainRoute/ProtectedRouting";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Routes>
    
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/login/admin" 
        element={
          <AuthRoute 
            element={<Admin />} 
            isAuthenticated={isAuthenticated} 
          />
        }
      />
      <Route path="/banner" element={<BannerPage />} />
      <Route path="/enquery" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/industry" element={<Industry />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/client" element={<Clients />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/porfolio" element={<Portfolio />} />
      <Route path="/health" element={<Healthcare />} />
      <Route path="/it" element={<IT />} />
      <Route path="/Testlmonials" element={<Testlmonials />} />
      <Route path="/services/design" element={<Design />} />
      <Route path="/services/development" element={<Development />} />
      <Route path="/services/marketing" element={<Marketing />} />
      <Route path="/services/gamedevelopment" element={<GameDevlope />} />
      <Route path="/services/mobileapps" element={<MobileApp />} />
      <Route path="/services/support" element={<Maintenance />} />
      <Route path="/services/e-commerce" element={<Ecommerce />} />
    </Routes>
  );
}

export default App;
