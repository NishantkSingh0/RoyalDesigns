import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { AppLayout } from "./components/layout/AppLayout";

// Home pages
import Home from './Intropages/Home';
import About from './Intropages/About';
import Collections from './Intropages/Collections';
import Services from './Intropages/Services';
import Contact from './Intropages/Contact';
import Careers from './Intropages/Careers';

// Auth pages
import Login from "./pages/auth/Login";
import ForceChangePassword from "./pages/auth/ForceChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Projects from "./pages/admin/Projects";
import Tasks from "./pages/admin/Tasks";
import Reports from "./pages/admin/Reports";
import Attendance from "./pages/admin/Attendance";
import Files from "./pages/admin/Files";
import Meetings from "./pages/admin/Meetings";

// Employee pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import MyTasks from "./pages/employee/MyTasks";
import TaskDetail from "./pages/employee/TaskDetail";
import MyProjects from "./pages/employee/MyProjects";
import ProjectWorkspace from "./pages/employee/ProjectWorkspace";
import MyReports from "./pages/employee/MyReports";
import MyAttendance from "./pages/employee/MyAttendance";

// Route guards
function RequireAuth() {
  const { user, role } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (user.must_change_password) return <Navigate to="/change-password" replace />;
  return <Outlet />;
}

function RequireAdmin() {
  const { user, role } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function RequireEmployee() {
  const { user, role } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (role !== "employee") return <Navigate to="/admin/dashboard" replace />;
  return <Outlet />;
}

function RootRedirect() {
  const { user, role } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  if (user.must_change_password) return <Navigate to="/change-password" replace />;
  return <Navigate to={role === "admin" ? "/admin/dashboard" : "/dashboard"} replace />;
}

export const router = createBrowserRouter([
  // Public website
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/collections", element: <Collections /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },
  { path: "/careers", element: <Careers /> },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/change-password", element: <ForceChangePassword /> },

  // Admin routes
  {
    element: <RequireAdmin />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/admin/dashboard", element: <AdminDashboard /> },
          { path: "/admin/employees", element: <Employees /> },
          { path: "/admin/projects", element: <Projects /> },
          { path: "/admin/tasks", element: <Tasks /> },
          { path: "/admin/reports", element: <Reports /> },
          { path: "/admin/attendance", element: <Attendance /> },
          { path: "/admin/files", element: <Files /> },
          { path: "/admin/meetings", element: <Meetings /> },
        ],
      },
    ],
  },

  // Employee routes
  {
    element: <RequireEmployee />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <EmployeeDashboard /> },
          { path: "/my-tasks", element: <MyTasks /> },
          { path: "/my-tasks/:id", element: <TaskDetail /> },
          { path: "/my-projects", element: <MyProjects /> },
          { path: "/my-projects/:id", element: <ProjectWorkspace /> },
          { path: "/my-reports", element: <MyReports /> },
          { path: "/my-attendance", element: <MyAttendance /> },
        ],
      },
    ],
  },

  // Catch-all
  {
    path: "*",
    element: (
      <Navigate
        to={useAuthStore.getState().user ? "/dashboard" : "/"}
        replace
      />
    ),
  },
]);
