import { NavLink, useNavigate } from "react-router-dom";
import { HomeIcon, UsersIcon, FolderIcon, ClipboardDocumentListIcon, CalendarDaysIcon, DocumentTextIcon, VideoCameraIcon, ChevronDownIcon, ArrowRightOnRectangleIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../../store/authStore";
import { logout } from "../../api/auth";
import { Avatar } from "../ui/Avatar";
import { useState } from "react";


const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/admin/employees", label: "Employees", icon: UsersIcon },
  { to: "/admin/projects", label: "Projects", icon: FolderIcon },
  { to: "/admin/tasks", label: "Tasks", icon: ClipboardDocumentListIcon },
  { to: "/admin/reports", label: "Daily Reports", icon: DocumentTextIcon },
  { to: "/admin/attendance", label: "Attendance", icon: CalendarDaysIcon },
  { to: "/admin/files", label: "Files", icon: BriefcaseIcon },
  { to: "/admin/meetings", label: "Meetings", icon: VideoCameraIcon },
];

const employeeNav = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/my-tasks", label: "My Tasks", icon: ClipboardDocumentListIcon },
  { to: "/my-projects", label: "My Projects", icon: FolderIcon },
  { to: "/my-reports", label: "Daily Reports", icon: DocumentTextIcon },
  { to: "/my-attendance", label: "Attendance", icon: CalendarDaysIcon },
];

export function Sidebar() {
  const { user, role, logout: storeLogout } = useAuthStore();
  const navigate = useNavigate();
  const nav = role === "admin" ? adminNav : employeeNav;
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
    } catch {}
    storeLogout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className="group sticky top-0 h-screen w-10 sm:w-18 hover:w-44 sm:hover:w-64 bg-gray-900 text-white transition-all duration-300 ease-in-out overflow-hidden flex flex-col shrink-0"
    >
      {/* Logo */}
      <div className="border-b-2 border-amber-400 mx-1 sm:mx-4 pt-5 pb-2">
        <div className="flex items-center">
          <div className="h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </div>

          <span
            className="ml-3 whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-bold bg-linear-to-r from-yellow-600 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
          >
            Royal Designs
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-0 sm:px-2 py-4 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center rounded-lg px-2 sm:px-4 py-2 transition-all duration-200  ${
                isActive
                  ? "bg-brand-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />

            <span
              className="ml-3 whitespace-nowrap overflow-hidden opacity-0 w-0 group-hover:w-auto group-hover:opacity-100 transition-all duration-300"
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="border-t border-gray-800 p-0 sm:p-2 mb-4 group/profile">
        {/* Profile */}
        <NavLink
          to={role === "admin" ? "/admin/profile" : "/profile"}
          className="flex items-center rounded-lg px-2 py-2 hover:bg-gray-800 transition-all"
        >
          <Avatar name={user?.full_name} src={user?.avatar} size="responsive"/>

          <div className="ml-3 overflow-hidden whitespace-nowrap max-w-0 opacity-0 transition-all duration-300 group-hover:max-w-45 group-hover:opacity-100">
            <p className="text-sm font-medium text-white truncate">
              {user?.full_name}
            </p>
            <p className="text-xs text-gray-500 capitalize">{role}</p>
          </div>
        </NavLink>

        {/* Logout */}
        <div
          className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover/profile:max-h-20 group-hover/profile:opacity-100"
        >
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center rounded-lg px-2 py-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0" />

            <span className="ml-3 overflow-hidden whitespace-nowrap max-w-0 opacity-0 transition-all duration-300 group-hover:max-w-45 group-hover:opacity-100">
              Sign out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}