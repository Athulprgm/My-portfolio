import { useState, useEffect } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const resumeUrl = `${import.meta.env.BASE_URL}Athul_Krishna_Resume.pdf`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "project", "about", "contact"];
      // Adjust offset for better detection
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      closeMenu();
    }
  };

  return (
    <nav className={`nav-bar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <h1 className="heading">
          <a
            href="#home"
            className="logo-link"
            onClick={() => scrollToSection("home")}
          >
            <span className="logo-text">AthulKrishna</span>
            <span className="logo-dot">.Online</span>
          </a>
        </h1>

        <ul className="nav-content">
          {["home", "project", "about", "contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={activeSection === item ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
          <li className="download-li">
            <a
              href={resumeUrl}
              download="Athul_Krishna_Resume.pdf"
              className="resume-btn"
            >
              <i className="fa-solid fa-cloud-arrow-down"></i> Resume
            </a>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="mobile-toggle" onClick={toggleMenu}>
          <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {["home", "project", "about", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={activeSection === item ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item);
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          <a
            href={resumeUrl}
            download="Athul_Krishna_Resume.pdf"
            className="resume-btn-mobile"
          >
            <i className="fa-solid fa-cloud-arrow-down"></i> Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
