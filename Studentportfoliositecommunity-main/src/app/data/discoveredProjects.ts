import { Project } from "./projects";
import discoveredRaw from "./discovered-projects.json";

export interface DiscoveredProject extends Project {
  source: "real" | "mock";
  sourcePath: string;
  confidence: number;
}

export interface AckerlyItem {
  id: string;
  title: string;
  snippet: string;
  sourcePath: string;
  updatedAt: string;
  source: "real" | "mock";
}

interface DiscoveryPayload {
  rootsScanned: string[];
  generatedAt: string;
  realProjects: Array<Project & { source: "real"; sourcePath: string; confidence: number }>;
  ackerlyItems: AckerlyItem[];
}

const discoveryData = discoveredRaw as DiscoveryPayload;
const placeholderImage =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

function asWebImage(image: string): string {
  if (!image) return placeholderImage;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return placeholderImage;
}

function mockProjectFromReal(project: Project & { sourcePath: string }, index: number): DiscoveredProject {
  return {
    ...project,
    id: `mock-${index + 1}`,
    title: `${project.title} (Mock Showcase)`,
    description: `Mock portfolio page generated from discovered folder context for presentation use.`,
    coverImage: asWebImage(project.coverImage),
    images: project.images.length > 0 ? project.images.map(asWebImage) : [placeholderImage],
    source: "mock",
    sourcePath: project.sourcePath,
    confidence: 0,
  };
}

export const discoveredProjects: DiscoveredProject[] = discoveryData.realProjects.map((project) => ({
  ...project,
  coverImage: asWebImage(project.coverImage),
  images: project.images.length > 0 ? project.images.map(asWebImage) : [placeholderImage],
}));

export const mockProjects: DiscoveredProject[] = discoveryData.realProjects
  .filter((project) => !project.coverImage || project.images.length === 0)
  .slice(0, 6)
  .map((project, index) => mockProjectFromReal(project, index));

export const ackerlyItems: AckerlyItem[] =
  discoveryData.ackerlyItems.length > 0
    ? discoveryData.ackerlyItems
    : [
        {
          id: "ackerly-mock-1",
          title: "Ackerly Community Story Archive",
          snippet: "Mock posting draft generated because no direct Ackerly matches were found in scanned paths.",
          sourcePath: "generated/mock",
          updatedAt: new Date().toISOString(),
          source: "mock",
        },
      ];

export const discoveryMetadata = {
  rootsScanned: discoveryData.rootsScanned,
  generatedAt: discoveryData.generatedAt,
};
