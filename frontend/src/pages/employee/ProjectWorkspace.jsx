import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowLeftIcon, CloudArrowUpIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { getProject, getProjectProgress, submitProgressUpdate } from "../../api/projects";
import { uploadFiles } from "../../api/files";
import { Spinner } from "../../components/ui/Spinner";
import { fmtDateTime, formatBytes, statusColors } from "../../utils";
import { Avatar } from "../../components/ui/Avatar";

export default function ProjectWorkspace() {
  const { id } = useParams();
  const qc = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProject(id).then((r) => r.data),
  });

  const { data: progressData } = useQuery({
    queryKey: ["project-progress", id],
    queryFn: () => getProjectProgress(id).then((r) => r.data),
  });

  const updates = progressData?.results ?? progressData ?? [];

  const progressMut = useMutation({
    mutationFn: (data) => submitProgressUpdate(id, data),
    onSuccess: () => { qc.invalidateQueries(["project-progress", id]); resetProgress(); },
  });

  const { register, handleSubmit, reset: resetProgress, formState: { errors } } = useForm();

  const onSubmitProgress = (data) => progressMut.mutate(data);

  // File dropzone
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setUploadError("");
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("project", id);
    acceptedFiles.forEach((file) => formData.append("files", file));
    try {
      await uploadFiles(formData, (e) => {
        setUploadProgress(Math.round((e.loaded * 100) / e.total));
      });
      qc.invalidateQueries(["project", id]);
      setUploadProgress(0);
    } catch (err) {
      setUploadError("Upload failed. Please try again.");
    }
  }, [id, qc]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
      "application/pdf": [".pdf"],
      ".dwg": [],
      ".dxf": [],
    },
    maxSize: 200 * 1024 * 1024,
  });

  if (projectLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;
  if (!project) return <p className="text-sm text-gray-500">Project not found.</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <Link to="/my-projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeftIcon className="h-4 w-4" /> Back to Projects
      </Link>

      {/* Project Header */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
          <span className={statusColors[project.status]}>{project.status.replace("_", " ")}</span>
        </div>
        {project.client_name && <p className="text-sm text-gray-400 mb-2">Client: {project.client_name}</p>}
        {project.description && <p className="text-sm text-gray-600">{project.description}</p>}
        <div className="flex items-center gap-2 mt-3">
          {project.members?.map((m) => <Avatar key={m.id} name={m.full_name} size="xs" />)}
        </div>
      </div>

      {/* Progress Update Form */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Post Progress Update</h3>
        <form onSubmit={handleSubmit(onSubmitProgress)} className="space-y-4">
          <div>
            <label className="label">Description</label>
            <textarea
              rows={4}
              className="input"
              placeholder="What have you done? What's the current status?"
              {...register("description", { required: "Required" })}
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
          </div>
          <div className="w-36">
            <label className="label">Completion % (optional)</label>
            <input type="number" min={0} max={100} className="input" {...register("completion_pct")} />
          </div>
          <button type="submit" disabled={progressMut.isPending} className="btn-primary">
            {progressMut.isPending ? <Spinner size="sm" /> : "Post Update"}
          </button>
        </form>
      </div>

      {/* File Upload */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Files</h3>
        {uploadError && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{uploadError}</div>
        )}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-brand-400 bg-brand-50" : "border-gray-200 hover:border-brand-300 hover:bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <CloudArrowUpIcon className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          {isDragActive ? (
            <p className="text-sm text-brand-600 font-medium">Drop files here</p>
          ) : (
            <>
              <p className="text-sm text-gray-600 font-medium">Drag & drop files or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">Images, PDFs, CAD files up to 200 MB</p>
            </>
          )}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mt-3">
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{uploadProgress}%</p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Timeline */}
      {updates.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Progress Timeline</h3>
          <div className="space-y-4">
            {updates.map((u, i) => (
              <div key={u.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-500 mt-1.5 flex-shrink-0" />
                  {i < updates.length - 1 && <div className="flex-1 w-px bg-gray-200 mt-1" />}
                </div>
                <div className="pb-4 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs text-gray-400">{fmtDateTime(u.created_at)}</span>
                    {u.completion_pct != null && (
                      <span className="badge-blue">{u.completion_pct}%</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{u.description}</p>
                  {u.files?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {u.files.map((f) => (
                        <a key={f.id} href={f.file_url || f.file} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 hover:bg-gray-200 transition-colors">
                          <DocumentIcon className="h-3.5 w-3.5" />
                          {f.original_name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
