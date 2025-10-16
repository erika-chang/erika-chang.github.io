/* Change this file to get your personal Portfolio */
/* To change portfolio colors globally go to the _globalColor.scss file */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // optional custom animation

// Splash Screen
const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section
const illustration = { animated: true };

const greeting = {
  username: "E. C. Azevedo, Ph.D.",
  title: "Hi, I'm Erika",
  subTitle: emoji(
    "Data Scientist with a PhD in Biomolecular Physics. I build predictive models, automated ETL pipelines, and GenAI applications that turn complex data into decisions people can trust."
  ),
  // Put your PDF in /public as resume.pdf or change this link to an external URL
  resumeLink: "https://docs.google.com/document/d/1PGOWuCIVX6C4NKNYJkO8_61efhtPwWZbgnzyZdi2QII/edit?usp=sharing",
  displayGreeting: true
};

// Social Media Links
const socialMediaLinks = {
  github: "https://github.com/erika-chang",
  linkedin: "https://www.linkedin.com/in/ecdazevedo",
  email:"hello@erikachang.me",
  // Optional: add more (kaggle, medium, etc.) in src/components/SocialMedia if you want
  display: true
};

// Skills Section
const skillsSection = {
  title: "What I do",
  subTitle: "Practical data science focused on impact and clarity.",
  skills: [
    emoji("⚡ Design end-to-end ML pipelines: data prep, modeling, evaluation, and deployment"),
    emoji("⚡ Build RAG/GenAI services with clear APIs for real-world use"),
    emoji("⚡ Create data products and dashboards that support fast, reliable decisions")
  ],
  // FontAwesome icon names: https://fontawesome.com/icons
  softwareSkills: [
    { skillName: "Python", fontAwesomeClassname: "fab fa-python" },
    { skillName: "SQL", fontAwesomeClassname: "fas fa-database" },
    { skillName: "scikit-learn", fontAwesomeClassname: "fas fa-robot" },
    { skillName: "TensorFlow", fontAwesomeClassname: "fas fa-brain" },
    { skillName: "LangChain", fontAwesomeClassname: "fas fa-code-branch" },
    { skillName: "FastAPI", fontAwesomeClassname: "fas fa-bolt" },
    { skillName: "Docker", fontAwesomeClassname: "fab fa-docker" },
    { skillName: "Git / CI/CD", fontAwesomeClassname: "fab fa-git-alt" },
    { skillName: "PostgreSQL", fontAwesomeClassname: "fas fa-server" },
    { skillName: "Power BI / Tableau", fontAwesomeClassname: "fas fa-chart-bar" }
  ],
  display: true
};

// Education Section
const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Le Wagon",
      logo: require("./assets/images/lewagonLogo.png"), // add this asset
      subHeader: "Data Science & AI",
      duration: "Jan 2025 – Mar 2025",
      desc: "Full-time bootcamp focused on modern ML, MLOps, and product delivery."
    },
    {
      schoolName: "University of São Paulo (USP)",
      logo: require("./assets/images/uspLogo.png"), // add this asset
      subHeader: "Ph.D. in Biomolecular Physics",
      duration: "Feb 2015 – May 2020",
      desc: "Molecular Dynamics on GPU clusters and cross-disciplinary research."
    },
    {
      schoolName: "University of São Paulo (USP)",
      logo: require("./assets/images/uspLogo.png"),
      subHeader: "M.Sc. in Biomolecular Physics",
      duration: "—",
      desc: ""
    }
  ]
};

// Your top 3 proficient stacks/tech experience
const techStack = {
  viewSkillBars: true,
  experience: [
    { Stack: "Machine Learning & GenAI", progressPercentage: "85%" },
    { Stack: "Data Engineering (ETL, APIs, SQL)", progressPercentage: "90%" },
    { Stack: "Visualization & Storytelling", progressPercentage: "90%" }
  ],
  displayCodersrank: false
};

// Work experience section
const workExperiences = {
  display: true,
  experience: [
    {
      role: "Data Scientist",
      company: "Tiprev",
      companylogo: require("./assets/images/tiprevLogo.png"), // add this asset or replace
      date: "Jul 2023 – Present · Remote",
      desc: "Automated pension-data workflows and developed ML models to support financial risk management.",
      descBullets: [
        "Python & SQL automations improving data consistency across municipalities",
        "Anomaly detection models for proactive oversight",
        "Tableau dashboards for pension health monitoring and planning",
        "Collaboration with audit/compliance on data processes"
      ]
    },
    {
      role: "Data Science & AI Bootcamp",
      company: "Le Wagon",
      companylogo: require("./assets/images/lewagonLogo.png"),
      date: "Jan 2025 – Mar 2025",
      desc:
        "Built end-to-end ML projects with reproducible workflows, delivering insights clearly to mixed audiences.",
      descBullets: [
        "Deep-learning app (Eyesense) using TensorFlow/Keras + Streamlit",
        "Agile teamwork with focus on real-world value"
      ]
    },
    {
      role: "Senior Research Scientist",
      company: "University of São Paulo",
      companylogo: require("./assets/images/uspLogo.png"),
      date: "Feb 2015 – May 2020",
      desc:
        "Designed predictive bioinformatics models on GPU clusters and mentored teams on analytics and reproducibility."
    },
    {
      role: "High School Teacher",
      company: "E. E. Governador Jânio Quadros",
      companylogo: require("./assets/images/schoolLogo.png"), // add this asset or replace
      date: "Apr 2021 – Mar 2023",
      desc:
        "Applied data-driven methods to evaluate performance and led PD workshops on evidence-based learning."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects */
const openSource = {
  showGithubProfile: "true",
  display: true
};

// Some big projects you have worked on
const bigProjects = {
  title: "Featured Projects",
  subtitle:
    "Selected work that shows how I approach data problems end-to-end.",
  projects: [
    {
      image: require("./assets/images/securemedLogo.png"), // optional logo
      projectName: "SecureMed Chat",
      projectDesc:
        "Privacy-first RAG chatbot for medical intake using zero-persistence architecture and scalable cloud deployment.",
      footerLink: [
        // Add your repo or demo links when available
        // { name: "Repository", url: "https://github.com/..." }
      ]
    },
    {
      image: require("./assets/images/eyesenseLogo.png"), // optional logo
      projectName: "Eyesense",
      projectDesc:
        "Deep-learning model for early eye-disease detection (TensorFlow/Keras) with emphasis on explainability.",
      footerLink: []
    },
    {
      image: require("./assets/images/etlLogo.png"), // optional logo
      projectName: "ETL Pipeline",
      projectDesc:
        "End-to-end pipeline transforming raw sales data into analytics-ready tables for BI dashboards (SQLAlchemy, PostgreSQL, Docker).",
      footerLink: []
    }
  ],
  display: true
};

// Achievement Section
const achievementSection = {
  title: emoji("Achievements & Certifications"),
  subtitle: "Selected highlights.",
  achievementsCards: [],
  display: false // hidden (no items in CV)
};

// Blogs Section
const blogSection = {
  title: "Blog",
  subtitle:
    "I write about practical data science and lessons learned from real projects.",
  displayMediumBlogs: "true",
  blogs: [],
  display: false // hidden (not in CV)
};

// Talks Section (hidden)
const talkSection = {
  title: "Talks",
  subtitle: emoji("I love sharing what I learn."),
  talks: [],
  display: false
};

// Podcast Section (hidden)
const podcastSection = {
  title: emoji("Podcast"),
  subtitle: "Conversations about data and impact.",
  podcast: [],
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume.",
  display: true
};

// Contact Section
const contactInfo = {
  title: emoji("Contact Me 📧"),
  subtitle:
    "Interested in collaborating or just want to say hi? My inbox is open.",
  email_address: "hello@erikachang.me"
};

// Twitter Section (hidden)
const twitterDetails = {
  userName: "",
  display: false
};

// Hiring flag
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
