import { useQueries } from "@tanstack/react-query";
import { UsersIcon, FolderIcon, ClipboardDocumentListIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { listUsers } from "../../api/users";
import { listProjects } from "../../api/projects";
import { listTasks } from "../../api/tasks";
import { listMeetings } from "../../api/meetings";
import { listReports } from "../../api/reports";
import { StatCard } from "../../components/ui/StatCard";
import { fmtDate, statusColors, priorityColors, timeAgo } from "../../utils";

export default function AdminDashboard() {
  const [usersQ, projectsQ, tasksQ, meetingsQ, reportsQ] = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: () => listUsers().then((r) => r.data) },
      { queryKey: ["projects"], queryFn: () => listProjects().then((r) => r.data) },
      { queryKey: ["tasks"], queryFn: () => listTasks().then((r) => r.data) },
      { queryKey: ["meetings"], queryFn: () => listMeetings().then((r) => r.data) },
      { queryKey: ["recent-reports"], queryFn: () => listReports({ page_size: 5 }).then((r) => r.data) },
    ],
  });

  const users = usersQ.data?.results ?? usersQ.data ?? [];
  const projects = projectsQ.data?.results ?? projectsQ.data ?? [];
  const tasks = tasksQ.data?.results ?? tasksQ.data ?? [];
  const meetings = meetingsQ.data?.results ?? meetingsQ.data ?? [];
  const reports = reportsQ.data?.results ?? reportsQ.data ?? [];

  const activeTasks = tasks.filter((t) => t.status !== "done");
  const activeProjects = projects.filter((p) => p.status === "active");
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthMeetings = meetings.filter((m) => m.created_at?.startsWith(thisMonth));

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Employees"
          value={users.length}
          icon={UsersIcon}
          color="brand"
          trend="Active freelancers"
        />
        <StatCard
          label="Active Projects"
          value={activeProjects.length}
          icon={FolderIcon}
          color="green"
          trend={`${projects.length} total`}
        />
        <StatCard
          label="Open Tasks"
          value={activeTasks.length}
          icon={ClipboardDocumentListIcon}
          color="yellow"
          trend={`${tasks.filter((t) => t.status === "done").length} completed`}
        />
        <StatCard
          label="Meetings This Month"
          value={monthMeetings.length}
          icon={VideoCameraIcon}
          color="purple"
          trend={`${meetings.length} total`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Tasks</h2>
          {tasks.slice(0, 5).length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No tasks yet</p>
          ) : (
            <ul className="space-y-3">
              {tasks.slice(0, 5).map((t) => (
                <li key={t.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {t.assigned_to_name ?? "Unassigned"} · {fmtDate(t.due_date)}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <span className={statusColors[t.status]}>{t.status.replace("_", " ")}</span>
                    <span className={priorityColors[t.priority]}>{t.priority}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Reports */}
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Daily Reports</h2>
          {reports.slice(0, 5).length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No reports yet</p>
          ) : (
            <ul className="space-y-3">
              {reports.slice(0, 5).map((r) => (
                <li key={r.id} className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900">{r.employee_name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0">{fmtDate(r.date)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{r.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Projects overview */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Projects Overview</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-gray-400 py-4 text-center">No projects yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, 6).map((p) => (
              <div key={p.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                  <span className={statusColors[p.status]}>{p.status.replace("_", " ")}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{p.client_name || "Internal"}</p>
                <div className="flex gap-3 mt-3 text-xs text-gray-400">
                  <span>{p.task_count ?? 0} tasks</span>
                  <span>{p.members?.length ?? 0} members</span>
                  {p.deadline && <span>Due {fmtDate(p.deadline)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
