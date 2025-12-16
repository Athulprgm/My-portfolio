import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

// Custom hook for typing effect
const useTypingEffect = (toRotate, period) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(200);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [displayText, delta]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, displayText.length - 1)
      : fullText.substring(0, displayText.length + 1);

    setDisplayText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(200);
    } else {
      if (!isDeleting && delta === period) {
        setDelta(200);
      }
    }
  };

  return displayText;
};

const Home = () => {
  const profileRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  const toRotate = ["MERN Stack Developer"];
  const period = 2000;

  const displayText = useTypingEffect(toRotate, period);

  // Mouse parallax effect

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;

      const floats = document.querySelectorAll(".float-element");
      floats.forEach((float, index) => {
        const speed = (index + 1) * 0.5;
        float.style.transform = `translate(${moveX * speed}px, ${
          moveY * speed
        }px)`;
      });

      const photo = document.querySelector(".profile-photo");
      if (photo) {
        photo.style.transform = `perspective(1000px) rotateY(${
          moveX * 0.5
        }deg) rotateX(${moveY * -0.5}deg)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (profileRef.current) observer.observe(profileRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      if (profileRef.current) observer.unobserve(profileRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("project");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="profile-container" id="home" ref={containerRef}>
      <div className="profile-wrapper">
        <div className="profile-photo" ref={profileRef}>
          <div className="photo-glow"></div>
          <img
            className="image"
            src="/Gemini_Generated_Image_v750zhv750zhv750.png"
            alt="Profile"
            loading="lazy"
          />
          <div className="floating-elements">
            <div className="float-element float-1"></div>
            <div className="float-element float-2"></div>
            <div className="float-element float-3"></div>
            <div className="float-element float-4"></div>
          </div>
        </div>
        <div className="introduce code-window" ref={textRef}>
          <div className="window-header">
            <div className="dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="filename">
              <i className="fa-brands fa-react"></i>
              <span>Developer.jsx</span>
            </div>
          </div>

          <div className="window-content">
            <div className="code-line">
              <span className="line-num">1</span>
              <span className="keyword">const</span>{" "}
              <span className="variable">portfolio</span>{" "}
              <span className="operator">=</span>{" "}
              <span className="bracket">{"{"}</span>
            </div>

            <div className="code-line">
              <span className="line-num">2</span>
              <span className="indent"> </span>
              <span className="property">name</span>
              <span className="operator">:</span>{" "}
              <span className="string">"Athul Krishna K"</span>
              <span className="comma">,</span>
            </div>

            <div className="code-line">
              <span className="line-num">3</span>
              <span className="indent"> </span>
              <span className="property">title</span>
              <span className="operator">:</span>{" "}
              <span className="string">
                "<span className="typing-text">{displayText}</span>"
              </span>
              <span className="comma">,</span>
            </div>

            <div className="code-line">
              <span className="line-num">4</span>
              <span className="indent"> </span>
              <span className="comment">
                // Crafting scalable and user-centric web applications
              </span>
            </div>

            <div className="code-line">
              <span className="line-num">5</span>
              <span className="indent"> </span>
              <span className="property">stack</span>
              <span className="operator">:</span>{" "}
              <span className="bracket">[</span>
            </div>

            <div className="code-line">
              <span className="line-num">6</span>
              <span className="indent"> </span>
              <span className="string">"MongoDB"</span>
              <span className="comma">,</span>{" "}
              <span className="string">"Express"</span>
              <span className="comma">,</span>{" "}
              <span className="string">"React"</span>
              <span className="comma">,</span>{" "}
              <span className="string">"Node.js"</span>
            </div>

            <div className="code-line">
              <span className="line-num">7</span>
              <span className="indent"> </span>
              <span className="bracket">]</span>
            </div>

            <div className="code-line">
              <span className="line-num">8</span>
              <span className="bracket">{"}"}</span>
              <span className="semicolon">;</span>
            </div>

            <div className="code-line">
              <span className="line-num">9</span>
            </div>

            <div className="code-line">
              <span className="line-num">10</span>
              <span className="keyword">export default</span>{" "}
              <span className="variable">portfolio</span>
              <span className="semicolon">;</span>
            </div>
          </div>

          <div className="action-area">
            <button onClick={scrollToProjects} className="cta-button">
              <span className="button-text">Execute Portfolio</span>
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
