import React, { useState } from "react";
import ProjectDetail from "./ProjectDetail.jsx";
import "./Projects.css";

const Projects = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Exam Seat Arrangement System",
      description:
        "A comprehensive exam management system with automated seating allocation, real-time notifications, and navigation assistance. Built with Django backend and Flutter mobile app.",
      image:
        "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
      tags: ["Django", "Flutter", "PostgreSQL", "Python"],
      hasDetails: true,
    },
    {
      id: 2,
      title: "Static Webpages",
      description:
        "Beautiful and responsive static websites built with modern web technologies. Focus on clean design, optimal performance, and great user experience.",
      image:
        "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
      tags: ["HTML", "CSS", "JavaScript"],
      hasDetails: false,
    },
    {
      id: 3,
      title: "Calculator Web Application",
      description:
        "A fully functional calculator web application with modern UI/UX design. Features include basic arithmetic operations, memory functions, and responsive design.",
      image:
        "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
      tags: ["React", "JavaScript", "CSS"],
      hasDetails: false,
    },
  ];

  const handleProjectClick = (project) => {
    if (project.hasDetails) {
      setSelectedProject(project.id);
      // Scroll to project detail section
      setTimeout(() => {
        const detailSection = document.getElementById("project-detail");
        if (detailSection) {
          detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
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

      {selectedProject === 1 && (
        <div id="project-detail">
          <ProjectDetail onClose={() => setSelectedProject(null)} />
        </div>
      )}
    </>
  );
};

export default Projects;
