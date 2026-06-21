import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FolderIcon } from "@heroicons/react/24/outline";
import { listProjects } from "../../api/projects";
import { Spinner } from "../../components/ui/Spinner";
import { EmptyState } from "../../components/ui/EmptyState";
import { fmtDate, statusColors } from "../../utils";
import { Avatar } from "../../components/ui/Avatar";

export default function MyProjects() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-projects"],
    queryFn: () => listProjects().then((r) => r.data),
  });

  const projects = data?.results ?? data ?? [];

  if (isLoading) return <div className="flex justify-center py-16"><Spinner size="lg" /></div>;

  if (projects.length === 0) {
    return <EmptyState icon={FolderIcon} title="No projects yet" description="You'll see your assigned projects here." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((p) => (
        <Link key={p.id} to={`/my-projects/${p.id}`} className="card p-5 hover:shadow-md transition-shadow block">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{p.name}</h3>
            <span className={statusColors[p.status]}>{p.status.replace("_", " ")}</span>
          </div>
          {p.client_name && (
            <p className="text-xs text-gray-400 mb-2">Client: {p.client_name}</p>
          )}
          {p.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{p.description}</p>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex -space-x-2">
              {p.members?.slice(0, 4).map((m) => (
                <Avatar key={m.id} name={m.full_name} size="xs" className="ring-2 ring-white" />
              ))}
              {p.members?.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 ring-2 ring-white flex items-center justify-center text-xs text-gray-500">
                  +{p.members.length - 4}
                </div>
              )}
            </div>
            {p.deadline && <span className="text-xs text-gray-400">Due {fmtDate(p.deadline)}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
