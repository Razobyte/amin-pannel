import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Admin from "../Components/Admin"; // Import Admin component
import Register from "../AdminLoginPage/Register";
import Login from "../AdminLoginPage/Login";
import Home from "../ComponentsPage/Home";
import Services from "../ComponentsPage/Services";
import Industry from "../ComponentsPage/Industry";
import BannerPage from "../ComponentsPage/BannerPage";
import Clients from "../ComponentsPage/AboutPages/Clients";
import Blogs from "../ComponentsPage/AboutPages/Blogs";
import Videos from "../ComponentsPage/Videos";
import Healthcare from "../ComponentsPage/IndustryPages/Healthcare";
import IT from "../ComponentsPage/IndustryPages/IT";
import Portfolio from "../ComponentsPage/Portfolio";
import Testlmonials from "../ComponentsPage/Testlmonials";
// import AuthRoute from "../PrivateRoute/AuthRoute"; // Uncomment and implement this if required

function MainRoute() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes (Require Authentication) */}
      {/* Uncomment the following line if you implement AuthRoute */}
      <Route >
        <Route path="/admin" element={<Admin />} />
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
      </Route>
    </Routes>
  );
}

export default MainRoute;
