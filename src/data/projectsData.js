export const projectsData = [
  {
    id: 1,
    title: "Exam Seat Arrangement System",
    description:
      "A comprehensive exam management system with automated seating allocation, real-time notifications, and navigation assistance. Built with Django backend and Flutter mobile app.",
    image:
      "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
    tags: ["Django", "Flutter", "PostgreSQL", "Python"],
    hasDetails: true,
    detailData: {
      heroTitle: "Exam Seating",
      heroSubject: "System",
      tagline: "// Automated Management & Navigation Solution",
      stats: [
        { val: "Full Stack", label: "Architecture" },
        { val: "Cross-Platform", label: "Web & Mobile" },
        { val: "Real-time", label: "Updates" },
      ],
      abstract:
        "The Exam Seating Arrangement System aims to revolutionize how institutions manage examinations. By replacing manual allocation with intelligent automation, it eliminates errors and saves valuable administrative time. The integrated mobile app ensures students can easily find their seats and navigate to exam halls without confusion.",
      gallery: [
        "/project-img/Screenshot 2025-10-31 182323.png",
        "/project-img/Screenshot 2025-10-31 182349.png",
        "/project-img/Screenshot 2025-10-31 182448.png",
        "/project-img/Screenshot 2025-10-31 182506.png",
      ],
      features: [
        {
          title: "Automated Allocation",
          desc: "Smart algorithms to assign students to halls based on capacity and branch.",
        },
        {
          title: "Centralized DB",
          desc: "Securely stores student, exam, and seating data.",
        },
        {
          title: "Role-Based Access",
          desc: "Distinct portals for Admins, Teachers, and Students.",
        },
        {
          title: "Real-time Alerts",
          desc: "Instant notifications for exam schedules and room numbers.",
        },
        {
          title: "Room Navigation",
          desc: "Visual guides to help students locate exam halls.",
        },
        {
          title: "Cross-Platform",
          desc: "Seamless experience on web and mobile devices.",
        },
      ],
      technologies: [
        {
          name: "Frontend",
          stack: "HTML, CSS, JavaScript",
          icon: "fa-brands fa-js",
        },
        {
          name: "Backend",
          stack: "Python, Django",
          icon: "fa-brands fa-python",
        },
        { name: "Database", stack: "PostgreSQL", icon: "fa-solid fa-database" },
        { name: "Mobile", stack: "Flutter", icon: "fa-brands fa-android" },
      ],
      modules: [
        {
          title: "Admin",
          items: ["Manage Schedules", "Allocate Rooms", "Teacher Assignment"],
        },
        {
          title: "Teacher",
          items: ["View Assignments", "Monitor Seating", "Report Issues"],
        },
        {
          title: "Student",
          items: ["Check Schedule", "Find Seat", "Get Notifications"],
        },
        {
          title: "Navigation",
          items: ["Room Locator", "Campus Map", "Real-time Directions"],
        },
      ],
      repoUrl: "https://github.com/Athulprgm/Xsitz2.git",
    },
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
    detailData: null,
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
    detailData: null,
  },
];
