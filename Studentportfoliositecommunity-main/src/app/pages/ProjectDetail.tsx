import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { projects } from "../data/projects";
import { discoveredProjects } from "../data/discoveredProjects";
import { toAuthorSlug } from "../lib/authorSlug";

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const allProjects = [...projects, ...discoveredProjects];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const project = allProjects.find((p) => p.id === id);
  const authorRoute = project ? `/author/${toAuthorSlug(project.author.name)}` : "/";
  const authorProfileLink =
    project?.author.github ?? project?.author.linkedin ?? project?.author.website;
  const authorProfileLabel = project?.author.github
    ? "GitHub"
    : project?.author.linkedin
      ? "LinkedIn"
      : project?.author.website
        ? "Website"
        : "Profile";
  const galleryImages = useMemo(() => {
    if (!project) return [];
    return project.images.length > 0 ? project.images : [project.coverImage];
  }, [project]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Project not found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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

      {/* Project Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Header */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                {project.category}
              </div>
              <h1 className="text-4xl md:text-5xl mb-6">{project.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Images Slideshow */}
            <div className="space-y-4">
              <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-xl">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={`${project.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? galleryImages.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white hover:bg-black/70"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === galleryImages.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/55 px-3 py-2 text-white hover:bg-black/70"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {galleryImages.map((image, index) => (
                    <button
                      key={`${project.id}-thumb-${index}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      className={`shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                        index === activeImageIndex ? "border-blue-600" : "border-transparent"
                      }`}
                      aria-label={`Show image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className="h-20 w-32 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Info */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide mb-4 text-gray-500">
                About the Author
              </h3>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <button
                    type="button"
                    onClick={() => navigate(authorRoute)}
                    className="text-left text-lg mb-1 underline-offset-2 hover:underline hover:text-blue-700 transition-colors"
                  >
                    {project.author.name}
                  </button>
                  <p className="text-sm text-gray-600">{project.author.bio}</p>
                  {project.author.linkedin ? (
                    <a
                      href={project.author.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-3 text-sm text-blue-700 hover:text-blue-800 underline"
                    >
                      View LinkedIn
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-sm uppercase tracking-wide mb-4 text-gray-500">
                Project Details
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Year
                  </div>
                  <div>{project.details.year}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Role
                  </div>
                  <div>{project.details.role}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Tools Used
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.details.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-white text-sm border border-gray-200 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                {authorProfileLink ? (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Profile Link
                    </div>
                    <a
                      href={authorProfileLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-700 hover:text-blue-800 underline"
                    >
                      View {authorProfileLabel}
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Other Projects */}
            <div>
              <h3 className="text-sm uppercase tracking-wide mb-4 text-gray-500">
                More Projects
              </h3>
              <div className="space-y-4">
                {allProjects
                  .filter((p) => p.id !== project.id)
                  .slice(0, 3)
                  .map((otherProject) => (
                    <div
                      key={otherProject.id}
                      className="cursor-pointer group"
                      onClick={() => navigate(`/project/${otherProject.id}`)}
                    >
                      <div className="flex gap-4">
                        <img
                          src={otherProject.coverImage}
                          alt={otherProject.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {otherProject.category}
                          </div>
                          <h4 className="text-sm group-hover:text-gray-600 transition-colors">
                            {otherProject.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2026 Graceland Student Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
