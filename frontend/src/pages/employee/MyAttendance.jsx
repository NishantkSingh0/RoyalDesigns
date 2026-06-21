import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useAuthStore } from "../../store/authStore";
import { getAttendanceDetail } from "../../api/reports";
import { Spinner } from "../../components/ui/Spinner";

export default function MyAttendance() {
  const { user } = useAuthStore();
  const today = new Date();
  const [month, setMonth] = useState(format(today, "yyyy-MM"));

  const { data, isLoading } = useQuery({
    queryKey: ["my-attendance", user?.id, month],
    queryFn: () => getAttendanceDetail(user.id, month).then((r) => r.data),
    enabled: !!user?.id,
  });

  const attendance = data?.attendance ?? {};
  const dates = Object.keys(attendance).sort();

  const statusStyle = (s) => {
    if (s?.status === "present") return "bg-green-100 text-green-800 border border-green-200";
    if (s?.status === "absent") return "bg-red-50 text-red-500 border border-red-100";
    return "bg-gray-50 text-gray-300 border border-gray-100";
  };

  const presentCount = Object.values(attendance).filter((v) => v.status === "present").length;
  const absentCount = Object.values(attendance).filter((v) => v.status === "absent").length;

  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="month"
          className="input w-44"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          max={format(today, "yyyy-MM")}
        />
        <div className="flex gap-4 text-sm">
          <span className="text-green-700 font-semibold">{presentCount} Present</span>
          <span className="text-red-500 font-semibold">{absentCount} Absent</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : (
        <div className="card p-5">
          <div className="grid grid-cols-7 gap-1.5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
            {/* Fill empty cells before first date */}
            {(() => {
              const firstDate = dates[0] ? new Date(dates[0]) : null;
              const startDay = firstDate ? ((firstDate.getDay() + 6) % 7) : 0;
              return Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ));
            })()}
            {dates.map((d) => {
              const s = attendance[d];
              const day = parseInt(d.slice(8));
              return (
                <div
                  key={d}
                  className={`rounded-lg p-2 text-center text-xs font-medium ${statusStyle(s)}`}
                  title={`${d}: ${s?.status}`}
                >
                  <span className="block">{day}</span>
                  <span className="text-xs opacity-60">
                    {s?.status === "present" ? "P" : s?.status === "absent" ? "A" : "–"}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-green-100 inline-block" /> Present</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-red-50 inline-block" /> Absent</span>
            <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-gray-50 inline-block" /> Weekend</span>
          </div>
        </div>
      )}
    </div>
  );
}
