import React, { useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  // { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(href.replace("#", ""));
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavClick(item.href)}
            className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
              activeSection === item.href.replace("#", "")
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {activeSection === item.href.replace("#", "") && (
              <span className="absolute inset-0 bg-primary-500/20 rounded-lg" />
            )}
            <span className="relative">
              <span className="text-primary-400 mr-1">#</span>
              {item.label}
            </span>
          </button>
        ))}
        <a
          href="/assets/resume.pdf"
          download="AfiqHafiz_Resume.pdf"
          className="ml-4 px-5 py-2 text-sm font-semibold btn-primary rounded-lg text-white"
        >
          Resume
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${
              isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 origin-left ${
              isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-72 bg-dark-800 border-l border-white/10 p-6 pt-20 transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-4 py-3 text-lg font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className="text-primary-400 mr-2">#</span>
                {item.label}
              </button>
            ))}
            <a
              href="/assets/resume.pdf"
              download="AfiqHafiz_Resume.pdf"
              className="mt-4 px-4 py-3 text-center font-semibold btn-primary rounded-lg text-white"
            >
              Download Resume
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
