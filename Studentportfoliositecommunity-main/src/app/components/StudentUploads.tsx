import { FormEvent, useEffect, useMemo, useState } from "react";

type MediaType = "image" | "video";

interface StudentSubmission {
  id: string;
  studentName: string;
  title: string;
  description: string;
  mediaType: MediaType;
  mediaDataUrl: string;
  createdAt: string;
}

const STORAGE_KEY = "graceland-student-submissions-v1";
const MAX_FILE_SIZE_MB = 25;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read the selected file."));
    reader.readAsDataURL(file);
  });
}

export function StudentUploads() {
  const [studentName, setStudentName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as StudentSubmission[];
      setSubmissions(parsed);
    } catch {
      setSubmissions([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const acceptAttr = useMemo(() => (mediaType === "image" ? "image/*" : "video/*"), [mediaType]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    if (!file) {
      setError("Please choose an image or video file.");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_SIZE_MB) {
      setError(`File is too large. Please upload up to ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const mediaDataUrl = await readFileAsDataUrl(file);
      const next: StudentSubmission = {
        id: crypto.randomUUID(),
        studentName: studentName.trim() || "Graceland Student",
        title: title.trim(),
        description: description.trim(),
        mediaType,
        mediaDataUrl,
        createdAt: new Date().toISOString(),
      };

      setSubmissions((prev) => [next, ...prev]);
      setTitle("");
      setDescription("");
      setStudentName("");
      setFile(null);
    } catch {
      setError("Could not process that file. Try another one.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRemove(id: string) {
    setSubmissions((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <section className="mt-14" id="student-submissions">
      <div className="mb-6">
        <h2 className="text-3xl mb-2">Student Media Submissions</h2>
        <p className="text-gray-600">
          Students can upload images or videos, add a description, and publish their work.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg mb-4">Publish New Submission</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Student Name</label>
              <input
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Project title"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe what you built and why it matters"
                rows={4}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Media Type</label>
              <select
                value={mediaType}
                onChange={(event) => {
                  setMediaType(event.target.value as MediaType);
                  setFile(null);
                }}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Upload File</label>
              <input
                type="file"
                accept={acceptAttr}
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                className="mt-1 w-full text-sm"
              />
              <p className="mt-1 text-xs text-gray-500">Max {MAX_FILE_SIZE_MB}MB per upload.</p>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {isSubmitting ? "Uploading..." : "Publish Submission"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg mb-4">Published by Students</h3>
          {submissions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No submissions yet. Publish the first student project media.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {submissions.map((item) => (
                <article key={item.id} className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-100">
                    {item.mediaType === "image" ? (
                      <img src={item.mediaDataUrl} alt={item.title} className="h-52 w-full object-cover" />
                    ) : (
                      <video src={item.mediaDataUrl} className="h-52 w-full object-cover" controls />
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-1 text-xs uppercase tracking-wide text-blue-700">{item.mediaType}</div>
                    <h4 className="text-lg leading-tight">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">{item.description}</p>
                    <div className="mt-3 text-xs text-gray-500">
                      By {item.studentName} · {new Date(item.createdAt).toLocaleString()}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="mt-3 text-xs text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
