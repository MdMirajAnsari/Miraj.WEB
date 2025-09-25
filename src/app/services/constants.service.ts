import { Injectable } from '@angular/core';

export interface NavLink {
  id: string;
  title: string;
}

export interface Service {
  title: string;
  icon: string;
}

export interface Technology {
  name: string;
  icon: string;
}

export interface Experience {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: Array<{
    name: string;
    color: string;
  }>;
  image: string;
  repo?: string;
  demo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public readonly navLinks: NavLink[] = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "blog",
      title: "Blog",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  public readonly services: Service[] = [
    {
      title: "Frontend Developer",
      icon: "/assets/icons/frontend.png",
    },
    {
      title: "Backend Developer",
      icon: "/assets/icons/backend.png",
    },
    {
      title: "UI/UX Design",
      icon: "/assets/icons/ux.png",
    },
    {
      title: "Software Prototyping",
      icon: "/assets/icons/prototyping.png",
    },
  ];

  public readonly technologies: Technology[] = [
    {
      name: "HTML 5",
      icon: "/assets/tech/html.png",
    },
    {
      name: "CSS 3",
      icon: "/assets/tech/css.png",
    },
    {
      name: "JavaScript",
      icon: "/assets/tech/javascript.png",
    },
    {
      name: "TypeScript",
      icon: "/assets/tech/typescript.png",
    },
    {
      name: "React JS",
      icon: "/assets/tech/reactjs.png",
    },
    {
      name: "Redux Toolkit",
      icon: "/assets/tech/redux.png",
    },
    {
      name: "Tailwind CSS",
      icon: "/assets/tech/tailwind.png",
    },
    {
      name: "Node JS",
      icon: "/assets/tech/nodejs.png",
    },
    {
      name: "PostgreSQL",
      icon: "/assets/tech/postgresql.png",
    },
    {
      name: "Git",
      icon: "/assets/tech/git.png",
    },
    {
      name: "Docker",
      icon: "/assets/tech/docker.png",
    },
  ];

  public readonly experiences: Experience[] = [
    {
      title: "Senior Software Development Engineer",
      company_name: "Brillio Technologies",
      icon: "/assets/company/brillio.jpg",
      iconBg: "#333333",
      date: "September 2020 - Present",
    },
    {
      title: "Senior Software Engineer",
      company_name: "Crisis24 (formerly known as Onsolve)",
      icon: "/assets/company/onsolve.jpg",
      iconBg: "#333333",
      date: "February 2023 - August 2024",
    },
    {
      title: "Software Engineer",
      company_name: "Sysfore Technologies",
      icon: "/assets/company/sysfore.png",
      iconBg: "#333333",
      date: "May 2022 - February 2023",
    },
  ];

  public readonly projects: Project[] = [
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
      image: "/assets/company/sysfore.png",
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
      image: "/assets/projects/leaderboard.png",
      demo: "https://www.bajajauto.com/",
    },
    {
      id: "project-3",
      name: "Health2Home",
      description:
        "Health2Home is equipped to send home healthcare specialists to collect lab samples at the patient's convenience at his/her home or office.",
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
      image: "/assets/projects/math-magicians.png",
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
      image: "/assets/projects/movie-metro.png",
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
      image: "/assets/projects/nyeusi.png",
      repo: "https://github.com/mirajhad/Transport-management-Version-2.0",
      demo: "https://trans-p.000webhostapp.com/",
    },
  ];

  constructor() { }
}