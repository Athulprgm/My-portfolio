import React, { memo } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

// Memoized contact card component for better performance
const ContactCard = memo(({ contact, index }) => (
  <motion.a
    href={contact.link}
    target={contact.link.startsWith("http") ? "_blank" : "_self"}
    rel={contact.link.startsWith("http") ? "noopener noreferrer" : ""}
    className="contact-card"
    style={{ "--contact-color": contact.color }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: index * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 15,
    }}
    whileHover={{
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    whileTap={{ scale: 0.98 }}
  >
    <i className={contact.icon}></i>
    <span>{contact.text}</span>
  </motion.a>
));

ContactCard.displayName = "ContactCard";

const Contact = () => {
  const contacts = [
    {
      icon: "fa-solid fa-envelope",
      text: "Email",
      link: "mailto:athulkrishna.cpd@gmail.com",
      color: "#e2857d",
    },
    {
      icon: "fa-brands fa-github",
      text: "GitHub",
      link: "https://github.com/Athulprgm",
      color: "#ffffff",
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
      color: "#e21a3f",
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
          // Let's connect and build something amazing
        </p>
      </div>

      <motion.div
        className="contact-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {contacts.map((contact, index) => (
          <ContactCard key={contact.text} contact={contact} index={index} />
        ))}
      </motion.div>

      <motion.div
        className="contact-footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <p className="footer-text">
          Open for opportunities • Remote-ready • Kerala, IN
        </p>
        <div className="status-badge">
          <span className="status-dot"></span>
          <span>Available for work</span>
        </div>
      </motion.div>

      {/* Minimal Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span>
            <i className="fa-solid fa-code-branch"></i> main
          </span>
          <span>
            <i className="fa-solid fa-circle-xmark"></i> 0
          </span>
          <span>
            <i className="fa-solid fa-triangle-exclamation"></i> 0
          </span>
        </div>
        <div className="status-center">
          <span>© 2025 Athul Krishna K</span>
        </div>
        <div className="status-right">
          <span>UTF-8</span>
          <span>React</span>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact);
