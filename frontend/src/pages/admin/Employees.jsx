import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PlusIcon, MagnifyingGlassIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { listUsers, createUser, deleteUser, updateUser } from "../../api/users";
import { Modal } from "../../components/ui/Modal";
import { Avatar } from "../../components/ui/Avatar";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate } from "../../utils";

export default function Employees() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [createError, setCreateError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => listUsers().then((r) => r.data),
  });

  const employees = (data?.results ?? data ?? []).filter((u) =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const createMut = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      qc.invalidateQueries(["users"]);
      setCreateOpen(false);
      resetForm();
      setCreateError("");
    },
    onError: (err) => {
      setCreateError(
        err.response?.data?.email?.[0] ||
          err.response?.data?.detail ||
          "Failed to create employee."
      );
    },
  });

  const deactivateMut = useMutation({
    mutationFn: (id) => updateUser(id, { is_active: false }),
    onSuccess: () => qc.invalidateQueries(["users"]),
  });

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm();

  const onCreateSubmit = (data) => {
    setCreateError("");
    createMut.mutate(data);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search employees…"
            className="input pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner size="lg" />
          </div>
        ) : employees.length === 0 ? (
          <EmptyState
            icon={UsersIcon}
            title="No employees yet"
            description="Add your first freelancer to get started."
            action={
              <button onClick={() => setCreateOpen(true)} className="hidden btn-primary sm:inline-flex items-center gap-2">
                <PlusIcon className="h-4 w-4" /> Add Employee
              </button>
            }
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Employee</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Phone</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Joined</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={emp.full_name} src={emp.avatar} size="sm" />
                      <span className="font-medium text-gray-900">{emp.full_name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{emp.email}</td>
                  <td className="px-5 py-3 text-gray-500">{emp.phone || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{fmtDate(emp.date_joined)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        emp.is_active ? "badge-green" : "badge-red"
                      }
                    >
                      {emp.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/employees/${emp.id}`}
                        className="btn-ghost p-1.5"
                        title="View profile"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      {emp.is_active && (
                        <button
                          onClick={() => {
                            if (confirm(`Deactivate ${emp.full_name}?`)) {
                              deactivateMut.mutate(emp.id);
                            }
                          }}
                          className="btn-ghost p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50"
                          title="Deactivate"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Employee Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => { setCreateOpen(false); resetForm(); setCreateError(""); }}
        title="Add New Employee"
      >
        {createError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {createError}
          </div>
        )}
        <form onSubmit={handleSubmit(onCreateSubmit)} noValidate className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" {...register("full_name", { required: "Required" })} />
            {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" {...register("email", { required: "Required" })} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label">Phone (optional)</label>
            <input type="tel" className="input" {...register("phone")} />
          </div>
          <div>
            <label className="label">Initial Password</label>
            <input
              type="password"
              className="input"
              placeholder="Min 8 chars, 1 uppercase, 1 digit"
              {...register("password", {
                required: "Required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
            />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={() => { setCreateOpen(false); resetForm(); }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting || createMut.isPending} className="btn-primary inline-flex items-center gap-2">
              {createMut.isPending ? <Spinner size="sm" /> : "Create Employee"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function UsersIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
