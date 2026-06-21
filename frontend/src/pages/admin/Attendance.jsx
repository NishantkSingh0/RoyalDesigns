import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { getAttendanceOverview } from "../../api/reports";
import { Spinner } from "../../components/ui/Spinner";

export default function Attendance() {
  const today = new Date();
  const [month, setMonth] = useState(format(today, "yyyy-MM"));

  const { data, isLoading } = useQuery({
    queryKey: ["attendance", month],
    queryFn: () => getAttendanceOverview(month).then((r) => r.data),
  });

  const employees = data?.employees ?? [];
  const allDates = employees[0]
    ? Object.keys(employees[0].attendance).sort()
    : [];

  const statusClass = (s) => {
    if (s === "present") return "bg-green-500 text-white";
    if (s === "absent") return "bg-red-100 text-red-700";
    if (s === "weekend") return "bg-gray-100 text-gray-400";
    return "bg-gray-100";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="month"
          className="input w-44"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          max={format(today, "yyyy-MM")}
        />
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-green-500 inline-block" />
            Present
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-red-100 inline-block" />
            Absent
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-gray-200 inline-block" />
            Weekend
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : employees.length === 0 ? (
        <div className="card p-8 text-center text-gray-400 text-sm">No attendance data for this period.</div>
      ) : (
        <div className="card overflow-auto">
          <table className="text-xs min-w-max w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="sticky left-0 bg-gray-50 text-left px-4 py-3 font-semibold text-gray-600 min-w-40">
                  Employee
                </th>
                {allDates.map((d) => (
                  <th key={d} className="px-1 py-3 font-medium text-gray-500 min-w-8 text-center">
                    {d.slice(8)}
                  </th>
                ))}
                <th className="px-3 py-3 font-semibold text-gray-600 text-center">Present</th>
                <th className="px-3 py-3 font-semibold text-gray-600 text-center">Absent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {employees.map((emp) => (
                <tr key={emp.employee_id} className="hover:bg-gray-50">
                  <td className="sticky left-0 bg-white px-4 py-2.5 font-medium text-gray-900">
                    {emp.employee_name}
                  </td>
                  {allDates.map((d) => {
                    const s = emp.attendance[d];
                    return (
                      <td key={d} className="px-1 py-2 text-center">
                        <span
                          className={`inline-flex items-center justify-center h-6 w-6 rounded text-xs font-medium ${statusClass(s)}`}
                          title={`${emp.employee_name} – ${d}: ${s}`}
                        >
                          {s === "present" ? "P" : s === "absent" ? "A" : "–"}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-3 py-2 text-center font-semibold text-green-700">
                    {emp.present_count}
                  </td>
                  <td className="px-3 py-2 text-center font-semibold text-red-500">
                    {emp.absent_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
