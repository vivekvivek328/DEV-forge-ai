import { Search } from "lucide-react";

interface HistorySearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HistorySearch({ value, onChange }: HistorySearchProps) {
  return (
    <div className="relative px-1.5 pb-2">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-subtle-foreground" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search chats"
        aria-label="Search chats"
        className="w-full rounded-lg border border-hairline bg-surface py-1.5 pl-8 pr-2.5 text-[13px] placeholder:text-subtle-foreground focus:outline-none focus:ring-1 focus:ring-brand/40"
      />
    </div>
  );
}
