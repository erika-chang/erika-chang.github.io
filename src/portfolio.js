/* Personal Portfolio Config for Erika Chang de Azevedo */

// To change portfolio colors globally go to the _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Optional: keep or replace

// Splash Screen
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary and Greeting
const illustration = { animated: true };

const greeting = {
  username: "Erika Chang de Azevedo, Ph.D.",
  title: "Hi, I’m Erika",
  subTitle: emoji(
    "Data Analyst / Data Scientist with 10+ years in research and analytics. I build end-to-end ML pipelines, automate workflows, deploy APIs, and turn complex data into clear decisions. Python, SQL, TensorFlow/Keras, scikit-learn, Streamlit, Tableau, Docker, MLflow, GCP."
  ),
  resumeLink: "", // Add a public PDF URL if you want a “Resume” button
  displayGreeting: true
};

// Social Media
const socialMediaLinks = {
  github: "https://github.com/erika-chang",
  linkedin: "https://www.linkedin.com/in/ecdazevedo",
  gmail: "erikaa.chang@gmail.com",
  // Add others if you want: twitter, instagram, medium, stackoverflow, gitlab...
  display: true
};

// Skills
const skillsSection = {
  title: "Skills",
  subTitle:
    "Machine Learning, Data Analysis, and deployment of robust, explainable solutions.",
  skills: [
    emoji("⚡ End-to-end ML: data prep → modeling → evaluation → deployment"),
    emoji("⚡ APIs with FastAPI, dashboards with Streamlit and Tableau"),
    emoji("⚡ Vector search and RAG with FAISS, LangChain, local LLMs"),
    emoji("⚡ MLOps practices with Docker and MLflow on GCP")
  ],
  /* Use valid Font Awesome classnames */
  softwareSkills: [
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "SQL / Databases", fontAwesomeClassname: "fas fa-database" },
    { skillName: "Git", fontAwesomeClassname: "fab fa-git-alt" },
    { skillName: "GitHub", fontAwesomeClassname: "fab fa-github" },
    { skillName: "Docker", fontAwesomeClassname: "fab fa-docker" },
    { skillName: "GCP", fontAwesomeClassname: "fab fa-google" },
    { skillName: "Tableau", fontAwesomeClassname: "fas fa-chart-bar" },
    { skillName: "TensorFlow/Keras", fontAwesomeClassname: "fas fa-brain" },
    { skillName: "FastAPI", fontAwesomeClassname: "fas fa-bolt" },
    { skillName: "Streamlit", fontAwesomeClassname: "fas fa-stream" }
  ],
  display: true
};

// Education
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Le Wagon",
      // logo: require("./assets/images/lewagonLogo.png"), // optional if you have it
      subHeader: "Data Science & AI (Full-time Bootcamp)",
      duration: "Jan 2025 – Mar 2025",
      desc:
        "End-to-end ML, model evaluation, deployment. Built Eyesense (CV app) and other projects."
    },
    {
      schoolName: "University of São Paulo (USP)",
      // logo: require("./assets/images/uspLogo.png"),
      subHeader: "Ph.D. in Biomolecular Physics",
      duration: "Feb 2015 – May 2020",
      desc:
        "Computational biology, HPC, large-scale simulations, data analysis, dimensionality reduction and clustering."
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "Master’s in Biomolecular Physics",
      duration: "Feb 2013 – Feb 2015"
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "B.Sc. in Physics & Natural Sciences Education",
      duration: "Feb 2017 – Dec 2019"
    },
    {
      schoolName: "University of São Paulo (USP)",
      subHeader: "B.Sc. in Biomolecular Physics",
      duration: "Feb 2009 – Feb 2013"
    },
    {
      schoolName: "Universität Regensburg",
      subHeader: "Short-term Exchange Program",
      duration: "Jan 2012 – Feb 2012"
    }
  ]
};

// Proficiency bars (optional)
const techStack = {
  viewSkillBars: true,
  experience: [
    { Stack: "Machine Learning / Modeling", progressPercentage: "85%" },
    { Stack: "Data Engineering / APIs", progressPercentage: "75%" },
    { Stack: "Visualization / Storytelling", progressPercentage: "85%" }
  ],
  displayCodersrank: false
};

// Work Experience
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Data Analyst / Data Scientist",
      company: "TIPREV (Consultancy for Municipal Pensions)",
      // companylogo: require("./assets/images/tiprevLogo.png"),
      date: "Jul 2023 – Present",
      desc:
        "Built tax revenue prediction models and conducted risk/fraud analysis for 40+ municipalities.",
      descBullets: [
        "Automated pipelines and dashboards with Python, SQL, and Tableau",
        "Compliance analytics and anomaly detection aligned with Brazilian regulations"
      ]
    },
    {
      role: "Data Science & AI Bootcamp",
      company: "Le Wagon",
      date: "Jan 2025 – Mar 2025",
      desc:
        "Projects in supervised learning, deep learning, and deployment. Eyesense CV app with ~96% accuracy."
    },
    {
      role: "High School Teacher (STEM)",
      company: "State School Gov. Jânio Quadros",
      date: "Apr 2021 – Mar 2023",
      desc:
        "Data-informed instruction and performance tracking; improved student scores by ≥10% in one year."
    },
    {
      role: "Senior Research Scientist",
      company: "University of São Paulo",
      date: "Feb 2015 – May 2020",
      desc:
        "HPC simulations, bioinformatics pipelines, PCA/tICA + MSM clustering; 3 peer-reviewed publications."
    }
  ]
};

// Open Source (GitHub pinned + profile)
const openSource = {
  showGithubProfile: "true", // shows GitHub profile in footer
  display: true
};

// Big Projects (not requested) → hide
const bigProjects = {
  title: "",
  subtitle: "",
  projects: [],
  display: false
};

// Achievements / Certifications → hide
const achievementSection = {
  title: "",
  subtitle: "",
  achievementsCards: [],
  display: false
};

// Blogs
const blogSection = {
  title: "Blogs",
  subtitle:
    "I share lessons learned from ML projects, analytics, and deployment.",
  displayMediumBlogs: "false", // set to true and add your Medium username in the template if you want auto-fetch
  blogs: [
    // Add your posts here:
    // {
    //   url: "https://your-blog-or-linkedin-article",
    //   title: "Post title",
    //   description: "Short one-liner about what the reader will learn."
    // }
  ],
  display: true
};

// Talks / Podcast / Resume → hide for now
const talkSection = { title: "", subtitle: "", talks: [], display: false };
const podcastSection = { title: "", subtitle: "", podcast: [], display: false };
const resumeSection = { title: "", subtitle: "", display: false };

// Contact
const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Open to Data Analyst / Data Scientist roles in the Netherlands and EU. Let’s talk.",
  number: "+31 6 17616505",
  email_address: "erikaa.chang@gmail.com"
};

// Twitter (not needed)
const twitterDetails = { userName: "", display: false };

// Hireable toggle in GitHub footer
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
