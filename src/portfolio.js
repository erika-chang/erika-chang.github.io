/* Personal Portfolio Config — Erika Chang de Azevedo, Ph.D. */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // pode manter ou trocar

// Splash
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 1800
};

// Hero Illustration (use estático se preferir)
const illustration = {
  animated: true // defina false se quiser usar imagem estática no Greeting
};

// Summary / About me
const greeting = {
  username: "Erika Chang de Azevedo, Ph.D.",
  title: "Hi, I’m Erika",
  subTitle: emoji(
    "Scientist → Data Scientist. I turn complex data into clear, explainable decisions: end-to-end ML pipelines, RAG/LLMs, and automated analytics for the public sector and beyond."
  ),
  resumeLink: "/resume_erika_chang.pdf", // coloque o PDF em public/
  displayGreeting: true
};

// Social
const socialMediaLinks = {
  github: "https://github.com/erika-chang",
  linkedin: "https://www.linkedin.com/in/ecdazevedo",
  gmail: "erikaa.chang@gmail.com",
  display: true
};

// Skills
const skillsSection = {
  title: "Skills",
  subTitle:
    "From research-grade analysis to production-ready ML — with explainability and impact.",
  skills: [
    emoji("⚡ End-to-end ML pipelines: data prep → modeling → evaluation → deploy"),
    emoji("⚡ RAG/LLMs with FAISS, LangChain; Streamlit dashboards; FastAPI backends"),
    emoji("⚡ MLOps basics with Docker/MLflow; SQL analytics and automation")
  ],
  softwareSkills: [
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "SQL / PostgreSQL", fontAwesomeClassname: "fas fa-database" },
    { skillName: "TensorFlow/Keras", fontAwesomeClassname: "fas fa-brain" },
    { skillName: "scikit-learn", fontAwesomeClassname: "fas fa-project-diagram" },
    { skillName: "Streamlit", fontAwesomeClassname: "fas fa-stream" },
    { skillName: "Tableau", fontAwesomeClassname: "fas fa-chart-bar" },
    { skillName: "FastAPI", fontAwesomeClassname: "fas fa-bolt" },
    { skillName: "Docker", fontAwesomeClassname: "fab fa-docker" },
    { skillName: "GCP", fontAwesomeClassname: "fab fa-google" },
    { skillName: "Git/GitHub", fontAwesomeClassname: "fab fa-github" }
  ],
  display: true
};

// Education
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Le Wagon",
      subHeader: "Data Science & AI (Full-time Bootcamp)",
      duration: "Jan 2025 – Mar 2025",
      desc:
        "End-to-end ML, deployment, and reproducible workflows. Built Eyesense CV app."
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "Ph.D. in Biomolecular Physics",
      duration: "Feb 2015 – May 2020",
      desc:
        "Computational biology, HPC, dimensionality reduction and clustering; 3 peer-reviewed papers."
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "Master’s in Biomolecular Physics",
      duration: "Feb 2013 – Feb 2015"
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "B.Sc. Physics & Natural Sciences Education",
      duration: "Feb 2017 – Dec 2019"
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "B.Sc. Biomolecular Physics",
      duration: "Feb 2009 – Feb 2013"
    },
    {
      schoolName: "Universität Regensburg",
      subHeader: "Short-term Exchange",
      duration: "Jan 2012 – Feb 2012"
    }
  ]
};

// Proficiency bars
const techStack = {
  viewSkillBars: true,
  experience: [
    { Stack: "ML / Modeling", progressPercentage: "85%" },
    { Stack: "Data Engineering / APIs", progressPercentage: "75%" },
    { Stack: "Viz / Storytelling", progressPercentage: "85%" }
  ],
  displayCodersrank: false
};

// Work Experience — com bullets (evita “bolas vazias”)
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Data Scientist",
      company: "TIPREV (Municipal Pensions)",
      date: "Jul 2023 – Present",
      descBullets: [
        "Forecasting de receitas e análise de risco/fraude para 40+ prefeituras",
        "ETL e automação em Python/SQL; dashboards (Tableau) para transparência e compliance",
        "Modelos e insights explicáveis para suporte à decisão"
      ]
    },
    {
      role: "Data Science & AI Bootcamp",
      company: "Le Wagon",
      date: "Jan 2025 – Mar 2025",
      descBullets: [
        "Eyesense: app de visão computacional (~92–96% acc) com Streamlit + TensorFlow/Keras",
        "Pipelines de ML reproduzíveis e foco em avaliação/implantação"
      ]
    },
    {
      role: "Senior Research Scientist",
      company: "University of São Paulo",
      date: "2015 – 2020",
      descBullets: [
        "Simulações HPC, PCA/tICA, MSM; 3 publicações revisadas por pares",
        "Mentoria e práticas de ciência de dados reprodutíveis"
      ]
    }
  ]
};

// Open Source + GitHub Profile
const openSource = {
  showGithubProfile: "true",
  display: true
};

// Ocultar seções não solicitadas
const bigProjects = { title: "", subtitle: "", projects: [], display: false };
const achievementSection = { title: "", subtitle: "", achievementsCards: [], display: false };

// Blogs (opcional; pode ligar para posts do LinkedIn manualmente)
const blogSection = {
  title: "Blogs",
  subtitle: "Notes on ML, analytics, and explainability.",
  displayMediumBlogs: "false",
  blogs: [
    // { url: "https://www.linkedin.com/pulse/...", title: "Título", description: "1-liner" }
  ],
  display: true
};

const talkSection = { title: "", subtitle: "", talks: [], display: false };
const podcastSection = { title: "", subtitle: "", podcast: [], display: false };
const resumeSection = { title: "", subtitle: "", display: false };

// Contact
const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Open to Data Analyst / Data Scientist / AI Consultant roles in NL/EU (remote) — happy to chat.",
  email_address: "hello@erikachang.me"
};

// Twitter off
const twitterDetails = { userName: "", display: false };

// Hireable flag
const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
