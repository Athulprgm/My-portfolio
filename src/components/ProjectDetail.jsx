import React, { useState } from "react";
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
    { name: "FrontEnd", stack: "HTML, CSS, JavaScript" },
    { name: "BackEnd", stack: "Python, Django" },
    { name: "Database", stack: "PostgreSQL" },
    { name: "Mobile App", stack: "Flutter" },
  ];

  const features = [
    "Automated Seating Allocation – Automatically assigns students to exam halls and seats based on subject, branch, and room capacity.",
    "Centralized Database Management – Stores student details like name, roll number, branch, year, semester, and subjects securely.",
    "Multi-User Access – Provides separate login portals for Admin, Teachers, and Students with specific functionalities.",
    "Exam Schedule Notifications – Sends real-time alerts and updates about upcoming exams and seating details.",
    "Room Navigation Assistance – Helps students locate their assigned examination halls easily.",
    "Teacher Dashboard – Allows teachers to view allocated exam halls and monitor seating arrangements efficiently.",
    "Admin Control Panel – Enables administrators to manage exams, assign teachers, and oversee all system activities.",
    "Error Reduction & Efficiency – Reduces manual workload, minimizes errors, and improves overall exam management speed.",
    "Cross-Platform Compatibility – Built using Django for web and Flutter for mobile, ensuring smooth access across devices.",
  ];

  const modules = [
    {
      title: "Admin Module",
      items: [
        "Secure login for admin.",
        "Automated exam seating and teacher management.",
        "Handles schedules and room allocation.",
      ],
    },
    {
      title: "Teacher Module",
      items: [
        "Login to view assigned exam halls.",
        "Assist and monitor student seating.",
      ],
    },
    {
      title: "Student Module",
      items: [
        "Login to view schedule and seating.",
        "Get exam alerts and room navigation.",
      ],
    },
    {
      title: "Navigation Module",
      items: [
        "Helps students find their exam halls easily.",
        "Provides real-time navigation support.",
      ],
    },
  ];

  return (
    <div className="project-detail-container">
      {onClose && (
        <button onClick={onClose} className="back-button">
          <i className="fa-solid fa-arrow-left"></i>
          <span>cd ../</span>
        </button>
      )}

      {/* ... keeping other parts mostly similar, but can update header text if needed ... */}

      <div className="detail-header">
        <h1 className="project-title">Exam Seating Arrangement System</h1>
        <p className="project-subtitle">
          // A comprehensive exam management solution
        </p>
      </div>

      <div className="detail-content">
        <div className="detail-section abstract-section">
          <div className="section-card">
            <h2 className="section-title">
              <i className="fa-solid fa-file-lines"></i>
              Abstract
            </h2>
            <p className="project-abstract">
              Exam Seating Arrangement with Navigation System is a smart
              solution designed to simplify and automate the process of
              allocating exam halls and guiding students to their assigned
              seats. The system eliminates the manual effort involved in
              planning, managing, and locating exam seats by providing a unified
              platform accessible via both web and mobile interfaces.
            </p>
          </div>
        </div>

        <div className="detail-section tech-section">
          <div className="section-card">
            <h2 className="section-title">
              <i className="fa-solid fa-code"></i>
              Technologies Used
            </h2>
            <div className="tech-grid">
              {technologies.map((tech, index) => (
                <div key={index} className="tech-item">
                  <span className="tech-label">{tech.name}</span>
                  <span className="tech-value">{tech.stack}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-section features-section">
          <div className="section-card">
            <h2 className="section-title">
              <i className="fa-solid fa-star"></i>
              Key Features
            </h2>
            <ol className="features-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="detail-section modules-section">
          <div className="section-card">
            <h2 className="section-title">
              <i className="fa-solid fa-sitemap"></i>
              System Modules
            </h2>
            <div className="modules-grid">
              {modules.map((module, index) => (
                <div key={index} className="module-card">
                  <h3 className="module-title">{module.title}</h3>
                  <ul className="module-items">
                    {module.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-section gallery-section">
          <h2 className="section-title">
            <i className="fa-solid fa-images"></i>
            Project Screenshots
          </h2>
          <div className="gallery">
            {projectImages.map((img, index) => (
              <div
                key={index}
                className={`gallery-item ${index === 3 ? "portrait" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`Project screenshot ${index + 1}`} />
                <div className="gallery-overlay">
                  <i className="fa-solid fa-expand"></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section github-section">
          <a
            className="github-link"
            href="https://github.com/Athulprgm/Xsitz2.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
            <span>git remote show origin</span>
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="image-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedImage(null)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img
              src={projectImages[selectedImage]}
              alt={`Full view ${selectedImage + 1}`}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
