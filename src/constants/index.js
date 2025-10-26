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
      "Keychron K2 Pro QMK/VIA Wireless Mechanical Keyboard Bluetooth, Wireless, Wired USB Standard Multi-device Keyboard Compatible with Desktop, Laptop, Mac, with gaming mode, stand support, K2 Pro Wireless Mechanical Keyboard (Version 2) Hot-Swappable Plastic Frame, 96% Standard Keyboard with Numpad, RGB Backlight, Gateron G Pro Red Switch (Keychron K Pro Brown)",
    image: "https://www.keychron.com/cdn/shop/products/Keychron-K2-Pro-QMK-VIA-Wireless-Mechanical-Keyboard-for-Mac-Windows-PBT-keycaps-PCB-screw-in-stabilizer-hot-swappable-red-switch_7f3edd88-59f3-4516-b953-05cdc3d3bece.jpg",
    specs: ["Multi-device Keyboard", "USB 3.0", "Bluetooth version 5.2, Polling Rate : 1000Hz*", "South-facing RGB", "Hot Swappable switches", "75% layout"],
    price: "₹9,271",
    link: "https://www.flipkart.com/keychron-k2-pro-qmk-via-wireless-mechanical-keyboard-bluetooth-wireless-wired-usb-standard-multi-device-compatible-desktop-laptop-mac-gaming-mode-stand-support-k2-version-2-hot-swapable-plastic-frame-96-numpad-rgb-backlight-gateron-g-red-switch/p/itm789f8f583439f?pid=ACCGT8DZYF7RUHPK&lid=LSTACCGT8DZYF7RUHPKYLEVFJ&marketplace=FLIPKART",
    source: "https://www.keychron.com/products/keychron-k2-pro-qmk-via-wireless-mechanical-keyboard"  // official product page :contentReference[oaicite:0]{index=0}
  },
  {
    id: "gadget-2",
    name: "Logitech MX Master 3S Wireless Touch Mouse",
    description:
      "You can work, play games, and do more effortlessly with the help of the Logitech MX Master 3S Wireless Mouse. Thanks to its high performance, this mouse offers optimal results. With up to 8k DPI tracking, this mouse can function smoothly on any surface including glass. In addition, owing to its MagSpeed control, this mouse can work at high speeds with utmost accuracy as it scrolls up to 1,000 lines per second and stops at a pixel.",
    image: "https://m.media-amazon.com/images/I/51m4354BqaL._AC_UF894,1000_QL80_.jpg",
    specs: ["Logitech MX Master 3S Wireless Mouse", "8K DPI tracking", "MagSpeed scroll wheel"],
    price: "₹6,149",
    link: "https://www.flipkart.com/logitech-mx-master-3s-wireless-ambidextrous-touch-mouse-bluetooth/p/itm271ade01ff274?pid=ACCGFPFCAFGREFHZ&lid=LSTACCGFPFCAFGREFHZMWXUSH&marketplace=FLIPKART",
    source: "https://www.logitech.com/en-us/products/mice/mx-master-3s"  // (official product page) — note: image URL from Amazon used
  },
  {
    id: "gadget-3",
    name: "APPLE Watch Series 8 GPS + Cellular with ECG app, Temperature sensor, Crash Detection",
    description:
      "The Apple Watch Series 8 is a powerful smartwatch that helps you stay connected, track your fitness, and monitor your health. It features a large Retina display, advanced health sensors, and a variety of apps to keep you productive and entertained throughout the day.",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKMX3_AV1?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1652432863209",
    specs: ["Retina display", "ECG app", "Temperature sensor", "Crash Detection"],
    price: "₹49,178",
    link: "https://www.flipkart.com/apple-watch-series-8-45mm-gps-cellular-ecg-app-temperature-sensor-crash-detection/p/itm48dd630884322?pid=SMWGHWZ2NR3AH3SK&lid=LSTSMWGHWZ2NR3AH3SKVEXCV2&marketplace=FLIPKART",
    source: "https://www.apple.com/in/apple-watch-series-8/"  // official product page
  },
  {
    id: "gadget-4",
    name: "Logitech MX Keys Mini Minimalist Wireless Illuminated Keyboard, Compact, Bluetooth, Backlit, USB-C, Compatible with Apple MacOS, iOS, Windows, Linux, Android, Metal Build-Graphite",
    description:
      "The Logitech MX Keys Mini is a compact and minimalist wireless keyboard that offers a comfortable typing experience. It features backlit keys, Bluetooth connectivity, and a USB-C port for charging. Compatible with multiple operating systems, this keyboard is perfect for both work and play.",
    image: "https://resource.logitech.com/w_1580,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mx-keys-mini/mx-keys-mini-graphite-top-view.png?v=1",
    specs: ["Bluetooth", "Backlit", "USB-C", "Compact Design"],
    price: "₹9,999",
    link: "https://www.amazon.in/dp/B09LYZP1LG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1",
    source: "https://www.logitech.com/en-us/products/mx-keys-mini-wireless-keyboard"  // official product page
  },
  {
    id: "gadget-5",
    name: "Boult Audio X1 Pro Wired Earphones with Type-C Port, 10mm Bass Drivers, Inline Control, IPX5 Water Resistant, Comfort Fit earphones wired headphones with mic, Type-C earphones, Voice Assistant (Black)",
    description:
      "Boult Audio X1 Pro Wired Earphones are designed for comfort and high-quality sound. With 10 mm bass drivers and an IPX5 water-resistant rating, these earphones are perfect for workouts and daily use.",
    image: "https://cdn.shopify.com/s/files/1/0547/1422/1059/products/image_593d41c0-b801-4c26-9eff-90d87fe0239f_500x500.jpg?v=1673749201",
    specs: ["10mm Bass Drivers", "IPX5 Water Resistant", "Inline Control", "Comfort Fit"],
    price: "₹1,299",
    link: "https://www.amazon.in/dp/B0CC2DP26M?ref=ppx_yo2ov_dt_b_fed_asin_title",
    source: "https://www.boultaudio.com/"  // manufacturer homepage :contentReference[oaicite:1]{index=1}
  },
  {
    id: "gadget-6",
    name: "Apple AirPods Pro",
    description:
      "Active Noise Cancellation and Transparency mode for an immersive listening experience.",
    image: "https://www.apple.com/v/airpods-pro/d/images/overview/hero_endframe__d0vyhbyu3cqe_large.jpg",
    specs: ["Active Noise Cancellation", "Transparency Mode", "Spatial Audio"],
    price: "₹16,900",
    link: "https://www.amazon.in/dp/B07ZRXF7M8?ref=ppx_yo2ov_dt_b_fed_asin_title",
    source: "https://www.apple.com/in/airpods-pro/"  // official product page
  },
  {
    id: "gadget-7",
    name: "Green Soul Trigger Height Adjustable Standing Desk | Ergonomic Design Table Top (5.3 Ft) | 80 KG Lifting Capacity | Digital Display with Memory Preset | 3 Year Warranty | (Black 1600 × 750 Top)",
    description:
      "The Green Soul Trigger Height Adjustable Standing Desk is designed to enhance your workspace ergonomics. With a spacious tabletop and sturdy build, it supports a healthy working posture whether sitting or standing.",
    image: "https://cdn.shopify.com/s/files/1/0136/5735/3309/products/standing-desk-green-soul-trigger-black.jpg?v=1648758321",
    specs: ["Height Adjustable", "Ergonomic Design", "Digital Display"],
    price: "₹18,989",
    link: "https://www.amazon.in/Green-Soul-Multipurpose-Adjustable-Ergonomic/dp/B09MLY3CJZ",
    source: "https://greensoul.in/products/height-adjustable-standing-desk-trigger-series"  // manufacturer product page
  },
  {
    id: "gadget-8",
    name: "ZEBRONICS EA124 LED Monitor, 24 inch (60.4 cm), 250 nits, 100Hz, FHD, 1920x1080, HDMI, VGA, Ultra Slim Bezel, Built-in Speakers, Metal Stand, Wall Mountable",
    description:
      "The ZEBRONICS EA124 LED Monitor offers a stunning visual experience with its 24-inch FHD display. Featuring a 100 Hz refresh rate, HDMI and VGA connectivity, built-in speakers, and a sleek design, this monitor is perfect for both work and entertainment.",
    image: "https://www.amazon.in/ZEBRONICS-Monitor-1920x1080-Speakers-Mountable/dp/B0D2TFGBGS?th=1",
    specs: ["24 inch FHD Display", "100Hz Refresh Rate", "HDMI and VGA Connectivity", "Built-in Speakers"],
    price: "₹6,000",
    link: "https://www.amazon.in/ZEBRONICS-Monitor-1920x1080-Speakers-Mountable/dp/B0D2TFGBGS",
    source: "https://zebronics.com/products/zeb-ea-124-100hz"  // official product page :contentReference[oaicite:2]{index=2}
  }
];


export { services, technologies, experiences, projects, gadgets };
