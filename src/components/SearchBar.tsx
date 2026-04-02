export function SearchBar({
  value,
  onChange,
  placeholder = 'Suchen...',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-zinc-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        >
          ✕
        </button>
      )}
    </div>
  );
}
