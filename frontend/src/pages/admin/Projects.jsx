import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PlusIcon, FolderIcon } from "@heroicons/react/24/outline";
import { listProjects, createProject } from "../../api/projects";
import { listUsers } from "../../api/users";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, statusColors } from "../../utils";

const STATUS_OPTIONS = ["planning", "active", "on_hold", "completed"];

export default function Projects() {
  const qc = useQueryClient();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [createError, setCreateError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => listProjects().then((r) => r.data),
  });
  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers().then((r) => r.data),
  });

  const projects = data?.results ?? data ?? [];
  const employees = usersData?.results ?? usersData ?? [];

  const createMut = useMutation({
    mutationFn: createProject,
    onSuccess: () => { qc.invalidateQueries(["projects"]); setCreateOpen(false); resetForm(); },
    onError: (err) => setCreateError(err.response?.data?.detail || "Failed to create project."),
  });

  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm({ defaultValues: { status: "planning" } });

  const onSubmit = (data) => {
    createMut.mutate({
      ...data,
      member_ids: data.member_ids ? [data.member_ids].flat().filter(Boolean) : [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setCreateOpen(true)} className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="h-4 w-4" /> New Project
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : projects.length === 0 ? (
        <EmptyState icon={FolderIcon} title="No projects yet" description="Create your first project." action={<button onClick={() => setCreateOpen(true)} className="btn-primary"><PlusIcon className="h-4 w-4" /> New Project</button>} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <Link key={p.id} to={`/admin/projects/${p.id}`} className="card p-5 hover:shadow-md transition-shadow block">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-gray-900 truncate">{p.name}</h3>
                <span className={statusColors[p.status]}>{p.status.replace("_", " ")}</span>
              </div>
              {p.client_name && <p className="text-xs text-gray-400 mb-2">Client: {p.client_name}</p>}
              {p.description && <p className="text-sm text-gray-500 line-clamp-2 mb-3">{p.description}</p>}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex gap-3">
                  <span>{p.task_count ?? 0} tasks</span>
                  <span>{p.members?.length ?? 0} members</span>
                </div>
                {p.deadline && <span>Due {fmtDate(p.deadline)}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}

      <Modal isOpen={isCreateOpen} onClose={() => { setCreateOpen(false); resetForm(); setCreateError(""); }} title="Create Project">
        {createError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{createError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Project Name</label>
            <input className="input" {...register("name", { required: "Required" })} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Client Name (optional)</label>
            <input className="input" {...register("client_name")} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea rows={3} className="input" {...register("description")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select className="input" {...register("status")}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Deadline</label>
              <input type="date" className="input" {...register("deadline")} />
            </div>
          </div>
          <div>
            <label className="label">Add Members</label>
            <select multiple className="input h-32" {...register("member_ids")}>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.full_name}</option>)}
            </select>
            <p className="mt-1 text-xs text-gray-400">Hold Cmd/Ctrl to select multiple</p>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => { setCreateOpen(false); resetForm(); }} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={createMut.isPending} className="btn-primary inline-flex items-center gap-2">
              {createMut.isPending ? <Spinner size="sm" /> : "Create Project"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
