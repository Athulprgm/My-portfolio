export const projectsData = [
  {
    id: 1,
    title: "Exam Hall Seating Arrangement System",
    description:
      "An automated system to manage exam hall seating, schedules, and notifications. Replaces manual processes with a centralized database and role-based access for admins, teachers, and students.",
    image:
      "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
    tags: ["Python", "Django", "MySQL", "Flutter", "Web App"],
    hasDetails: true,

    detailData: {
      heroTitle: "Exam Hall Seating",
      heroSubject: "Arrangement System",
      tagline: "// Automation over manual exam management",

      stats: [
        { val: "Centralized", label: "Database" },
        { val: "Role-Based", label: "Access Control" },
        { val: "Automated", label: "Seat Allocation" },
      ],

      abstract:
        "The Examination Seating Arrangement System is designed to modernize the traditionally manual and error-prone process of exam seating management. The system stores student, exam, subject, and room details in a centralized database and automatically allocates seats based on capacity and predefined rules. It reduces administrative workload, minimizes human errors, and improves clarity for students, teachers, and administrators.",

      gallery: [
        "/project-img/Screenshot 2025-10-31 182323.png",
        "/project-img/Screenshot 2025-10-31 182349.png",
        "/project-img/Screenshot 2025-10-31 182448.png",
        "/project-img/Screenshot 2025-10-31 182506.png",
      ],

      features: [
        {
          title: "Automated Seat Allocation",
          desc: "Generates seating arrangements based on room capacity, subjects, and student data.",
        },
        {
          title: "Centralized Data Management",
          desc: "Stores students, exams, rooms, teachers, and schedules securely in one system.",
        },
        {
          title: "Role-Based Login",
          desc: "Separate access for Admin, Teacher, Student, and Navigation modules.",
        },
        {
          title: "Exam Schedule Alerts",
          desc: "Students can view exam schedules and assigned seating information.",
        },
        {
          title: "Room Navigation",
          desc: "Helps users identify exam halls and room locations within the campus.",
        },
        {
          title: "Reduced Manual Errors",
          desc: "Eliminates time-consuming manual seating preparation and mistakes.",
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
        {
          name: "Database",
          stack: "MySQL",
          icon: "fa-solid fa-database",
        },
        {
          name: "Mobile App",
          stack: "Flutter",
          icon: "fa-brands fa-android",
        },
      ],

      modules: [
        {
          title: "Admin Module",
          items: [
            "Login",
            "Arrange Seats",
            "Add & Manage Teachers",
            "Add & Manage Classes",
            "View Malpractice Reports",
            "Send Notifications",
          ],
        },
        {
          title: "Teacher Module",
          items: [
            "Login",
            "View Allocated Exam Halls",
            "Report Malpractice",
            "Room Navigation",
          ],
        },
        {
          title: "Student Module",
          items: [
            "Login & Registration",
            "View Exam Schedule",
            "Check Seating Arrangement",
            "Receive Notifications",
          ],
        },
        {
          title: "Navigation Module",
          items: ["View Room Navigation", "Locate Exam Halls"],
        },
      ],

      repoUrl: "https://github.com/Athulprgm/Xsitz2.git",
    },
  },

  {
    id: 2,
    title: "Static Webpages",
    description:
      "Responsive static websites built using HTML, CSS, and JavaScript with focus on performance and clean UI.",
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
      "A responsive calculator web app with modern UI supporting basic arithmetic operations.",
    image:
      "/web-development-programming-and-code-testing-ui-concept-with-laptop-displaying-futuristic.webp",
    tags: ["React", "JavaScript", "CSS"],
    hasDetails: false,
    detailData: null,
  },
  {
    id: 4,
    title: "ExamPro AI",
    description:
      "Advanced multi-tenant MERN application leveraging AI algorithms for optimized exam seat allocation, invigilation scheduling, and digital campus navigation.",
    image: "/New folder/Screenshot 2026-02-10 143102.png",
    tags: ["MERN Stack", "AI Algorithm", "React", "Node.js"],
    hasDetails: true,
    detailData: {
      heroTitle: "ExamPro",
      heroSubject: "AI",
      tagline: "// AI-Powered institutional exam logistics",

      stats: [
        { val: "AI-Driven", label: "Allocation" },
        { val: "MERN", label: "Full Stack" },
        { val: "Multi-Tenant", label: "System" },
      ],

      abstract:
        "ExamPro AI is a next-generation, multi-tenant web application designed for higher education institutions. It utilizes advanced AI algorithms to automate complex seat allocation logic and invigilation scheduling. The system minimizes operational complexity, eliminates manual errors, and provides interactive navigation through a digitally modeled campus infrastructure.",

      gallery: [
        "/New folder/Screenshot 2026-02-10 143106.png",
        "/New folder/Screenshot 2026-02-10 143112.png",
        "/New folder/Screenshot 2026-02-10 143115.png",
        "/New folder/Screenshot 2026-02-10 143118.png",
        "/New folder/Screenshot 2026-02-10 143122.png",
        "/New folder/Screenshot 2026-02-10 143135.png",
        "/New folder/Screenshot 2026-02-10 143142.png",
        "/New folder/Screenshot 2026-02-10 143201.png",
        "/New folder/Screenshot 2026-02-10 143241.png",
      ],

      features: [
        {
          title: "AI Allocation Engine",
          desc: "Uses advanced algorithms to optimize seat distribution based on capacity and subject constraints.",
        },
        {
          title: "Eliminate Manual Errors",
          desc: "Automates complex seating logic to remove human-induced mistakes.",
        },
        {
          title: "Institutional Scalability",
          desc: "Multi-tenant architecture supports large datasets and multi-campus environments.",
        },
        {
          title: "Infrastructure Modeling",
          desc: "Digital nodes and path connections for intuitive campus navigation.",
        },
        {
          title: "Centralized Data Management",
          desc: "Structured storage for exams, schedules, and violation records.",
        },
        {
          title: "Fairness & Transparency",
          desc: "Ensures equitable seat distribution and clear communication for students.",
        },
        {
          title: "Malpractice Tracking",
          desc: "Accountability systems with live reporting and violation logs.",
        },
      ],

      technologies: [
        {
          name: "Frontend",
          stack: "React 18, Vite",
          icon: "fa-brands fa-react",
        },
        {
          name: "Backend",
          stack: "Express.js, Node.js",
          icon: "fa-brands fa-node",
        },
        {
          name: "Database",
          stack: "MongoDB, Mongoose",
          icon: "fa-solid fa-leaf",
        },
        {
          name: "Security",
          stack: "JWT, BCrypt",
          icon: "fa-solid fa-shield-halved",
        },
      ],

      highlights: [
        {
          title: "AI-Powered Seat Allocation",
          desc: "Our proprietary algorithm analyzes room capacity and examination constraints to generate optimal, conflict-free seating maps in real-time.",
          image: "/New folder/Screenshot 2026-02-10 143135.png",
          tag: "AI Intelligence",
        },
        {
          title: "Digital Infrastructure Map",
          desc: "A sophisticated node-link editor allowing administrators to digitally model campus buildings, connecting rooms and paths for seamless navigation.",
          image: "/New folder/Screenshot 2026-02-10 143142.png",
          tag: "Infrastructure",
        },
      ],

      modules: [
        {
          title: "College Admin",
          items: [
            "Infrastructure Modeling",
            "Automated Seat Allocation",
            "Subject & Exam Management",
            "Duty Assignment",
          ],
        },
        {
          title: "Student Module",
          items: [
            "Interactive Navigation",
            "Visual Seat ID",
            "Personalized Timetable",
          ],
        },
        {
          title: "Invigilator Module",
          items: [
            "Student Verification",
            "Live Malpractice Reporting",
            "Attendance Management",
          ],
        },
        {
          title: "Super Admin",
          items: ["Multi-Tenancy Management", "System Configuration"],
        },
        {
          title: "Database Schema",
          items: [
            "Users Collection (Role-based)",
            "Colleges (Tenant Information)",
            "BuildingMaps (Infrastructure Nodes)",
            "SeatArrangements (Live Mapping)",
            "Malpractices (Violation Records)",
          ],
        },
      ],

      repoUrl: "#",
    },
  },
];
