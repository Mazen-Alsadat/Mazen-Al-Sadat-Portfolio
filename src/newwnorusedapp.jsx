import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import SectionWrapper from "./components/SectionWrapper/SectionWrapper";
import "./styles/globals.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = document.querySelectorAll(".global-section-wrapper, #hero");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-container">
      {/* شريط التنقل العلوي المتزامن */}
      <Navbar activeSection={activeSection} />

      {/* قسم الهيرو */}
      <div id="hero">
        <Hero />
      </div>

      {/* قسم من نحن / About */}
      <SectionWrapper id="about">
        <About />
      </SectionWrapper>

      {/* قسم الأعمال / Portfolio */}
      <SectionWrapper id="work">
        <Portfolio />
      </SectionWrapper>

      {/* قسم التواصل / Contact */}
      <SectionWrapper id="contact">
        <Contact />
      </SectionWrapper>
    </div>
  );
}