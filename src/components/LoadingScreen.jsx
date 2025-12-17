import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 400);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className={`loading-screen ${isComplete ? "fade-out" : ""}`}>
      <div className="loading-content">
        {/* Profile Image with Pulse */}
        <div className="profile-loader">
          <div className="profile-ring"></div>
          <div className="profile-ring-2"></div>
          <img src="/profile.png" alt="Loading" className="profile-image" />
        </div>

        {/* Minimal Code Element */}
        <div className="code-snippet">
          <span className="code-bracket">{"{"}</span>
          <span className="code-text">initializing</span>
          <span className="code-bracket">{"}"}</span>
        </div>

        {/* Progress Bar */}
        <div className="progress-wrapper">
          <div className="progress-track">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-percentage">{Math.floor(progress)}%</span>
        </div>

        {/* Simple Loading Indicator */}
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
