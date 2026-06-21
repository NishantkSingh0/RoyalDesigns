import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { listTasks } from "../../api/tasks";
import { listProjects } from "../../api/projects";
import { listReports } from "../../api/reports";
import { StatCard } from "../../components/ui/StatCard";
import { fmtDate, statusColors, priorityColors } from "../../utils";
import { ClipboardDocumentListIcon, FolderIcon, DocumentTextIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function EmployeeDashboard() {
  const { user } = useAuthStore();

  const { data: tasksData } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => listTasks().then((r) => r.data),
  });
  const { data: projectsData } = useQuery({
    queryKey: ["my-projects"],
    queryFn: () => listProjects().then((r) => r.data),
  });
  const { data: reportsData } = useQuery({
    queryKey: ["my-reports"],
    queryFn: () => listReports().then((r) => r.data),
  });

  const tasks = tasksData?.results ?? tasksData ?? [];
  const projects = projectsData?.results ?? projectsData ?? [];
  const reports = reportsData?.results ?? reportsData ?? [];

  const today = format(new Date(), "yyyy-MM-dd");
  const submittedToday = reports.some((r) => r.date === today);
  const pendingTasks = tasks.filter((t) => t.status !== "done");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="space-y-6">
      {/* Welcome + today reminder */}
      <div className="card p-5 bg-linear-to-r from-brand-600 to-indigo-600 text-white">
        <h2 className="text-xl font-bold mb-1">
          Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {user?.full_name?.split(" ")[0]} 👋
        </h2>
        {!submittedToday ? (
          <p className="text-brand-100 text-sm">
            Don't forget to submit your{" "}
            <Link to="/my-reports" className="underline font-semibold text-white">
              daily report
            </Link>{" "}
            for today.
          </p>
        ) : (
          <p className="text-brand-100 text-sm">
            Daily report submitted ✓ — keep up the great work!
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Tasks" value={pendingTasks.length} icon={ClipboardDocumentListIcon} color="yellow" />
        <StatCard label="Completed Tasks" value={doneTasks.length} icon={CheckCircleIcon} color="green" />
        <StatCard label="My Projects" value={projects.length} icon={FolderIcon} color="brand" />
        <StatCard label="Reports This Month" value={reports.filter((r) => r.date?.startsWith(today.slice(0, 7))).length} icon={DocumentTextIcon} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Pending Tasks</h3>
            <Link to="/my-tasks" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          {pendingTasks.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">All caught up! 🎉</p>
          ) : (
            <ul className="space-y-2">
              {pendingTasks.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <Link to={`/my-tasks/${t.id}`} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                      {t.due_date && <p className="text-xs text-gray-400">Due {fmtDate(t.due_date)}</p>}
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <span className={statusColors[t.status]}>{t.status.replace("_", " ")}</span>
                      <span className={priorityColors[t.priority]}>{t.priority}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Projects */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">My Projects</h3>
            <Link to="/my-projects" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No projects assigned yet.</p>
          ) : (
            <ul className="space-y-2">
              {projects.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link to={`/my-projects/${p.id}`} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                    <span className={statusColors[p.status]}>{p.status.replace("_", " ")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
