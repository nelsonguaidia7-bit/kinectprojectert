import { Link } from "react-router";
import { ackerlyItems, discoveryMetadata } from "../data/discoveredProjects";

export function AckerlyPortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl">Ackerly Posting Portfolio</h1>
          <Link to="/" className="underline text-sm hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12" id="ackerly-work">
        <section className="mb-10">
          <h2 className="text-3xl mb-3">Ackerly Work</h2>
          <p className="text-gray-600">
            Items below were discovered using keyword matching for &quot;Ackerly&quot; in
            approved scan roots.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Generated: {new Date(discoveryMetadata.generatedAt).toLocaleString()}
          </p>
        </section>

        <section className="space-y-4">
          {ackerlyItems.map((item) => (
            <article key={item.id} className="border border-gray-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg">{item.title}</h3>
                <span
                  className={`text-xs uppercase tracking-wide ${
                    item.source === "real" ? "text-green-700" : "text-amber-700"
                  }`}
                >
                  {item.source === "real" ? "Real source" : "Mock source"}
                </span>
              </div>
              <p className="text-sm text-gray-700">{item.snippet}</p>
              <p className="text-xs text-gray-500 mt-3 break-all">{item.sourcePath}</p>
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(item.updatedAt).toLocaleString()}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
