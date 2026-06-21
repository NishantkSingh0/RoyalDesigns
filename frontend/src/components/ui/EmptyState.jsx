export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {Icon && (
        <div className="mb-4 rounded-full bg-gray-100 p-4">
          <Icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-base font-semibold text-gray-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 max-w-sm mb-4">{description}</p>
      )}
      {action}
    </div>
  );
}
