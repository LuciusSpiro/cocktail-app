import { useState, useEffect, useCallback } from 'react';
import { useShoppingList } from '../hooks/useShoppingList';
import { useSaveAction } from '../hooks/useSaveAction';
import { CocktailPicker } from '../components/CocktailPicker';
import type { Cocktail } from '../types';

export function ShoppingList() {
  const { items, loading, addFromCocktail, removeItem } = useShoppingList();
  const { registerPlusOverride, clearPlusOverride } = useSaveAction();
  const [showPicker, setShowPicker] = useState(false);

  const openPicker = useCallback(() => setShowPicker(true), []);

  useEffect(() => {
    registerPlusOverride(openPicker);
    return () => clearPlusOverride();
  }, [openPicker, registerPlusOverride, clearPlusOverride]);

  const handleSelectCocktail = async (cocktail: Cocktail) => {
    await addFromCocktail(cocktail.ingredients);
    setShowPicker(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-zinc-500">Laden...</span>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6">Einkaufsliste</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
          <span className="text-6xl mb-4">🛒</span>
          <p className="text-lg">Einkaufsliste leer</p>
          <p className="text-sm mt-1">Tippe auf + um Zutaten eines Cocktails hinzuzufügen</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 w-full p-3 bg-zinc-900 rounded-xl"
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <span className="flex-1 text-white font-medium truncate">{item.name}</span>
              <button
                onClick={() => removeItem(item.id)}
                className="flex items-center justify-center w-10 h-10 rounded-lg text-zinc-400 active:text-green-400 active:bg-green-500/10 transition-colors flex-shrink-0"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {showPicker && (
        <CocktailPicker
          onSelect={handleSelectCocktail}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
