import type { CocktailIngredient } from '../types';

export function IngredientChip({
  ingredient,
  onRemove,
}: {
  ingredient: CocktailIngredient;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-zinc-800 text-zinc-200 rounded-full px-3 py-1.5 text-sm">
      <span>{ingredient.icon}</span>
      <span>{ingredient.name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-zinc-500 hover:text-red-400 ml-1"
        >
          ✕
        </button>
      )}
    </span>
  );
}
