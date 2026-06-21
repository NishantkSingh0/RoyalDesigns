import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { listReports } from "../../api/reports";
import { listUsers } from "../../api/users";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, fmtDateTime } from "../../utils";
import { Avatar } from "../../components/ui/Avatar";

export default function Reports() {
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["reports", filterEmployee, filterDate],
    queryFn: () =>
      listReports({
        ...(filterEmployee && { employee: filterEmployee }),
        ...(filterDate && { date: filterDate }),
      }).then((r) => r.data),
  });

  const { data: usersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers().then((r) => r.data),
  });

  const reports = data?.results ?? data ?? [];
  const employees = usersData?.results ?? usersData ?? [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select
          className="input w-48"
          value={filterEmployee}
          onChange={(e) => setFilterEmployee(e.target.value)}
        >
          <option value="">All Employees</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>{e.full_name}</option>
          ))}
        </select>
        <input
          type="date"
          className="input w-44"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        {(filterEmployee || filterDate) && (
          <button
            onClick={() => { setFilterEmployee(""); setFilterDate(""); }}
            className="btn-ghost text-sm"
          >
            Clear filters
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : reports.length === 0 ? (
        <EmptyState icon={DocumentTextIcon} title="No reports found" description="Reports appear here after employees submit them." />
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="card p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar name={r.employee_name} size="sm" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.employee_name}</p>
                    {r.task_title && (
                      <p className="text-xs text-gray-400">Task: {r.task_title}</p>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">{fmtDate(r.date)}</p>
                  {r.hours_worked && (
                    <p className="text-xs text-gray-400">{r.hours_worked}h worked</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{r.content}</p>
              <p className="text-xs text-gray-400 mt-2">{fmtDateTime(r.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
