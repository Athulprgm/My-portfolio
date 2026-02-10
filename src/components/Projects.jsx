import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "../data/projectsData";
import "./Projects.css";

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const projects = projectsData;

  const handleProjectClick = (project) => {
    if (project.hasDetails) {
      navigate(`/project/${project.id}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <section className="project-container" id="project">
        <div className="section-header">
          <h1 className="section-heading">
            <span className="heading-line"></span>
            <span className="heading-text">&lt;Featured Projects /&gt;</span>
            <span className="heading-line"></span>
          </h1>
          <p className="section-subtitle">
            // Showcasing my latest work and creative solutions
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${
                hoveredCard === project.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-image-wrapper">
                <img
                  className="project-img"
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                {project.id === 4 && (
                  <div className="status-badge">
                    <span className="dot"></span>
                    AI Engine Active
                  </div>
                )}
                <div className="card-overlay"></div>
                <div className="card-glow"></div>
              </div>

              <div className="card-content">
                <div className="card-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="project-heading">{project.title}</h3>
                <p className="project-details">{project.description}</p>

                <button
                  onClick={() => handleProjectClick(project)}
                  className="project-link"
                  disabled={!project.hasDetails}
                >
                  <span>
                    {project.hasDetails
                      ? "$ git checkout details"
                      : "$ npm install soon"}
                  </span>
                  {project.hasDetails && (
                    <i className="fa-solid fa-terminal"></i>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Projects;
