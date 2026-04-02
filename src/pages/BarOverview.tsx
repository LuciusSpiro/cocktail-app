import { useCocktails } from '../hooks/useCocktails';
import { CocktailCard } from '../components/CocktailCard';

export function BarOverview() {
  const { cocktails, loading } = useCocktails();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-zinc-500">Laden...</span>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-2xl font-bold text-white mb-6">Bar</h1>

      {cocktails.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
          <span className="text-6xl mb-4">🍸</span>
          <p className="text-lg">Noch keine Cocktails</p>
          <p className="text-sm mt-1">Tippe auf + um deinen ersten Cocktail anzulegen</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      )}
    </div>
  );
}
