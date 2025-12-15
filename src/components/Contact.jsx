import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [hoveredContact, setHoveredContact] = useState(null);

  const contacts = [
    {
      icon: "fa-solid fa-envelope",
      text: "Email",
      link: "mailto:athulkrishna.cpd@gmail.com",
      color: "#e2857dff",
    },
    {
      icon: "fa-brands fa-github",
      text: "GitHub",
      link: "https://github.com/Athulprgm",
      color: "#181717",
    },
    {
      icon: "fa-brands fa-linkedin",
      text: "LinkedIn",
      link: "https://www.linkedin.com/in/athul-krishna-k-1a7195361/",
      color: "#0A66C2",
    },
    {
      icon: "fa-solid fa-phone",
      text: "Phone",
      link: "tel:8590595077",
      color: "#25D366",
    },
    {
      icon: "fa-brands fa-instagram",
      text: "Instagram",
      link: "https://www.instagram.com/_athul_krishnaa/",
      color: "#e21a3fff",
    },
    {
      icon: "fa-brands fa-whatsapp",
      text: "WhatsApp",
      link: "https://wa.me/8590595077",
      color: "#25D366",
    },
  ];

  return (
    <section className="contact-container" id="contact">
      <div className="section-header">
        <h1 className="section-heading">
          <span className="heading-line"></span>
          <span className="heading-text">&lt;GetInTouch /&gt;</span>
          <span className="heading-line"></span>
        </h1>
        <p className="section-subtitle">
          // Let's connect and build something amazing together
        </p>
      </div>

      <div className="contact-details">
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.link}
            target={contact.link.startsWith("http") ? "_blank" : "_self"}
            rel={contact.link.startsWith("http") ? "noopener noreferrer" : ""}
            className={`contact-card ${
              hoveredContact === index ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredContact(index)}
            onMouseLeave={() => setHoveredContact(null)}
            style={{ "--contact-color": contact.color }}
          >
            <div className="contact-icon-wrapper">
              <i className={contact.icon}></i>
            </div>
            <span className="contact-text">{contact.text}</span>
            <div className="contact-ripple"></div>
          </a>
        ))}
      </div>

      <div className="contact-info-container">
        <div className="info-column">
          <h3 className="info-title">// Context</h3>
          <p className="info-text">
            Building scalable web interfaces and backend systems with the MERN
            stack. Focused on clean architecture and performance.
          </p>
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span>Available for freelance & full-time</span>
          </div>
          <p className="location-text">
            <i className="fa-solid fa-location-dot"></i> Kerala, IN /
            Remote-ready
          </p>
        </div>

        <div className="info-column">
          <h3 className="info-title">// Workflow</h3>
          <ul className="workflow-list">
            <li>
              <span className="step-num">01.</span> Connect & Scope
            </li>
            <li>
              <span className="step-num">02.</span> Build & Iterate
            </li>
            <li>
              <span className="step-num">03.</span> Ship & Support
            </li>
          </ul>
        </div>

        <div className="info-column">
          <h3 className="info-title">// Credibility</h3>
          <p className="info-text">
            Active in open-source. Consistently shipping real-world projects to
            GitHub. Always learning modern patterns.
          </p>
          <p className="response-time">
            <i className="fa-regular fa-clock"></i> Response time: &lt; 24h
          </p>
        </div>
      </div>

      <div className="closing-cta">
        <span>Let's build something better.</span>
      </div>

      <div className="status-bar">
        <div className="status-bar-left">
          <div className="status-item git-branch">
            <i className="fa-solid fa-code-branch"></i>
            <span>main*</span>
          </div>
          <div className="status-item sync-icon">
            <i className="fa-solid fa-arrows-rotate"></i>
          </div>
          <div className="status-item error-warning">
            <span>
              <i className="fa-solid fa-circle-xmark"></i> 0
            </span>
            <span>
              <i className="fa-solid fa-triangle-exclamation"></i> 0
            </span>
          </div>
        </div>

        <div className="status-bar-center">
          <span>&copy; 2025 Athul Krishna K</span>
        </div>

        <div className="status-bar-right">
          <div className="status-item">
            <span>Ln 2025, Col 12</span>
          </div>
          <div className="status-item">
            <span>UTF-8</span>
          </div>
          <div className="status-item">
            <span>JavaScript React</span>
          </div>
          <div className="status-item feedback">
            <i className="fa-regular fa-bell"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
