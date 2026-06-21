import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PlusIcon, VideoCameraIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import { listMeetings, createMeeting, updateMeeting } from "../../api/meetings";
import { Modal } from "../../components/ui/Modal";
import { useState, useEffect } from "react";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDateTime, statusColors } from "../../utils";

const STATUS_OPTIONS = ["scheduled", "completed", "cancelled"];

export default function Meetings() {
  const qc = useQueryClient();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [createError, setCreateError] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["meetings", filterStatus, filterClient],
    queryFn: () => listMeetings({ ...(filterStatus && { status: filterStatus }), ...(filterClient && { client_name: filterClient }) }).then((r) => r.data),
  });

  const meetings = data?.results ?? data ?? [];

  const createMut = useMutation({
    mutationFn: createMeeting,
    onSuccess: () => { qc.invalidateQueries(["meetings"]); setCreateOpen(false); resetForm(); setCreateError(""); },
    onError: (err) => setCreateError(err.response?.data?.detail || "Failed to create meeting."),
  });

  const updateMut = useMutation({
    mutationFn: ({ id, ...data }) => updateMeeting(id, data),
    onSuccess: () => qc.invalidateQueries(["meetings"]),
  });

  const {register, handleSubmit, reset: resetForm, formState: { errors }} = useForm({defaultValues: {scheduled_at: getISTDateTimeLocal()}});

  const onSubmit = (data) => {
    setCreateError("");
    createMut.mutate(data);
  };
  
  useEffect(() => {
    if (isCreateOpen) {
      resetForm({
        scheduled_at: getISTDateTimeLocal(),
      });
    }
  }, [isCreateOpen, resetForm]);

  function getISTDateTimeLocal() {
    const now = new Date();

    // Convert to IST
    const ist = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Add 5 minutes
    ist.setMinutes(ist.getMinutes() + 5);

    const pad = (n) => String(n).padStart(2, "0");

    return `${ist.getFullYear()}-${pad(ist.getMonth() + 1)}-${pad(
      ist.getDate()
    )}T${pad(ist.getHours())}:${pad(ist.getMinutes())}`;
  }

  const copyLink = (id, link) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Filter by client…"
            className="input w-48"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
          />
          <select className="input w-40" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary inline-flex items-center gap-2">
          <PlusIcon className="h-4 w-4" /> Generate Meeting
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : meetings.length === 0 ? (
        <EmptyState icon={VideoCameraIcon} title="No meetings yet" description="Generate a Google Meet link for your next client call." action={<button onClick={() => setCreateOpen(true)} className="btn-primary inline-flex items-center gap-2"><PlusIcon className="h-4 w-4" /> Generate Meeting</button>} />
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Client</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Purpose</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Scheduled</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Meet Link</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {meetings.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900">{m.client_name}</td>
                  <td className="px-5 py-3 text-gray-500 max-w-xs">
                    <p className="truncate">{m.purpose}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{fmtDateTime(m.scheduled_at)}</td>
                  <td className="px-5 py-3">
                    <select
                      value={m.status}
                      onChange={(e) => updateMut.mutate({ id: m.id, status: e.target.value })}
                      className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <a
                      href={m.meet_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 hover:text-brand-800 text-xs truncate max-w-xs block"
                    >
                      {m.meet_link}
                    </a>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => copyLink(m.id, m.meet_link)}
                      className="btn-ghost p-1.5"
                      title="Copy link"
                    >
                      {copiedId === m.id ? (
                        <CheckIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <ClipboardDocumentIcon className="h-4 w-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isCreateOpen} onClose={() => { setCreateOpen(false); resetForm(); setCreateError(""); }} title="Generate Google Meet">
        {createError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">{createError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Client Name</label>
            <input className="input" {...register("client_name", { required: "Required" })} />
            {errors.client_name && <p className="mt-1 text-xs text-red-600">{errors.client_name.message}</p>}
          </div>
          <div>
            <label className="label">Purpose / Agenda</label>
            <textarea rows={3} className="input" {...register("purpose", { required: "Required" })} />
            {errors.purpose && <p className="mt-1 text-xs text-red-600">{errors.purpose.message}</p>}
          </div>
          <div>
            <label className="label">Scheduled Date & Time</label>
            <input type="datetime-local" className="input" {...register("scheduled_at")} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={() => { setCreateOpen(false); resetForm(); }} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={createMut.isPending} className="btn-primary inline-flex items-center gap-2">
              {createMut.isPending ? <Spinner size="sm" /> : "Generate Link"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
