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
    name: "Dell Prodg",
    description:
      "Enabling agile pricing and quoting for Dell's product catalog. This project is a web-based application that allows users to create and manage quotes for Dell products.",
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
    //repo: "https://github.com/mirajhad/reactwebdev",
    demo: "https://www.dell.com/",
  },
  {
    id: "project-2",
    name: "Bajaj Auto",
    description: "Bajaj Auto Limited is an Indian multinational automotive manufacturing company. It manufactures motorcycles, scooters and auto rickshaws.",
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
    // repo: "https://github.com/mirajhad/E-FoodShop",
     demo: "https://www.bajajauto.com/",
  },
  {
    id: "project-3",
    name: "Health2Home",
    description:
      "Health2Home is equipped to send home healthcare specialists to collect lab samples at the patient’s convenience at his/her home or office.",
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
    // repo: "https://github.com/mirajhad/E-Concert",
     demo: "https://health2home.ae/",
  },
  {
    id: "project-4",
    name: "Chaitanya Audit",
    description: `Chaitanya Audit provides audit reports and financial statements of Chaitanya India, a leading microfinance company in Karnataka.`,
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
    // repo: "https://github.com/mirajhad/StudentManagement",
     demo: "https://www.chaitanyaindia.in/",
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
