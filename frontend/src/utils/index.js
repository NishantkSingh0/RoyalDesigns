import { format, formatDistanceToNow, parseISO } from "date-fns";

export const fmtDate = (d) => {
  if (!d) return "—";
  try {
    return format(typeof d === "string" ? parseISO(d) : d, "dd MMM yyyy");
  } catch {
    return d;
  }
};

export const fmtDateTime = (d) => {
  if (!d) return "—";
  try {
    return format(typeof d === "string" ? parseISO(d) : d, "dd MMM yyyy, HH:mm");
  } catch {
    return d;
  }
};

export const timeAgo = (d) => {
  if (!d) return "";
  try {
    return formatDistanceToNow(typeof d === "string" ? parseISO(d) : d, {
      addSuffix: true,
    });
  } catch {
    return d;
  }
};

export const formatBytes = (bytes) => {
  if (!bytes) return "—";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const statusColors = {
  // Task status
  todo: "badge-gray",
  in_progress: "badge-blue",
  review: "badge-yellow",
  done: "badge-green",
  // Project status
  planning: "badge-gray",
  active: "badge-blue",
  on_hold: "badge-yellow",
  completed: "badge-green",
  // Meeting status
  scheduled: "badge-blue",
  cancelled: "badge-red",
  // Attendance
  present: "badge-green",
  absent: "badge-red",
  weekend: "badge-gray",
};

export const priorityColors = {
  low: "badge-gray",
  medium: "badge-blue",
  high: "badge-yellow",
  urgent: "badge-red",
};

export const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
