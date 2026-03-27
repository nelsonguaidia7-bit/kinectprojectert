import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { discoveredProjects } from "../data/discoveredProjects";
import { projects } from "../data/projects";
import { toAuthorSlug } from "../lib/authorSlug";

export function AuthorDetail() {
  const { authorId } = useParams<{ authorId: string }>();
  const navigate = useNavigate();

  const allProjects = useMemo(() => [...projects, ...discoveredProjects], []);
  const authoredProjects = useMemo(
    () =>
      allProjects.filter(
        (project) => authorId && toAuthorSlug(project.author.name) === authorId,
      ),
    [allProjects, authorId],
  );

  const author = authoredProjects[0]?.author;

  if (!author || !authorId) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-10"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
            <h1 className="text-3xl mb-3">Author not found</h1>
            <p className="text-gray-600">
              We could not find any projects for this author.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10 rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="text-sm uppercase tracking-wide text-gray-500">
                Author View
              </p>
              <h1 className="text-3xl md:text-4xl">{author.name}</h1>
              <p className="mt-2 text-gray-700">{author.bio}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">Listed Projects</h2>
            <p className="text-gray-600 mt-1">
              {authoredProjects.length} project
              {authoredProjects.length === 1 ? "" : "s"} by this author
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authoredProjects.map((project) => (
            <article
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                  {project.category}
                </p>
                <h3 className="text-lg group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
