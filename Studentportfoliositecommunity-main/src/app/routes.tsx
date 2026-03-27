import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { ProjectDetail } from "./pages/ProjectDetail";
import { AckerlyPortfolioPage } from "./pages/AckerlyPortfolioPage";
import { AuthorDetail } from "./pages/AuthorDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/project/:id",
    Component: ProjectDetail,
  },
  {
    path: "/author/:authorId",
    Component: AuthorDetail,
  },
  {
    path: "/ackerly",
    Component: AckerlyPortfolioPage,
  },
]);
