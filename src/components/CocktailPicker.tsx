import { useCocktails } from '../hooks/useCocktails';
import { getPlaceholderComponent } from '../assets/placeholders';
import type { Cocktail } from '../types';

export function CocktailPicker({
  onSelect,
  onClose,
}: {
  onSelect: (cocktail: Cocktail) => void;
  onClose: () => void;
}) {
  const { cocktails } = useCocktails();

  const renderImage = (cocktail: Cocktail) => {
    if (!cocktail.image) {
      const P = getPlaceholderComponent('martini');
      return <P className="w-full h-full p-1" />;
    }
    if (cocktail.image.startsWith('placeholder:')) {
      const key = cocktail.image.replace('placeholder:', '');
      const P = getPlaceholderComponent(key);
      return <P className="w-full h-full p-1" />;
    }
    return <img src={cocktail.image} alt={cocktail.name} className="w-full h-full object-cover" />;
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end" onClick={onClose}>
      <div
        className="bg-zinc-900 rounded-t-2xl w-full max-h-[70vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-4 border-b border-zinc-800">
          <h3 className="text-white text-lg font-semibold">Cocktail zur Einkaufsliste</h3>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {cocktails.length === 0 ? (
            <div className="text-center text-zinc-500 py-8">
              <span className="text-4xl block mb-2">🍸</span>
              <p>Noch keine Cocktails angelegt</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {cocktails.map((cocktail) => (
                <button
                  key={cocktail.id}
                  onClick={() => onSelect(cocktail)}
                  className="flex items-center gap-3 w-full p-3 bg-zinc-800 rounded-xl active:scale-[0.98] transition-transform text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {renderImage(cocktail)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-white font-medium block truncate">{cocktail.name}</span>
                    <span className="text-zinc-500 text-xs">
                      {cocktail.ingredients.length} Zutaten
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className="px-4 py-3 border-t border-zinc-800"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}
        >
          <button onClick={onClose} className="w-full py-3 text-zinc-400 text-sm">
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}
