import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusIcon, MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import { listTasks, createTask, updateTask, deleteTask } from "../../api/tasks";
import { listUsers } from "../../api/users";
import { listProjects } from "../../api/projects";
import { Modal } from "../../components/ui/Modal";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, statusColors, priorityColors } from "../../utils";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

const STATUS_OPTIONS = ["todo", "in_progress", "review", "done"];
const PRIORITY_OPTIONS = ["low", "medium", "high", "urgent"];

export default function Tasks() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [createError, setCreateError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => listTasks().then((r) => r.data),
  });
  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers().then((r) => r.data),
  });
  const { data: projectsData } = useQuery({
    queryKey: ["projects"],
    queryFn: () => listProjects().then((r) => r.data),
  });

  const tasks = (data?.results ?? data ?? []).filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.assigned_to_name || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || t.status === filterStatus;
    const matchPriority = !filterPriority || t.priority === filterPriority;
    return matchSearch && matchStatus && matchPriority;
  });

  const employees = usersData?.results ?? usersData ?? [];
  const projects = projectsData?.results ?? projectsData ?? [];

  const createMut = useMutation({
    mutationFn: createTask,
    onSuccess: () => { qc.invalidateQueries(["tasks"]); setCreateOpen(false); resetForm(); setCreateError(""); },
    onError: (err) => setCreateError(err.response?.data?.detail || "Failed to create task."),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, ...data }) => updateTask(id, data),
    onSuccess: () => qc.invalidateQueries(["tasks"]),
  });

  const deleteMut = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => qc.invalidateQueries(["tasks"]),
  });

  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm();

  const onCreateSubmit = (data) => {
    setCreateError("");
    createMut.mutate({
      ...data,
      project: data.project || null,
      assigned_to: data.assigned_to || null,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search tasks…"
              className="input pl-9 w-52"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="input w-36"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
          <select
            className="input w-36"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="h-4 w-4" /> New Task
        </button>
      </div>

      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : tasks.length === 0 ? (
          <EmptyState icon={ClipboardDocumentListIcon} title="No tasks found" description="Create a task to assign work to your team." />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Task</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Assigned To</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Project</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Priority</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Due</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 max-w-xs">
                    <p className="truncate">{task.title}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{task.assigned_to_name || "—"}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs truncate">{task.project_name || "—"}</td>
                  <td className="px-5 py-3">
                    <select
                      value={task.status}
                      onChange={(e) => updateMut.mutate({ id: task.id, status: e.target.value })}
                      className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.replace("_", " ")}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <span className={priorityColors[task.priority]}>{task.priority}</span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{fmtDate(task.due_date)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => confirm("Delete this task?") && deleteMut.mutate(task.id)}
                      className="btn-ghost p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => { setCreateOpen(false); resetForm(); setCreateError(""); }} title="Create Task">
        {createError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{createError}</div>
        )}
        <form onSubmit={handleSubmit(onCreateSubmit)} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" {...register("title", { required: "Required" })} />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>
          <div>
            <label className="label">Description (optional)</label>
            <textarea rows={3} className="input" {...register("description")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Assign To</label>
              <select className="input" {...register("assigned_to")}>
                <option value="">Select employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>{e.full_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Project (optional)</label>
              <select className="input" {...register("project")}>
                <option value="">No project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Priority</label>
              <select className="input" {...register("priority")}>
                {PRIORITY_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Due Date</label>
              <input type="date" className="input" {...register("due_date")} />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => { setCreateOpen(false); resetForm(); }} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={createMut.isPending} className="btn-primary inline-flex items-center gap-2">
              {createMut.isPending ? <Spinner size="sm" /> : "Create Task"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
