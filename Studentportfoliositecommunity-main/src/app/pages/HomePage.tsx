import { useMemo, useState } from "react";
import { ProjectSlideshow } from "../components/ProjectSlideshow";
import { ProjectGrid } from "../components/ProjectGrid";
import { StudentUploads } from "../components/StudentUploads";
import { projects } from "../data/projects";
import { Link } from "react-router";
import {
  discoveredProjects,
  discoveryMetadata,
} from "../data/discoveredProjects";

export function HomePage() {
  const combinedPortfolioProjects = [...projects, ...discoveredProjects];
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = useMemo(() => {
    const categories = new Set(combinedPortfolioProjects.map((project) => project.category));
    return ["All", ...Array.from(categories)];
  }, [combinedPortfolioProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return combinedPortfolioProjects;
    return combinedPortfolioProjects.filter((project) => project.category === selectedFilter);
  }, [combinedPortfolioProjects, selectedFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="border-b border-gray-200 bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">
            Discovery generated: {new Date(discoveryMetadata.generatedAt).toLocaleString()}
          </span>
          <Link to="/ackerly" className="text-blue-700 underline hover:text-blue-800">
            View Ackerly Posting Portfolio
          </Link>
        </div>
      </div>

      {/* Slideshow Banner */}
      <ProjectSlideshow projects={projects} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 mb-3">
            Presentation Edition
          </p>
          <h1 className="text-4xl md:text-5xl mb-4">Graceland Student Portfolio Platform</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Explore a polished showcase of student projects, campus opportunities, and collaborative learning experiences designed for Graceland presentations.
          </p>
        </div>

        <div className="mb-10">
          <div className="mb-3 text-sm font-medium text-gray-700">Filter projects</div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = selectedFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <ProjectGrid projects={filteredProjects} />

        <StudentUploads />

      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 mt-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>&copy; 2026 Graceland Student Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
