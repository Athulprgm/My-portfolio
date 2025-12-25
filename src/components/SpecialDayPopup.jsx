import React, { useState, useEffect } from "react";
import "./SpecialDayPopup.css";
import { motion, AnimatePresence } from "framer-motion";

const SPECIAL_DAYS = [
  {
    id: "christmas",
    startMonth: 11, // December
    startDate: 15,
    endMonth: 11,
    endDate: 30,
    title: "Season's Greetings!",
    message:
      '"May your bugs be few, your commits be clean, and your holidays be compiled with joy. Merry Christmas!"',
    image: "/christmas-celebration-with-santa-claus.jpg", // Local image
    colors: ["#ef4444", "#3b82f6"], // Red to Blue
  },
  {
    id: "newyear",
    startMonth: 11, // December
    startDate: 31,
    endMonth: 0, // January
    endDate: 5,
    title: "Happy New Year!",
    message:
      '"Cheers to a new year and another chance for us to get it right. Wish you a coding-filled Happy New Year!"',
    image:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&q=80&w=1000",
    colors: ["#fbbf24", "#7c3aed"], // Gold to Purple
  },
  {
    id: "republicday",
    startMonth: 0, // January
    startDate: 24,
    endMonth: 0,
    endDate: 27,
    title: "Happy Republic Day!",
    message:
      '"Freedom in mind, faith in words, pride in our heart, memories in our souls. Let\'s salute the nation on Republic Day."',
    image:
      "https://images.unsplash.com/photo-1597058712635-3182d1e523c8?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ff9933", "#138808"], // Saffron to Green
  },
  {
    id: "valentines",
    startMonth: 1, // February
    startDate: 7,
    endMonth: 1,
    endDate: 15,
    title: "Happy Valentine's Day!",
    message:
      '"Code is poetry, and building things is love. Spread the love this Valentine\'s Day!"',
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ec4899", "#ef4444"], // Pink to Red
  },
  {
    id: "independence",
    startMonth: 7, // August
    startDate: 12,
    endMonth: 7,
    endDate: 16,
    title: "Happy Independence Day!",
    message:
      '"May the sun in his course visit no land more free, more happy, more lovely, than this our own country."',
    image:
      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1000",
    colors: ["#ff9933", "#000080"], // Saffron to Navy
  },
  {
    id: "halloween",
    startMonth: 9, // October
    startDate: 25,
    endMonth: 10, // November
    endDate: 1,
    title: "Spooky Season!",
    message:
      '"Double, double toil and trouble; Fire burn and caldron bubble. Happy Halloween!"',
    image:
      "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?auto=format&fit=crop&q=80&w=1000",
    colors: ["#f97316", "#000000"], // Orange to Black
  },
];

const SpecialDayPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(null);

  useEffect(() => {
    // Check for special day
    const checkSpecialDay = () => {
      const today = new Date();
      const month = today.getMonth(); // 0-11
      const date = today.getDate(); // 1-31

      const foundDay = SPECIAL_DAYS.find((day) => {
        // Handle year wrap (e.g. New Year: Dec 31 -> Jan 5)
        if (day.startMonth > day.endMonth) {
          // It wraps around the year
          if (month === day.startMonth && date >= day.startDate) return true; // Dec part
          if (month === day.endMonth && date <= day.endDate) return true; // Jan part
          return false;
        } else {
          // Normal range within same year
          if (month < day.startMonth || month > day.endMonth) return false;

          // If same month for start and end
          if (day.startMonth === day.endMonth) {
            return date >= day.startDate && date <= day.endDate;
          }

          // Multi-month range (e.g. Oct 25 -> Nov 1)
          if (month === day.startMonth && date >= day.startDate) return true;
          if (month === day.endMonth && date <= day.endDate) return true;
          if (month > day.startMonth && month < day.endMonth) return true; // In between months

          return false;
        }
      });

      if (foundDay) {
        setActiveTheme(foundDay);
        // Show popup after delay
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    };

    const cleanup = checkSpecialDay();
    return cleanup;
  }, []);

  const handleClose = () => setIsOpen(false);

  if (!activeTheme) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="special-day-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="special-day-card"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Top Decoration Bar */}
            <div
              className="special-card-accent"
              style={{
                background: `linear-gradient(90deg, ${activeTheme.colors[0]}, ${
                  activeTheme.colors[1] || activeTheme.colors[0]
                })`,
              }}
            ></div>

            <button className="special-close-btn" onClick={handleClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Header Image */}
            <div className="special-header-image">
              <img
                src={activeTheme.image}
                alt={activeTheme.title}
                className="special-header-img"
              />
            </div>

            <div className="special-card-content">
              <div className="special-text-content">
                <h3>{activeTheme.title}</h3>
                <p>{activeTheme.message}</p>
                <span className="special-quote-author">- Athul Krishna</span>
              </div>
            </div>

            <div className="special-card-actions">
              <button className="special-btn-secondary" onClick={handleClose}>
                Close
              </button>
              <button className="special-btn-primary" onClick={handleClose}>
                Explore Portfolio
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpecialDayPopup;
