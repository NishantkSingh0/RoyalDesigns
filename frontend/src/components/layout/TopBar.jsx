import { BellIcon } from "@heroicons/react/24/outline";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { listNotifications, markAllRead } from "../../api/notifications";
import { timeAgo } from "../../utils";

export function TopBar({ title }) {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => listNotifications().then((r) => r.data),
    refetchInterval: 30000,
  });

  const markAll = useMutation({
    mutationFn: markAllRead,
    onSuccess: () => qc.invalidateQueries(["notifications"]),
  });

  const notifications = data?.results ?? data ?? [];
  const unread = notifications.length;

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-base font-semibold text-gray-900">{title}</h1>

      <Menu as="div" className="relative">
        <Menu.Button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <BellIcon className="h-5 w-5" aria-hidden="true" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
          <span className="sr-only">Notifications</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-65 sm:w-90 card shadow-lg py-1 z-50 focus:outline-none">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">
                Notifications {unread > 0 && `(${unread})`}
              </span>
              {unread > 0 && (
                <button
                  onClick={() => markAll.mutate()}
                  className="text-xs text-brand-600 hover:text-brand-800"
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  No new notifications
                </p>
              ) : (
                notifications.map((n) => (
                  <Menu.Item key={n.id}>
                    {({ active }) => (
                      <div
                        className={`px-4 py-3 border-b border-gray-50 ${
                          active ? "bg-gray-50" : ""
                        }`}
                      >
                        <p className="text-sm text-gray-800">{n.verb}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {timeAgo(n.created_at)}
                        </p>
                      </div>
                    )}
                  </Menu.Item>
                ))
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </header>
  );
}
