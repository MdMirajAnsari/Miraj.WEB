import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  docker,
  postgresql,
  leaderboard,
  math,
  movie,
  nyeusi,
  dcc,
  brillio,
  crisis24,
  sysfore
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: frontend,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX Design",
    icon: ux,
  },
  {
    title: "Software Prototyping",
    icon: prototyping,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },

  {
    name: "postgresql",
    icon: postgresql,
  },
  {
    name: "git",
    icon: git,
  },

  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  // {
  //   title: 'Front-End Developer',
  //   company_name: 'Cover Hunt',
  //   icon: coverhunt,
  //   iconBg: '#333333',
  //   date: 'Aug 2021 - Feb 2022',
  // },
  {
    title: "Senior Software Development Engineer",
    company_name: "Brillio Technologies",
    icon: brillio,
    iconBg: "#333333",
    date: "September 2020 - Present",
  },
  {
    title: "Senior Software Engineer",
    company_name: "Crisis24 (formerly known as Onsolve)",
    icon: crisis24,
    iconBg: "#333333",
    date: "February 2023 - August 2024",
  },
  {
    title: "Software Engineer",
    company_name: "Sysfore Technologies",
    icon: sysfore,
    iconBg: "#333333",
    date: "May 2022 - February 2023",
  },
];

const projects = [
  {
    id: "project-1",
    name: "Gani Tobacco",
    description:
      "This project provides a robust and full-featured online shopping platform with various functionalities to enhance the user experience.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: sysfore,
    repo: "https://github.com/mirajhad/reactwebdev",
    demo: "https://reactwebdev.vercel.app/",
  },
  {
    id: "project-2",
    name: "E-FoodShop",
    description: "Order Food Online, Just like Zomato",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: leaderboard,
    repo: "https://github.com/mirajhad/E-FoodShop",
    demo: "https://github.com/mirajhad/E-FoodShop",
  },
  {
    id: "project-3",
    name: "E-Concert",
    description:
      "Concert booking system involves various components to manage the process of scheduling, selling tickets, and organizing events.",
    tags: [
      {
        name: "Asp.Net",
        color: "blue-text-gradient",
      },
      {
        name: "Sql Server",
        color: "green-text-gradient",
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: math,
    repo: "https://github.com/mirajhad/E-Concert",
    demo: "https://github.com/mirajhad/E-Concert",
  },
  {
    id: "project-4",
    name: "StudentManagement",
    description: `The Student Management project is a comprehensive system designed to streamline various aspects of managing student information within an educational institution.`,
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: movie,
    repo: "https://github.com/mirajhad/StudentManagement",
    demo: "https://github.com/mirajhad/StudentManagement",
  },
  {
    id: "project-5",
    name: "Transport Management",
    description:
      "This is a web-related application that permits us to approach the entire knowledge regarding the College Transport Management, employees, students, faculties etc. This application is also called as College Transport Management System.",
    tags: [
      {
        name: "Php",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: nyeusi,
    repo: "https://github.com/mirajhad/Transport-management-Version-2.0",
    demo: "https://trans-p.000webhostapp.com/",
  },
];

export { services, technologies, experiences, projects };
