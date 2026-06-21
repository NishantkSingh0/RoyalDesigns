import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { listTasks, updateTask } from "../../api/tasks";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, statusColors, priorityColors } from "../../utils";

const STATUS_OPTIONS = ["todo", "in_progress", "review", "done"];

export default function MyTasks() {
  const qc = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => listTasks().then((r) => r.data),
  });

  const tasks = (data?.results ?? data ?? []).filter(
    (t) => !filterStatus || t.status === filterStatus
  );

  const updateMut = useMutation({
    mutationFn: ({ id, status }) => updateTask(id, { status }),
    onSuccess: () => qc.invalidateQueries(["my-tasks"]),
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["", ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === s
                ? "bg-brand-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s ? s.replace("_", " ") : "All"}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : tasks.length === 0 ? (
        <EmptyState icon={ClipboardDocumentListIcon} title="No tasks found" description="Tasks assigned to you will appear here." />
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <Link to={`/my-tasks/${task.id}`} className="font-semibold text-gray-900 hover:text-brand-600 transition-colors">
                    {task.title}
                  </Link>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    {task.project_name && <span>Project: {task.project_name}</span>}
                    {task.due_date && <span>Due {fmtDate(task.due_date)}</span>}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className={priorityColors[task.priority]}>{task.priority}</span>
                  <select
                    value={task.status}
                    onChange={(e) => updateMut.mutate({ id: task.id, status: e.target.value })}
                    className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white focus:border-brand-400 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
