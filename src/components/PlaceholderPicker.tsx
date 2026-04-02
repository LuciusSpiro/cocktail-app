import { placeholders, placeholderKeys } from '../assets/placeholders';

export function PlaceholderPicker({
  onSelect,
  onClose,
}: {
  onSelect: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center" onClick={onClose}>
      <div
        className="bg-zinc-900 rounded-t-2xl w-full max-w-lg p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white text-lg font-semibold mb-4">Platzhalterbild wählen</h3>
        <div className="grid grid-cols-4 gap-3">
          {placeholderKeys.map((key) => {
            const Component = placeholders[key];
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className="bg-zinc-800 rounded-xl p-3 aspect-square flex items-center justify-center active:scale-95 transition-transform hover:bg-zinc-700"
              >
                <Component className="w-full h-full" />
              </button>
            );
          })}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-3 text-zinc-400 text-sm"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
