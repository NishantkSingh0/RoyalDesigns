import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getTask, updateTask } from "../../api/tasks";
import { submitReport, listReports } from "../../api/reports";
import { Spinner } from "../../components/ui/Spinner";
import { fmtDate, fmtDateTime, statusColors, priorityColors } from "../../utils";
import { format } from "date-fns";

const STATUS_OPTIONS = ["todo", "in_progress", "review", "done"];

export default function TaskDetail() {
  const { id } = useParams();
  const qc = useQueryClient();

  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getTask(id).then((r) => r.data),
  });

  const { data: reportsData } = useQuery({
    queryKey: ["task-reports", id],
    queryFn: () => listReports({ task: id }).then((r) => r.data),
  });

  const reports = reportsData?.results ?? reportsData ?? [];
  const today = format(new Date(), "yyyy-MM-dd");
  const reportedToday = reports.some((r) => r.date === today);

  const updateMut = useMutation({
    mutationFn: (status) => updateTask(id, { status }),
    onSuccess: () => qc.invalidateQueries(["task", id]),
  });

  const reportMut = useMutation({
    mutationFn: submitReport,
    onSuccess: () => {
      qc.invalidateQueries(["task-reports", id]);
      resetReport();
    },
  });

  const { register, handleSubmit, reset: resetReport, formState: { errors, isSubmitting } } = useForm();

  const onReportSubmit = (data) => {
    reportMut.mutate({ ...data, task: id });
  };

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;
  if (!task) return <p className="text-gray-500 text-sm">Task not found.</p>;

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/my-tasks" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeftIcon className="h-4 w-4" /> Back to Tasks
      </Link>

      {/* Task Info */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 className="text-xl font-bold text-gray-900">{task.title}</h2>
          <div className="flex gap-2 flex-shrink-0">
            <span className={priorityColors[task.priority]}>{task.priority}</span>
            <span className={statusColors[task.status]}>{task.status.replace("_", " ")}</span>
          </div>
        </div>

        {task.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{task.description}</p>
        )}

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          {task.project_name && (
            <div>
              <span className="text-xs text-gray-400 block">Project</span>
              <span className="text-gray-700">{task.project_name}</span>
            </div>
          )}
          {task.due_date && (
            <div>
              <span className="text-xs text-gray-400 block">Due Date</span>
              <span className="text-gray-700">{fmtDate(task.due_date)}</span>
            </div>
          )}
        </div>

        <div>
          <label className="label">Update Status</label>
          <select
            value={task.status}
            onChange={(e) => updateMut.mutate(e.target.value)}
            className="input w-48"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace("_", " ")}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Daily Report Form */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-1">
          Daily Report — {format(new Date(), "MMMM dd, yyyy")}
        </h3>
        {reportedToday ? (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            ✓ You've already submitted a report for today.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onReportSubmit)} className="space-y-4 mt-3">
            <div>
              <label className="label">What did you work on today?</label>
              <textarea
                rows={5}
                className="input"
                placeholder="Describe your progress, blockers, and what you plan to do next…"
                {...register("content", { required: "Please describe your work." })}
              />
              {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content.message}</p>}
            </div>
            <div className="w-32">
              <label className="label">Hours Worked</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="24"
                className="input"
                placeholder="e.g. 7.5"
                {...register("hours_worked")}
              />
            </div>
            <button type="submit" disabled={isSubmitting || reportMut.isPending} className="btn-primary">
              {reportMut.isPending ? <Spinner size="sm" /> : "Submit Report"}
            </button>
          </form>
        )}
      </div>

      {/* Past Reports */}
      {reports.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Past Reports</h3>
          <ul className="space-y-4">
            {reports.map((r) => (
              <li key={r.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{fmtDate(r.date)}</span>
                  {r.hours_worked && <span className="text-xs text-gray-400">{r.hours_worked}h</span>}
                </div>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{r.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
