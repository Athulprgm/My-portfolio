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
];
