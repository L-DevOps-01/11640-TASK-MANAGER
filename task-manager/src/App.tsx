import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa tus componentes
import Home from "./pages/home/home";
import About from "./pages/about/about";
import NotFound from "./pages/not-found/not-found";
import NavBar from "./components/nav-bar/nav-bar";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta 404 */}
      </Routes>
    </Router>
  );
};

export default App;
