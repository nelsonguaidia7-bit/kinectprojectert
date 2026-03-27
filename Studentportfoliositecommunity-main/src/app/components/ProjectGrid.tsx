import { useNavigate } from "react-router";
import { Project } from "../data/projects";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute left-4 top-4">
              <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-medium tracking-wide text-white">
                {project.category}
              </span>
            </div>
          </div>
          <div className="space-y-2 p-5">
            <h3 className="text-xl leading-tight group-hover:text-blue-700 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-600 line-clamp-2 text-sm">
              {project.description}
            </p>
            <div className="pt-2 text-sm font-medium text-blue-700 group-hover:text-blue-800">
              Open project details →
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
