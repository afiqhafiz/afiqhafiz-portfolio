import React, { useState, useEffect } from "react";
import NavBar from "../navBar";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-strong py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl lg:text-2xl font-bold group cursor-pointer"
        >
          <span className="gradient-text">Afiq</span>
          <span className="text-white group-hover:text-primary-400 transition-colors">.</span>
          <span className="text-gray-400 text-sm font-normal ml-2 hidden sm:inline">dev</span>
        </a>

        {/* Navigation */}
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
