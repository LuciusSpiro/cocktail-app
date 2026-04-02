import { useNavigate } from 'react-router-dom';
import type { Cocktail } from '../types';
import { RatingDisplay } from './RatingDisplay';
import { getPlaceholderComponent } from '../assets/placeholders';

export function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  const navigate = useNavigate();

  const renderImage = () => {
    if (!cocktail.image) {
      const Placeholder = getPlaceholderComponent('martini');
      return <Placeholder className="w-full h-full p-1" />;
    }
    if (cocktail.image.startsWith('placeholder:')) {
      const key = cocktail.image.replace('placeholder:', '');
      const Placeholder = getPlaceholderComponent(key);
      return <Placeholder className="w-full h-full p-1" />;
    }
    return (
      <img
        src={cocktail.image}
        alt={cocktail.name}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <button
      onClick={() => navigate(`/cocktail/${cocktail.id}`)}
      className="flex items-center gap-4 w-full p-3 bg-zinc-900 rounded-xl active:scale-[0.98] transition-transform text-left"
    >
      <div className="w-16 h-16 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
        {renderImage()}
      </div>
      <span className="flex-1 text-white font-medium truncate">{cocktail.name}</span>
      <RatingDisplay rating={cocktail.rating} />
    </button>
  );
}
