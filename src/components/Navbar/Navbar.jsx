import "./Navbar.css";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav">
        <a
          href={`${import.meta.env.BASE_URL}#top`}
          onClick={handleLogoClick}
          className="logo"
          aria-label="Mazen Logo"
        ></a>

        <nav className={open ? "active" : ""}>
          <a href="#work" onClick={() => setOpen(false)}>
            Work
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>
          <a
            href="https://drive.google.com/file/d/1IIgvVeNRXt3yuknS09t5czd8H7U7N1kE/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mobile-cv-link"
          >
            Resume / CV ↗
          </a>
        </nav>

        <div className="nav-actions">
          <a
            href="https://drive.google.com/drive/u/0/folders/12z3mJJzZhXKoeGaHMDeE8uY5ZKE-sv-P"
            target="_blank"
            rel="noreferrer"
            className="secondary-btn"
          >
            More Projects ↗
          </a>

          <a
            href="https://drive.google.com/file/d/1IIgvVeNRXt3yuknS09t5czd8H7U7N1kE/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="secondary-btn desktop-cv-btn"
          >
            CV / Resume ↗
          </a>

          <a
            href="https://wa.me/201111958142"
            target="_blank"
            rel="noreferrer"
            className="cta"
          >
            Let's Talk
          </a>

          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
