import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DocumentIcon, PhotoIcon, TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { listFiles, deleteFile } from "../../api/files";
import { listUsers } from "../../api/users";
import { listProjects } from "../../api/projects";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, formatBytes } from "../../utils";

const FILE_TYPES = ["image", "cad", "pdf", "other"];

export default function Files() {
  const qc = useQueryClient();
  const [filterProject, setFilterProject] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterType, setFilterType] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["files", filterProject, filterEmployee, filterType],
    queryFn: () =>
      listFiles({
        ...(filterProject && { project: filterProject }),
        ...(filterEmployee && { employee: filterEmployee }),
        ...(filterType && { file_type: filterType }),
      }).then((r) => r.data),
  });

  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => listProjects().then((r) => r.data),
  });
  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers().then((r) => r.data),
  });

  const files = data?.results ?? data ?? [];
  const projects = projectsData?.results ?? projectsData ?? [];
  const employees = usersData?.results ?? usersData ?? [];

  const deleteMut = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => qc.invalidateQueries(["files"]),
  });

  const FileIcon = ({ type }) => {
    if (type === "image") return <PhotoIcon className="h-8 w-8 text-blue-400" />;
    return <DocumentIcon className="h-8 w-8 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select className="input w-44" value={filterProject} onChange={(e) => setFilterProject(e.target.value)}>
          <option value="">All Projects</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select className="input w-44" value={filterEmployee} onChange={(e) => setFilterEmployee(e.target.value)}>
          <option value="">All Employees</option>
          {employees.map((e) => <option key={e.id} value={e.id}>{e.full_name}</option>)}
        </select>
        <select className="input w-36" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {FILE_TYPES.map((t) => <option key={t} value={t}>{t.toUpperCase()}</option>)}
        </select>
        {(filterProject || filterEmployee || filterType) && (
          <button onClick={() => { setFilterProject(""); setFilterEmployee(""); setFilterType(""); }} className="btn-ghost text-sm">
            Clear
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : files.length === 0 ? (
        <EmptyState icon={DocumentIcon} title="No files found" description="Files uploaded by employees will appear here." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.map((f) => (
            <div key={f.id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <FileIcon type={f.file_type} />
                <div className="flex gap-1">
                  <a
                    href={f.file_url || f.file}
                    download={f.original_name}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost p-1.5 text-gray-400 hover:text-brand-600"
                    title="Download"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => confirm("Delete this file?") && deleteMut.mutate(f.id)}
                    className="btn-ghost p-1.5 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {f.file_type === "image" && f.file_url && (
                <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 h-32">
                  <img src={f.file_url} alt={f.original_name} className="h-full w-full object-cover" />
                </div>
              )}

              <p className="text-sm font-medium text-gray-900 truncate mb-1">{f.original_name}</p>
              <div className="text-xs text-gray-400 space-y-0.5">
                <p>By {f.uploaded_by_name}</p>
                <p>{fmtDate(f.uploaded_at)} · {formatBytes(f.size_bytes)}</p>
                <span className="badge-gray uppercase">{f.file_type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
