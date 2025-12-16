import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProjectDetail.css";

const ProjectDetail = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const projectImages = [
    "/project-img/Screenshot 2025-10-31 182323.png",
    "/project-img/Screenshot 2025-10-31 182349.png",
    "/project-img/Screenshot 2025-10-31 182448.png",
    "/project-img/Screenshot 2025-10-31 182506.png",
  ];

  const technologies = [
    {
      name: "Frontend",
      stack: "HTML, CSS, JavaScript",
      icon: "fa-brands fa-js",
    },
    { name: "Backend", stack: "Python, Django", icon: "fa-brands fa-python" },
    { name: "Database", stack: "PostgreSQL", icon: "fa-solid fa-database" },
    { name: "Mobile", stack: "Flutter", icon: "fa-brands fa-android" },
  ];

  const features = [
    {
      title: "Automated Allocation",
      desc: "Smart algorithms to assign students to halls based on capacity and branch.",
    },
    {
      title: "Centralized DB",
      desc: "Securely stores student, exam, and seating data.",
    },
    {
      title: "Role-Based Access",
      desc: "Distinct portals for Admins, Teachers, and Students.",
    },
    {
      title: "Real-time Alerts",
      desc: "Instant notifications for exam schedules and room numbers.",
    },
    {
      title: "Room Navigation",
      desc: "Visual guides to help students locate exam halls.",
    },
    {
      title: "Cross-Platform",
      desc: "Seamless experience on web and mobile devices.",
    },
  ];

  const modules = [
    {
      title: "Admin",
      items: ["Manage Schedules", "Allocate Rooms", "Teacher Assignment"],
    },
    {
      title: "Teacher",
      items: ["View Assignments", "Monitor Seating", "Report Issues"],
    },
    {
      title: "Student",
      items: ["Check Schedule", "Find Seat", "Get Notifications"],
    },
    {
      title: "Navigation",
      items: ["Room Locator", "Campus Map", "Real-time Directions"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50 },
    },
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      className="project-detail-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Navigation */}
      <div className="detail-nav no-print">
        {onClose && (
          <button onClick={onClose} className="back-button">
            <i className="fa-solid fa-arrow-left"></i>
            <span>cd ..</span>
          </button>
        )}
        <div className="nav-actions">
          <button onClick={handlePrint} className="github-btn print-btn">
            <i className="fa-solid fa-file-pdf"></i>
            <span>Download PDF</span>
          </button>
          <a
            href="https://github.com/Athulprgm/Xsitz2.git"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            <i className="fa-brands fa-github"></i>
            <span>Repo</span>
          </a>
        </div>
      </div>

      <div className="detail-scroll-container">
        {/* Hero Section */}
        <motion.div className="project-hero" variants={itemVariants}>
          <div className="hero-content">
            <motion.h1 className="project-title" layoutId="project-title">
              Exam Seating <span className="highlight">System</span>
            </motion.h1>
            <p className="project-tagline">
              // Automated Management & Navigation Solution
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-val">Full Stack</span>
                <span className="stat-label">Architecture</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">Cross-Platform</span>
                <span className="stat-label">Web & Mobile</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-val">Real-time</span>
                <span className="stat-label">Updates</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* content grid */}
        <div className="content-grid">
          {/* Left Column */}
          <div className="main-content">
            <motion.section
              className="detail-block abstract"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-align-left"></i> Abstract
              </h3>
              <p>
                The Exam Seating Arrangement System aims to revolutionize how
                institutions manage examinations. By replacing manual allocation
                with intelligent automation, it eliminates errors and saves
                valuable administrative time. The integrated mobile app ensures
                students can easily find their seats and navigate to exam halls
                without confusion.
              </p>
            </motion.section>

            <motion.section
              className="detail-block gallery"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-images"></i> Interface Gallery
              </h3>
              <div className="gallery-grid">
                {projectImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="gallery-card"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`Screen ${index + 1}`} loading="lazy" />
                    <div className="overlay">
                      <i className="fa-solid fa-maximize"></i>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="detail-block features"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-bolt"></i> Key Features
              </h3>
              <div className="features-grid">
                {features.map((feature, idx) => (
                  <div key={idx} className="feature-card">
                    <div className="feature-icon">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <div className="feature-info">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="side-content">
            <motion.section
              className="detail-block tech-stack"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-layer-group"></i> Tech Stack
              </h3>
              <div className="tech-list">
                {technologies.map((tech, idx) => (
                  <div key={idx} className="tech-row">
                    <div className="tech-icon">
                      <i className={tech.icon}></i>
                    </div>
                    <div className="tech-details">
                      <span className="tech-name">{tech.name}</span>
                      <span className="tech-val">{tech.stack}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="detail-block modules"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-cubes"></i> System Modules
              </h3>
              <div className="modules-list">
                {modules.map((mod, idx) => (
                  <div key={idx} className="module-item">
                    <h4>{mod.title}</h4>
                    <ul>
                      {mod.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <img src={projectImages[selectedImage]} alt="Full view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;
