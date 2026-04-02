import { useState } from 'react';
import type { CocktailIngredient, Ingredient } from '../types';
import { useIngredients } from '../hooks/useIngredients';
import { ingredientCategories } from '../data/ingredients';
import { SearchBar } from './SearchBar';

export function IngredientPicker({
  selected,
  onToggle,
  onClose,
}: {
  selected: CocktailIngredient[];
  onToggle: (ingredient: CocktailIngredient) => void;
  onClose: () => void;
}) {
  const { ingredients, addCustomIngredient } = useIngredients();
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [newCategory, setNewCategory] = useState(ingredientCategories[0]);

  const selectedIds = new Set(selected.map((s) => s.id));

  const filtered = ingredients.filter((ing) =>
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  const allCategories = [...new Set([...ingredientCategories, ...filtered.map((i) => i.category)])];
  const grouped = allCategories
    .map((cat) => ({
      category: cat,
      items: filtered.filter((ing) => ing.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  const handleToggle = (ing: Ingredient) => {
    onToggle({ id: ing.id, name: ing.name, icon: ing.icon });
  };

  const handleAddCustom = async () => {
    if (!newName.trim()) return;
    const ingredient = await addCustomIngredient(newName.trim(), newIcon || '🍹', newCategory);
    onToggle({ id: ingredient.id, name: ingredient.name, icon: ingredient.icon });
    setNewName('');
    setNewIcon('');
    setNewCategory(ingredientCategories[0]);
    setShowAdd(false);
  };

  const availableIcons = ['🍹', '🥃', '🍸', '🍷', '🥂', '🍺', '🧊', '🫗', '🍶', '☕', '🍵', '🥛', '🧃', '🫙'];

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col">
      {/* Header - minimal */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <h2 className="text-white text-lg font-semibold">Zutaten</h2>
        <span className="text-zinc-500 text-sm">{selectedIds.size} ausgewählt</span>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-40">
        {grouped.map((group) => (
          <div key={group.category} className="mb-4">
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-2">
              {group.category}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {group.items.map((ing) => {
                const isSelected = selectedIds.has(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => handleToggle(ing)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50'
                        : 'bg-zinc-900 text-zinc-300 active:bg-zinc-800'
                    }`}
                  >
                    <span className="text-lg">{ing.icon}</span>
                    <span className="truncate">{ing.name}</span>
                    {isSelected && <span className="ml-auto text-amber-500">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Add custom */}
        {!showAdd ? (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full py-3 text-amber-500 text-sm font-medium border border-dashed border-zinc-700 rounded-lg mb-4"
          >
            + Neue Zutat hinzufügen
          </button>
        ) : (
          <div className="bg-zinc-900 rounded-lg p-4 mb-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Name der Zutat"
              className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 mb-3 placeholder:text-zinc-500"
              autoFocus
            />
            <div className="mb-3">
              <span className="text-zinc-500 text-xs mb-1 block">Kategorie:</span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-zinc-800 text-white rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none"
              >
                {ingredientCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <span className="text-zinc-500 text-xs mb-1 block">Icon wählen (optional):</span>
              <div className="flex flex-wrap gap-1.5">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewIcon(icon)}
                    className={`text-xl p-1.5 rounded ${
                      newIcon === icon ? 'bg-amber-500/20 ring-1 ring-amber-500' : 'bg-zinc-800'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCustom}
                className="flex-1 py-2 bg-amber-500 text-zinc-950 rounded-lg text-sm font-medium"
              >
                Hinzufügen
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 text-zinc-400 text-sm"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Fixed bottom: search + confirm button */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="px-4 pt-3 pb-2">
          <SearchBar value={search} onChange={setSearch} placeholder="Zutaten suchen..." />
        </div>
        <div className="flex items-center justify-center pb-3">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/30 active:scale-95 transition-transform"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
