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
    id: "blog",
    title: "Blog",
  },
  {
    id: "gadgets",
    title: "Gadgets",
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

const gadgets = [
  {
    id: "gadget-1",
    name: "Keychron K2 Pro",
    description:
      "Keychron K2 Pro QMK/VIA Wireless Mechanical Keyboard Bluetooth, Wireless, Wired USB Standard Multi-device Keyboard Compatible with Desktop, Laptop, Mac , with gaming mode ,stand support,K2 Pro Wireless Mechanical Keyboard (Version 2) Hot- Swapable Plastic Frame, 96% Standard Keyboard with Numpad, RGB Backlight, Gateron G Pro Red Switch  (KeychronK Pro Brown)",
    image: frontend,
    specs: ["Multi-device Keyboard", "USB 3.0", "Bluetooth version 5.2, Polling Rate : 1000Hz*, South-facing RGB, Hot Swappable switches, 75 % layout"],
    price: "₹9,271",
    link: "https://www.flipkart.com/keychron-k2-pro-qmk-via-wireless-mechanical-keyboard-bluetooth-wireless-wired-usb-standard-multi-device-compatible-desktop-laptop-mac-gaming-mode-stand-support-k2-version-2-hot-swapable-plastic-frame-96-numpad-rgb-backlight-gateron-g-red-switch/p/itm789f8f583439f?pid=ACCGT8DZYF7RUHPK&lid=LSTACCGT8DZYF7RUHPKYLEVFJ&marketplace=FLIPKART",
  },
  {
    id: "gadget-2",
    name: "Logitech MX Master 3s Wireless Touch Mouse",
    description:
      "You can work, play games, and do more effortlessly with the help of the Logitech MX Master 3S Wireless Mouse. Thanks to its high performance, this mouse offers optimal results. With up to 8k DPI tracking, this mouse can function smoothly on any surface including glass. In addition, owing to its MagSpeed control, this mouse can work at high speeds with utmost accuracy as it scrolls up to 1,000 lines per second and stops at a pixel.",
    image: backend,
    specs: ["Logitech MX Master 3S Wireless Mouse", "8K DPI tracking", "MagSpeed scroll wheel"],
    price: "₹6149",
    link: "https://www.flipkart.com/logitech-mx-master-3s-wireless-ambidextrous-touch-mouse-bluetooth/p/itm271ade01ff274?pid=ACCGFPFCAFGREFHZ&lid=LSTACCGFPFCAFGREFHZMWXUSH&marketplace=FLIPKART",
  },
  {
    id: "gadget-3",
    name: "APPLE Watch Series 8 GPS + Cellular with ECG app, Temperature sensor, Crash Detection",
    description:
      "The Apple Watch Series 8 is a powerful smartwatch that helps you stay connected, track your fitness, and monitor your health. It features a large Retina display, advanced health sensors, and a variety of apps to keep you productive and entertained throughout the day.",
    image: ux,
    specs: ["Retina display", "ECG app", "Temperature sensor", "Crash Detection"],
    price: "₹49,178",
    link: "https://www.flipkart.com/apple-watch-series-8-45mm-gps-cellular-ecg-app-temperature-sensor-crash-detection/p/itm48dd630884322?pid=SMWGHWZ2NR3AH3SK&lid=LSTSMWGHWZ2NR3AH3SKVEXCV2&marketplace=FLIPKART",
  },
  {
    id: "gadget-4",
    name: "Logitech Mx Keys Mini Minimalist Wireless Illuminated Keyboard, Compact, Bluetooth, Backlit, USB-C, Compatible with Apple Macos, iOS, Windows, Linux, Android, Metal Build-Graphite",
    description:
      "The Logitech MX Keys Mini is a compact and minimalist wireless keyboard that offers a comfortable typing experience. It features backlit keys, Bluetooth connectivity, and a USB-C port for charging. Compatible with multiple operating systems, this keyboard is perfect for both work and play.",
    image: prototyping,
    specs: ["Bluetooth", "Backlit", "USB-C", "Compact Design"],
    price: "₹9,999",
    link: "https://www.amazon.in/dp/B09LYZP1LG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1",
  },
  {
     id: "gadget-5",
    name: "Boult Audio X1 Pro Wired Earphones with Type-C Port, 10mm Bass Drivers, Inline Control, IPX5 Water Resistant, Comfort Fit earphones wired headphones with mic, Type C earphones, Voice Assistant (Black)",
    description:
      "Boult Audio X1 Pro Wired Earphones are designed for comfort and high-quality sound. With 10mm bass drivers and an IPX5 water-resistant rating, these earphones are perfect for workouts and daily use.",
    image: prototyping,
    specs: ["10mm Bass Drivers", "IPX5 Water Resistant", "Inline Control", "Comfort Fit"],
    price: "₹1,299",
    link: "https://www.amazon.in/dp/B0CC2DP26M?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1",
  },
  {
    id: "gadget-6",
    name: "Apple AirPods Pro",
    description:
      "Active Noise Cancellation and Transparency mode for an immersive listening experience.",
    image: prototyping,
    specs: ["Active Noise Cancellation", "Transparency Mode", "Spatial Audio"],
    price: "₹16,900",
    link: "https://www.amazon.in/dp/B07ZRXF7M8?ref=ppx_yo2ov_dt_b_fed_asin_title",
  },
  {
    id: "gadget-7",
    name: "Green Soul Trigger Height Adjustable Standing Desk | Ergonomic Design Table Top (5.3 Ft) | 80 KG Lifting Capacity | Digital Display with Memory Preset | 3 Year Warranty | (Black 1600 x 750 Top)",
    description:
      "The Green Soul Trigger Height Adjustable Standing Desk is designed to enhance your workspace ergonomics. With a spacious tabletop and sturdy build, it supports a healthy working posture whether sitting or standing.",
    image: prototyping,
    specs: ["Height Adjustable", "Ergonomic Design", "Digital Display"],
    price: "₹18,989",
    link: "https://www.amazon.in/Green-Soul-Multipurpose-Adjustable-Ergonomic/dp/B09MLY3CJZ/ref=sr_1_12?crid=Z5W5G5OZ17NC&dib=eyJ2IjoiMSJ9.2ykrpvPNH8weAOs93icw_zDxalTN3TV1tzAz8R9SiYr4KxowOrUe5gCXPeql0IIA3f0gW2f9LpPfwOqB7-fYGOK-Z2LMcwDsmY10ZO0dKh7q-bX4w-uym2W7lheHYMMHX2tItOlko_FH7TIm42oXgyw8ZzuY1rXjSnVz4qirCKpEX5v3jbBY17bemr00SGsk636TgF_KLXQprvakrDDmM6JLFgjcoeAlcpMZ2Yo4cOBP8wkVpsd4NpOeYWUMp-ONafWGyl6YF4mctNlBRc6EF7K_8hMUEJFi6x0uq6cXjcQ.MQ7MySWcnuWIAU9NnOUdyt9b1bns4VZPsrAWCNmzZuM&dib_tag=se&keywords=height%2Badjustable%2Btable%2Bfor%2Boffice%2Bwork&qid=1761503744&sprefix=height%2Caps%2C218&sr=8-12&th=1",
  },
  {
    id: "gadget-8",
    name:"ZEBRONICS EA124 LED Monitor, 24 inch (60.4cm), 250 nits, 100Hz, FHD, 1920x1080, HDMI, VGA, Ultra Slim Bezel, Built-in Speakers, Metal Stand, Wall Mountable",
    description:
      "The ZEBRONICS EA124 LED Monitor offers a stunning visual experience with its 24-inch FHD display. Featuring a 100Hz refresh rate, HDMI and VGA connectivity, built-in speakers, and a sleek design, this monitor is perfect for both work and entertainment.",
    image: prototyping,
    specs: ["24 inch FHD Display", "100Hz Refresh Rate", "HDMI and VGA Connectivity", "Built-in Speakers"],
    price: "₹6000",
    link: "https://www.amazon.in/ZEBRONICS-Monitor-1920x1080-Speakers-Mountable/dp/B0D2TFGBGS/ref=sr_1_5?crid=2ILLV4C1167ID&dib=eyJ2IjoiMSJ9.yQcpQTiLvN5BHrYt2mrALvrpafDctKJOQr5kzx7bSCfTVeAekNxthF-1aUaxXQl10XKc-j4moAJfR-dwGPLZIUZ44bZ-9ARF57BbyCqnKoRoHklm5RLZzOLEgP45RUtnah4hPn3A3TdUnhVc8pgtVfzyC7PIfu97hY-qhK99iM-0beuh96nNCqCMFkajc-MF_AtflwaJDtWDhj0dED5uS3jqjQGut2uXbLOZGk6WvpQ.EUQ7zWPC42K3OH4KlHMluJqsF1Jp-E63CP01jtAfW90&dib_tag=se&keywords=zebronics%2Bmonitor&qid=1761503811&sprefix=zebronics%2Bmonitor%2Caps%2C220&sr=8-5&th=1",
  }

];

export { services, technologies, experiences, projects, gadgets };
