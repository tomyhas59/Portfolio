import { useNavigate, useParams } from "react-router-dom";
import projectsData from "../data/projects.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

const ProjectPage: React.FC<{
  isDarkMode: boolean;
  darkModeToggle: () => void;
}> = ({ isDarkMode, darkModeToggle }) => {
  const { id } = useParams();
  const project = projectsData.find((project) => project.id === Number(id));
  const navigator = useNavigate();

  useEffect(() => {
    openCurtain("slideDown");
  }, []);

  if (!project) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  const openCurtain = (direction: string) => {
    const $curtain = document.querySelector(".curtain") as HTMLElement | null;
    if ($curtain) {
      $curtain.style.animation = "none";
      void $curtain.offsetHeight;
      $curtain.style.animation = `${direction} 1s  ease-in-out forwards`;
    }
  };

  const handleProject = (num: number) => {
    const currentIndex = projectsData.findIndex(
      (project) => project.id === Number(id)
    );
    const ProjectId = projectsData[currentIndex + num].id;

    navigator(`/projects/${ProjectId}`);
  };

  const nextProject = () => {
    openCurtain("slideRight");
    handleProject(1);
  };

  const prevProject = () => {
    openCurtain("slideLeft");
    handleProject(-1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="projectPageWrapper">
      <div className="curtain"></div>
      <div className="projectPageContent">
        <button onClick={darkModeToggle} className="modeToggle">
          {isDarkMode ? (
            <li className="moon">DARK</li>
          ) : (
            <li className="sun">LIGHT</li>
          )}
        </button>
        <h2 className="projectName">{project.name}</h2>
        <p className="description">{project.description}</p>
        <Slider {...settings} className="projectItem">
          {project.imgs.map((img, index) => (
            <a
              className="projectLink"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
            >
              <img
                className="projectImg"
                src={require(`../img/${img}`)}
                alt={`${project.name} 이미지 ${index}`}
              />
            </a>
          ))}
        </Slider>
        <div className="goToSite">
          <a className="site" href="/">
            홈으로
          </a>
          <a className="site" href={project.url} target="blank">
            사이트
          </a>
          <a className="site" href={project.gitHub} target="blank">
            깃허브
          </a>
        </div>
        {project.detail && (
          <div className="projectDetail">
            <div className="clientDetail">
              <div className="detailTitle">client</div>
              <ul>
                {project.detail?.client.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="serverDetail">
              {project.detail?.server && (
                <>
                  <div className="detailTitle">server</div>
                  <ul>
                    {project.detail.server.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {id === "1" ? null : (
        <button className="prevProject" onClick={prevProject}>
          prev &nbsp;
        </button>
      )}
      {id === `${projectsData.length}` ? null : (
        <button className="nextProject" onClick={nextProject}>
          &nbsp; next
        </button>
      )}
    </div>
  );
};

export default ProjectPage;
