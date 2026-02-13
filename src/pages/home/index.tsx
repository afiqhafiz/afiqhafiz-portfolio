import React from "react";
import Hero from "./components/hero";
import About from "./components/features";
import Experience from "./components/experience";
import Contact from "./components/contact";

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Contact />
    </>
  );
};

export default LandingPage;
