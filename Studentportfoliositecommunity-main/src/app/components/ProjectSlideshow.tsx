import { useNavigate } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Project } from "../data/projects";

interface ProjectSlideshowProps {
  projects: Project[];
}

export function ProjectSlideshow({ projects }: ProjectSlideshowProps) {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id} className="outline-none">
            <div
              className="relative h-[60vh] cursor-pointer group"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-white max-w-4xl">
                  <div className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs tracking-wide mb-4">
                    Graceland Student Hub
                  </div>
                  <div className="text-sm uppercase tracking-wider mb-2 opacity-90">
                    {project.category}
                  </div>
                  <h2 className="text-4xl md:text-6xl mb-4">
                    {project.title}
                  </h2>
                  <p className="text-lg opacity-90 line-clamp-2 max-w-2xl">
                    {project.description}
                  </p>
                  <button className="mt-6 px-6 py-3 rounded-md bg-white text-black hover:bg-gray-100 transition-colors font-medium">
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
