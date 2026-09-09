interface AvatarProps {
  initials: string;
  className?: string;
}

export function Avatar({ initials, className = "" }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={`grid size-8 shrink-0 place-items-center rounded-full bg-surface-strong text-xs font-semibold ${className}`}
    >
      {initials}
    </span>
  );
}
