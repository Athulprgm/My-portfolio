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
  const [isSwinging, setIsSwinging] = useState(false);

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
        {/* Interactive ID Card Section */}
        <div className="id-card-container" ref={profileRef}>
          {/* Minimal Design */}
          <div className="id-card-face id-card-front">
            <div className="id-bg-accent"></div>
            <div className="id-header">
              <span className="company-name">TRAWBIT TECHNOLOGIES</span>
              <div className="id-status">
                <span className="status-dot"></span>
                <span className="status-text">ACTIVE</span>
              </div>
            </div>
            <div className="id-photo-wrapper">
              <img
                className="id-photo"
                src="/profile.png"
                alt="Profile"
                loading="lazy"
              />
            </div>
            <div className="id-details">
              <h2 className="id-name">Athul Krishna K</h2>
              <div className="id-info-grid">
                <div className="info-item">
                  <span className="label">DESIGNATION</span>
                  <span className="value">MERN Stack Developer</span>
                </div>
                <div className="info-item">
                  <span className="label">DOMAIN</span>
                  <span className="value">Web Development</span>
                </div>
                <div className="info-item">
                  <span className="label">LOCATION</span>
                  <span className="value">Kerala, India</span>
                </div>
              </div>
            </div>
            <div className="id-footer">
              <div className="id-barcode"></div>
              <span className="id-code">ID: TRAWBIT-DEV-01</span>
            </div>
          </div>
        </div>

        {/* Modernized Code Window */}
        <div className="introduce code-window" ref={textRef}>
          <div className="window-header">
            <div className="window-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
            <div className="tab-bar">
              <div className="tab active">
                <i className="fa-brands fa-react"></i>
                <span>Portal.jsx</span>
                <i className="fa-solid fa-xmark close-tab"></i>
              </div>
              <div className="tab">
                <i className="fa-brands fa-css3-alt"></i>
                <span>style.css</span>
              </div>
            </div>
          </div>

          <div className="window-content">
            <div className="code-editor">
              <div className="code-line">
                <span className="line-num">1</span>
                <span className="keyword">class</span>{" "}
                <span className="class-name">Architect</span>{" "}
                <span className="keyword">extends</span>{" "}
                <span className="class-name">FullStackDev</span>{" "}
                <span className="bracket">{`{`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">2</span>
                <span className="indent"></span>
                <span className="keyword">constructor</span>
                <span className="bracket">()</span>{" "}
                <span className="bracket">{`{`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">3</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="keyword">super</span>
                <span className="bracket">()</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">4</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="this">this</span>
                <span className="operator">.</span>
                <span className="prop">stack</span>{" "}
                <span className="operator">=</span>{" "}
                <span className="bracket">[</span>
                <span className="string">"MERN"</span>
                <span className="comma">,</span>{" "}
                <span className="string">"AWS"</span>
                <span className="bracket">]</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">5</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="this">this</span>
                <span className="operator">.</span>
                <span className="prop">focus</span>{" "}
                <span className="operator">=</span>{" "}
                <span className="string">"Scalable Architecture"</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">6</span>
                <span className="indent"></span>
                <span className="bracket">{`}`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">7</span>
                <span className="indent"></span>
                <span className="keyword">async</span>{" "}
                <span className="function">deploy</span>
                <span className="bracket">()</span>{" "}
                <span className="bracket">{`{`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">8</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="keyword">await</span>{" "}
                <span className="function">build</span>
                <span className="bracket">({`{`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">9</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="prop">performance</span>
                <span className="operator">:</span>{" "}
                <span className="string">"Optimized"</span>
                <span className="comma">,</span>
              </div>

              <div className="code-line">
                <span className="line-num">10</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="bracket">{`}`}</span>
                <span className="bracket">)</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">11</span>
                <span className="indent"></span>
                <span className="bracket">{`}`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">12</span>
                <span className="bracket">{`}`}</span>
              </div>
            </div>
          </div>

          <div className="action-area">
            <button onClick={scrollToProjects} className="cta-button">
              <span className="button-text">./initialize_portfolio</span>
              <i className="fa-solid fa-terminal"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
