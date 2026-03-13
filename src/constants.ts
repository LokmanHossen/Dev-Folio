import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Database, 
  Cloud, 
  Wrench, 
  GraduationCap, 
  Award,
  Briefcase,
  Layers,
  Layout,
  MessageSquare,
  ShoppingCart,
  Calculator,
  Wallet
} from 'lucide-react';

export const RESUME_DATA = {
  name: "Md. Lokman Hossen",
  role: "Flutter Developer",
  location: "Dhaka, Bangladesh",
  contact: {
    phone: "+880-1779525720",
    email: "lokmanhossen230@gmail.com",
    linkedin: "https://linkedin.com/in/lokman05",
    github: "https://github.com/LokmanHossen",
    leetcode: "https://leetcode.com/u/MdLokmanHossen",
    cv: "https://drive.google.com/file/d/115afZDKLkHznRmYRMXMRYOzf20iBdJUR/view?usp=sharing"
  },
  objective: "Flutter Developer with 1+ year of professional experience at Betopia Group, developing cross-platform mobile applications for Android and iOS using Flutter and Dart. Skilled in integrating REST APIs, Firebase services, Google Maps, and WebSocket to build scalable and high-performance applications. Experienced in implementing modern UI/UX designs, managing state with GetX, Riverpod, and Bloc, and handling the complete mobile app lifecycle including App Store and Google Play deployments. Passionate about writing clean, maintainable code and delivering optimized user experiences",
  skills: [
    { category: "Languages", items: ["Dart", "Python", "JavaScript", "C", "C++"], icon: Code2 },
    { category: "Frontend", items: ["Flutter", "Dart Features", "WebSocket", "Socket.IO"], icon: Smartphone },
    { category: "Backend / DB", items: ["Firebase", "RESTful APIs", "Hive", "SQLite", "MySQL"], icon: Database },
    { category: "State Management", items: ["GetX", "Provider", "Riverpod", "Bloc"], icon: Layers },
    { category: "Cloud / DevOps", items: ["AWS", "Microsoft Azure"], icon: Cloud },
    { category: "Tools", items: ["Git", "GitHub", "Android Studio", "VS Code", "Postman"], icon: Wrench }
  ],
  experience: [
    {
      company: "Betopia Group(SM Technology)",
      role: "Flutter Developer (Android & iOS)",
      period: "Jan. 2025 – Present",
      location: "Dhaka, Bangladesh",
      points: [
        "Contributing to the development of cross-platform mobile applications using Flutter and Dart for both Android and iOS.",
        "Integrating RESTful APIs, Firebase services (Authentication, Firestore, Storage), WebSocket, and Socket.IO for real-time features.",
        "Implementing state management solutions using GetX, Riverpod, and Bloc to build maintainable UIs.",
        "Collaborating with designers and stakeholders to deliver performance-optimized apps."
      ]
    }
  ],
  publishedApps: [
    {
      name: "Colizen – Courier Transport",
      description: "A comprehensive mobile solution for community engagement and management in the courier industry.",
      tech: ["Flutter", "Dart", "Firebase"],
      thumbnail: "/assets/colizen_app.png",
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.colizen.josi" }
      ]
    },
    {
      name: "SandLink Marketplace",
      description: "A robust marketplace application connecting buyers and sellers in the construction industry.",
      tech: ["Flutter", "Rest API", "GetX"],
      thumbnail: "/assets/sandlink_app.png",
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.sandlinkmarketplace.sandlink" }
      ]
    },
    {
      name: "Riyaada – Sports Marketplace",
      description: "Innovative platform designed for business growth and networking in the sports sector.",
      tech: ["Flutter", "Provider", "Clean Architecture"],
      thumbnail: "/assets/riyaada_app.png",
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.riyaada.app" },
        { label: "App Store", url: "https://apps.apple.com/us/app/riyaada/id6754441620" }
      ]
    },
    {
      name: "AMC Connect",
      description: "A specialized application for connecting professionals and managing industry-specific workflows.",
      tech: ["Flutter", "Dart", "Firebase"],
      thumbnail: "/assets/amc_connect.png",
      links: [
        { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.amc.connect" }
      ]
    }
  ],
  projects: [
    {
      name: "Expense Tracker",
      tech: "Flutter, Dart, Firebase Firestore",
      date: "Sep. 2024",
      description: "Built a mobile app to record and categorize daily expenses, helping users analyze spending patterns with chart-based summaries.",
      github: "https://github.com/LokmanHossen/Expense_Teracker_flutter",
      icon: Wallet
    },
    {
      name: "BMI Calculate App",
      tech: "Flutter, Dart, Firebase",
      date: "Apr. 2024",
      description: "Developed a BMI calculator with an intuitive UI for instant results and health category classification.",
      github: "https://github.com/LokmanHossen/BMI-Calculate-App-Flutter",
      icon: Calculator
    },
    {
      name: "ShopApp",
      tech: "Flutter, Dart, Firebase Firestore",
      date: "Mar. 2024",
      description: "E-commerce application allowing users to browse products, manage carts, and place orders.",
      github: "https://github.com/LokmanHossen/ShopApp_Flutter",
      icon: ShoppingCart
    },
    {
      name: "WhatsApp Clone",
      tech: "Flutter, Dart, Firebase Firestore, REST API",
      date: "Oct. 2023",
      description: "Real-time chat application with messaging and media/file sharing functionality.",
      github: "https://github.com/LokmanHossen/WhatsApp_clone_flutter",
      icon: MessageSquare
    }
  ],
  education: [
    {
      institution: "Pabna University of Science and Technology (PUST)",
      degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
      period: "2018 – 2023",
      location: "Pabna, Bangladesh"
    },
    {
      institution: "Sherpur Govt. College",
      degree: "Higher Secondary Certificate (Intermediate)",
      period: "2014 – 2016",
      location: "Sherpur, Bangladesh"
    }
  ],
  certifications: [
    { 
      name: "Flutter Advanced Course - Clean Architecture with MVVM", 
      issuer: "Udemy",
      link: "https://www.udemy.com/certificate/UC-85f11f83-518a-47a2-8bff-6a818e07efa7/"
    },
    { 
      name: "Flutter Animations From Zero to Hero", 
      issuer: "Udemy",
      link: "https://www.udemy.com/certificate/UC-2d185e90-4316-4c0a-ad83-33245b8231de/"
    },
    { 
      name: "Flutter Basic Course", 
      issuer: "TTC, Pabna",
      link: "https://drive.google.com/file/d/128QSr802NfQFXY-6IqZDEqPzcEPXICqd/view"
    }
  ]
};
