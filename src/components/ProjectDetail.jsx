import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projectsData.find((p) => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    } else {
      // Handle not found if needed, or redirect
      navigate("/");
    }
  }, [id, navigate]);

  if (!project || !project.detailData) return null;

  const { detailData } = project;

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
        <button onClick={() => navigate("/")} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>
          <span>cd ..</span>
        </button>
        <div className="nav-actions">
          <button onClick={handlePrint} className="github-btn print-btn">
            <i className="fa-solid fa-file-pdf"></i>
            <span>Download PDF</span>
          </button>
          <a
            href={detailData.repoUrl}
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
              {detailData.heroTitle}{" "}
              <span className="highlight">{detailData.heroSubject}</span>
            </motion.h1>
            <p className="project-tagline">{detailData.tagline}</p>

            <div className="hero-stats">
              {detailData.stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                  <div className="stat-item">
                    <span className="stat-val">{stat.val}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  {idx < detailData.stats.length - 1 && (
                    <div className="stat-divider"></div>
                  )}
                </React.Fragment>
              ))}
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
              <p>{detailData.abstract}</p>
            </motion.section>

            {detailData.highlights && (
              <motion.section
                className="detail-block highlights"
                variants={itemVariants}
              >
                <h3>
                  <i className="fa-solid fa-star"></i> Featured Highlights
                </h3>
                <div className="highlights-stack">
                  {detailData.highlights.map((item, idx) => (
                    <div key={idx} className="highlight-item">
                      <div className="highlight-img-container">
                        <img src={item.image} alt={item.title} />
                        <span className="image-tag">{item.tag}</span>
                      </div>
                      <div className="highlight-text">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section
              className="detail-block gallery"
              variants={itemVariants}
            >
              <h3>
                <i className="fa-solid fa-images"></i> Interface Gallery
              </h3>
              <div className="gallery-grid">
                {detailData.gallery.map((img, index) => (
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
                {detailData.features.map((feature, idx) => (
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
                {detailData.technologies.map((tech, idx) => (
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
                {detailData.modules.map((mod, idx) => (
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
              <img src={detailData.gallery[selectedImage]} alt="Full view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetail;
