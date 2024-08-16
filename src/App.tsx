import React, { useEffect, useState } from "react";
import "./App.css";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";

const App: React.FC = () => {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "enabled"
  );
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const darkModeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
      return newMode;
    });
  };

  const showAboutMe = (sectionId: string) => {
    const aboutMeTitle: HTMLElement | null =
      document.querySelector(".about-me-title");
    const aboutMeContent: HTMLElement | null =
      document.querySelector(".about-me-content");
    const skills: HTMLElement | null = document.querySelector(".skills");

    const changeStyle = (opacity: number, transform: number) => {
      if (aboutMeTitle) {
        aboutMeTitle.style.opacity = opacity.toString();
        aboutMeTitle.style.transform = `translateX(-${transform}px)`;
      }
      if (aboutMeContent) {
        aboutMeContent.style.opacity = opacity.toString();
        aboutMeContent.style.transform = `translateX(${transform}px)`;
      }
      if (skills) {
        setTimeout(() => {
          skills.style.opacity = opacity.toString();
        }, 1000);
      }
    };

    sectionId === "about-me" ? changeStyle(1, 0) : changeStyle(0, 500);
  };

  const showProjects = (sectionId: string) => {
    const projectTitle: HTMLElement | null =
      document.querySelector(".project-title");
    const projects: HTMLElement | null = document.querySelector(".projects");

    const changeStyle = (opacity: number, transform: number) => {
      if (projects) {
        projects.style.opacity = opacity.toString();
        projects.style.transform = `translateY(${transform}px)`;
      }
      if (projectTitle) {
        projectTitle.style.opacity = opacity.toString();
        projectTitle.style.transform = `translateX(${transform}px)`;
      }
    };

    sectionId === "projects" ? changeStyle(1, 0) : changeStyle(0, -1000);
  };

  const showContact = (sectionId: string) => {
    const contactTitle: HTMLElement | null =
      document.querySelector(".contact-title");
    const contactContent: HTMLElement | null =
      document.querySelector(".contact-content");

    const changeStyle = (opacity: number, transform: number) => {
      if (contactTitle) {
        contactTitle.style.opacity = opacity.toString();
        contactTitle.style.transform = `translateX(-${transform}px)`;
      }
      if (contactContent) {
        contactContent.style.opacity = opacity.toString();
        contactContent.style.transform = `translateX(${transform}px)`;
      }
    };

    sectionId === "contact" ? changeStyle(1, 0) : changeStyle(0, 500);
  };

  const downButton = (sectionId: string) => {
    const targetOffset = document.getElementById(sectionId)?.offsetTop || 0;
    window.scrollTo({ top: targetOffset, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const aboutMeOffset = document.getElementById("about-me")?.offsetTop || 0;
      const projectsOffset =
        document.getElementById("projects")?.offsetTop || 0;
      const contactOffset = document.getElementById("contact")?.offsetTop || 0;

      if (scrollPosition < aboutMeOffset - 500) {
        setActiveSection("home");
        showAboutMe("");
      } else if (
        scrollPosition >= aboutMeOffset - 100 &&
        scrollPosition < aboutMeOffset + 500
      ) {
        setActiveSection("about-me");
        showAboutMe("about-me");
        showProjects("");
      } else if (
        scrollPosition >= projectsOffset - 100 &&
        scrollPosition < projectsOffset + 500
      ) {
        setActiveSection("projects");
        showProjects("projects");
        showAboutMe("");
        showContact("");
      } else if (
        scrollPosition >= contactOffset - 100 &&
        scrollPosition < contactOffset + 500
      ) {
        setActiveSection("contact");
        showProjects("");
        showContact("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <nav className="section-menu">
                <ul className="section-list">
                  {["home", "about-me", "projects", "contact"].map(
                    (section) => (
                      <li
                        id="list"
                        key={section}
                        className={activeSection === section ? "active" : ""}
                        onClick={() => scrollToSection(section)}
                      >
                        {section.charAt(0).toUpperCase() +
                          section.slice(1).replace("-", " ")}
                      </li>
                    )
                  )}
                  <button onClick={darkModeToggle} className="mode-toggle">
                    {isDarkMode ? (
                      <div className="moon"></div>
                    ) : (
                      <div className="sun"></div>
                    )}
                  </button>
                </ul>
              </nav>

              <Main downButton={() => downButton("about-me")} />
              <AboutMe
                id="about-me"
                downButton={() => downButton("projects")}
              />
              <Projects
                id="projects"
                downButton={() => downButton("contact")}
              />
              <Contact id="contact" />
            </div>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProjectPage
              isDarkMode={isDarkMode}
              darkModeToggle={darkModeToggle}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
