import React, { useState, useEffect, useRef } from "react";
import "./About.css";

const education = [
  {
    title: "Higher Secondary (VHSE)",
    school: "KMVHSE Kodakkad, Kasargod",
    department: "Science",
    subject: "Junior Software Development",
    icon: "fa-graduation-cap",
  },
  {
    title: "Under Graduation",
    school: "IHRD Cas Cheemeni, Kasargod",
    department: "BSc",
    subject: "Computer Science",
    icon: "fa-university",
  },
  {
    title: "Skill Course",
    school: "Techmindz Kochi, Kerala",
    department: "Fullstack Development",
    subject: "MERN Stack",
    icon: "fa-code",
  },
];

const technologies = [
  { name: "HTML", color: "#E34F26", icon: "fa-brands fa-html5" },
  { name: "CSS", color: "#1572B6", icon: "fa-brands fa-css3-alt" },
  { name: "JavaScript", color: "#F7DF1E", icon: "fa-brands fa-js" },
  { name: "React", color: "#61DAFB", icon: "fa-brands fa-react" },
  { name: "Node.js", color: "#339933", icon: "fa-brands fa-node" },
  { name: "Express", color: "#000000", icon: "fa-server" },
  { name: "MongoDB", color: "#47A248", icon: "fa-database" },
  { name: "Bootstrap", color: "#7952B3", icon: "fa-brands fa-bootstrap" },
  { name: "Python", color: "#3776AB", icon: "fa-brands fa-python" },
  { name: "Django", color: "#092E20", icon: "fa-brands fa-django" },
];

const About = () => {
  const [isTechVisible, setIsTechVisible] = useState(false);
  const techRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTechVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (techRef.current) observer.observe(techRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="education-container" id="about">
      <div className="about">
        <div className="section-header">
          <h1 className="section-heading">
            <span className="heading-line"></span>
            <span className="heading-text">
              &lt;Education &amp; Skills /&gt;
            </span>
            <span className="heading-line"></span>
          </h1>
        </div>

        <div className="qualification">
          {education.map((edu, index) => (
            <div key={index} className="card-education">
              <div className="edu-icon">
                <i className={`fa-solid ${edu.icon}`}></i>
              </div>
              <div className="edu-content">
                <h4>{edu.title}</h4>
                <div className="edu-details">
                  <p>
                    <i className="fa-solid fa-building"></i> {edu.school}
                  </p>
                  <p>
                    <i className="fa-solid fa-book"></i> {edu.department}
                  </p>
                  <p>
                    <i className="fa-solid fa-code"></i> {edu.subject}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card-technology" ref={techRef}>
          <h4 className="tech-heading">
            <span className="comment-style">// Technologies & Tools</span>
          </h4>
          <div className="tech-box">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className={`tech ${isTechVisible ? "visible" : ""}`}
                style={{
                  "--tech-color": tech.color,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <i className={tech.icon}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
