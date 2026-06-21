import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { listReports, submitReport } from "../../api/reports";
import { listTasks } from "../../api/tasks";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate } from "../../utils";
import { format } from "date-fns";

export default function MyReports() {
  const qc = useQueryClient();
  const today = format(new Date(), "yyyy-MM-dd");

  const { data, isLoading } = useQuery({
    queryKey: ["my-reports"],
    queryFn: () => listReports().then((r) => r.data),
  });

  const { data: tasksData } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => listTasks().then((r) => r.data),
  });

  const reports = data?.results ?? data ?? [];
  const tasks = tasksData?.results ?? tasksData ?? [];
  const submittedToday = reports.some((r) => r.date === today);

  const submitMut = useMutation({
    mutationFn: submitReport,
    onSuccess: () => { qc.invalidateQueries(["my-reports"]); resetForm(); },
  });

  const { register, handleSubmit, reset: resetForm, formState: { errors } } = useForm();

  const onSubmit = (data) => submitMut.mutate({ ...data, task: data.task || null });

  return (
    <div className="max-w-2xl space-y-6">
      {/* Today's report form */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-1">
          Today's Report — {format(new Date(), "MMMM dd, yyyy")}
        </h3>
        {submittedToday ? (
          <div className="p-3 mt-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            ✓ You've already submitted your report for today.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
            <div>
              <label className="label">Link to Task (optional)</label>
              <select className="input" {...register("task")}>
                <option value="">No specific task</option>
                {tasks.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <div>
              <label className="label">What did you work on today?</label>
              <textarea
                rows={5}
                className="input"
                placeholder="Describe your progress, blockers, decisions made…"
                {...register("content", { required: "Please describe your work." })}
              />
              {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content.message}</p>}
            </div>
            <div className="w-36">
              <label className="label">Hours Worked</label>
              <input type="number" step="0.5" min="0" max="24" className="input" placeholder="e.g. 7" {...register("hours_worked")} />
            </div>
            <button type="submit" disabled={submitMut.isPending} className="btn-primary">
              {submitMut.isPending ? <Spinner size="sm" /> : "Submit Report"}
            </button>
          </form>
        )}
      </div>

      {/* Past reports */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Past Reports</h3>
        {isLoading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : reports.filter((r) => r.date !== today).length === 0 ? (
          <EmptyState icon={DocumentTextIcon} title="No past reports" description="Your submitted reports will appear here." />
        ) : (
          reports.filter((r) => r.date !== today).map((r) => (
            <div key={r.id} className="card p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800 text-sm">{fmtDate(r.date)}</span>
                <div className="flex gap-3 text-xs text-gray-400">
                  {r.task_title && <span>Task: {r.task_title}</span>}
                  {r.hours_worked && <span>{r.hours_worked}h</span>}
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">{r.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
