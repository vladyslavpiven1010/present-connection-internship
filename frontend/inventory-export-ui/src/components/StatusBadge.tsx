interface StatusBadgeProps {
  isActive: boolean;
}

export function StatusBadge({ isActive }: StatusBadgeProps) {
  return (
    <span
      className={
        isActive
          ? "inline-flex min-h-6 items-center rounded-full bg-emerald-100 px-2.5 text-xs font-extrabold text-emerald-800"
          : "inline-flex min-h-6 items-center rounded-full bg-amber-100 px-2.5 text-xs font-extrabold text-amber-800"
      }
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
