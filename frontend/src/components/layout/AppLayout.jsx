import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

const pageTitles = {
  "/admin/dashboard": "Admin Dashboard",
  "/admin/employees": "Employees",
  "/admin/projects": "Projects",
  "/admin/tasks": "Tasks",
  "/admin/reports": "Daily Reports",
  "/admin/attendance": "Attendance",
  "/admin/files": "File Browser",
  "/admin/meetings": "Meetings",
  "/dashboard": "Dashboard",
  "/my-tasks": "My Tasks",
  "/my-projects": "My Projects",
  "/my-reports": "My Reports",
  "/my-attendance": "My Attendance",
};

export function AppLayout() {
  const { pathname } = useLocation();
  const title =
    Object.entries(pageTitles).find(([key]) => pathname.startsWith(key))?.[1] ??
    "FreelanceHQ";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
