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
  const [isFlipped, setIsFlipped] = useState(false);

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
        {/* Interactive ID Card Section */}
        <div
          className="id-card-container"
          ref={profileRef}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`id-card-inner ${isFlipped ? "flipped" : ""}`}>
            {/* Front Side */}
            <div className="id-card-face id-card-front">
              <div className="id-header">
                <span className="company-name">TRAWBIT TECHNOLOGIES</span>
                <i className="fa-solid fa-microchip id-icon"></i>
              </div>
              <div className="id-photo-wrapper">
                <img
                  className="id-photo"
                  src="/Gemini_Generated_Image_v750zhv750zhv750.png"
                  alt="Profile"
                  loading="lazy"
                />
              </div>
              <div className="id-details">
                <h2 className="id-name">Athul Krishna K</h2>
                <div className="id-badges">
                  <span className="badge">ENGINEER</span>
                  <span className="badge">FULL STACK</span>
                </div>
                <div className="id-role-container">
                  <span className="role-label-small">ROLE DESIGNATION</span>
                  <span className="role-value-large typing-text">
                    {displayText}
                  </span>
                </div>
              </div>
              <div className="id-footer">
                <div className="id-barcode"></div>
                <span className="id-code">ID: TB-25-001</span>
              </div>
            </div>

            {/* Back Side */}
            <div className="id-card-face id-card-back">
              <div className="magnetic-strip"></div>
              <div className="signature-area">
                <span className="label">AUTHORIZED SIGNATURE</span>
                <div className="signature">AthulKrishna</div>
              </div>
              <div className="qr-area">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://athulkrishna.online"
                  alt="QR Code"
                  className="qr-code"
                />
                <span className="scan-text">SCAN FOR DETAILS</span>
              </div>
              <div className="card-info">
                <p>
                  This card certifies the bearer as a verified employee of
                  Trawbit Technologies.
                </p>
                <p>If found, please return to: github.com/Athulprgm</p>
              </div>
              <div className="id-footer">
                <span className="company-name-small">TRAWBIT SYSTEMS</span>
              </div>
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
                <span className="keyword">import</span>{" "}
                <span className="variable">React</span>,{" "}
                <span className="bracket">{`{`}</span>{" "}
                <span className="variable">Developer</span>{" "}
                <span className="bracket">{`}`}</span>{" "}
                <span className="keyword">from</span>{" "}
                <span className="string">'@universe/creative'</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">2</span>
              </div>

              <div className="code-line">
                <span className="line-num">3</span>
                <span className="keyword">const</span>{" "}
                <span className="function">initProfile</span>{" "}
                <span className="operator">=</span>{" "}
                <span className="bracket">()</span>{" "}
                <span className="operator">=&gt;</span>{" "}
                <span className="bracket">{`{`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">4</span>
                <span className="indent"></span>
                <span className="keyword">const</span>{" "}
                <span className="variable">skills</span>{" "}
                <span className="operator">=</span>{" "}
                <span className="bracket">[</span>
              </div>

              <div className="code-line">
                <span className="line-num">5</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="string">"MERN Stack"</span>
                <span className="comma">,</span>{" "}
                <span className="string">"Next.js"</span>
                <span className="comma">,</span>{" "}
                <span className="string">"System Design"</span>
              </div>

              <div className="code-line">
                <span className="line-num">6</span>
                <span className="indent"></span>
                <span className="bracket">]</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">7</span>
              </div>

              <div className="code-line">
                <span className="line-num">8</span>
                <span className="indent"></span>
                <span className="keyword">return</span>{" "}
                <span className="bracket">(</span>
              </div>

              <div className="code-line">
                <span className="line-num">9</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="tag">&lt;CodeMaster</span>
              </div>

              <div className="code-line">
                <span className="line-num">10</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="prop">passion</span>
                <span className="operator">=</span>
                <span className="bracket">{`{`}</span>
                <span className="keyword">true</span>
                <span className="bracket">{`}`}</span>
              </div>

              <div className="code-line">
                <span className="line-num">11</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="prop">mission</span>
                <span className="operator">=</span>
                <span className="string">"Build The Future"</span>
              </div>

              <div className="code-line">
                <span className="line-num">12</span>
                <span className="indent"></span>
                <span className="indent"></span>
                <span className="tag">/&gt;</span>
              </div>

              <div className="code-line">
                <span className="line-num">13</span>
                <span className="indent"></span>
                <span className="bracket">)</span>
                <span className="semicolon">;</span>
              </div>

              <div className="code-line">
                <span className="line-num">14</span>
                <span className="bracket">{`}`}</span>
                <span className="semicolon">;</span>
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
