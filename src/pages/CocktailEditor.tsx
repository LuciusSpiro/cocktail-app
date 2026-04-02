import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCocktails } from '../hooks/useCocktails';
import { useSaveAction } from '../hooks/useSaveAction';
import { ImageCapture } from '../components/ImageCapture';
import { RatingSelector } from '../components/RatingSelector';
import { IngredientChip } from '../components/IngredientChip';
import { IngredientPicker } from '../components/IngredientPicker';
import type { CocktailIngredient } from '../types';

export function CocktailEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCocktail, addCocktail, updateCocktail, removeCocktail } = useCocktails();
  const { registerSave, clearSave } = useSaveAction();
  const isNew = !id;

  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [rating, setRating] = useState(3);
  const [location, setLocation] = useState('');
  const [ingredients, setIngredients] = useState<CocktailIngredient[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      const cocktail = getCocktail(id);
      if (cocktail) {
        setName(cocktail.name);
        setImage(cocktail.image);
        setRating(cocktail.rating);
        setLocation(cocktail.location || '');
        setIngredients(cocktail.ingredients);
      }
    }
  }, [id, getCocktail]);

  const handleToggleIngredient = (ingredient: CocktailIngredient) => {
    setIngredients((prev) => {
      const exists = prev.find((i) => i.id === ingredient.id);
      if (exists) {
        return prev.filter((i) => i.id !== ingredient.id);
      }
      return [...prev, ingredient];
    });
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== ingredientId));
  };

  const handleSave = useCallback(async () => {
    if (!name.trim()) return;

    const cocktail = {
      id: id || crypto.randomUUID(),
      name: name.trim(),
      image,
      rating,
      location: location.trim(),
      ingredients,
      createdAt: id ? (getCocktail(id)?.createdAt || Date.now()) : Date.now(),
    };

    if (isNew) {
      await addCocktail(cocktail);
    } else {
      await updateCocktail(cocktail);
    }
    navigate('/');
  }, [name, image, rating, location, ingredients, id, isNew, getCocktail, addCocktail, updateCocktail, navigate]);

  // Register save action in bottom nav
  useEffect(() => {
    registerSave(handleSave, !name.trim());
    return () => clearSave();
  }, [handleSave, name, registerSave, clearSave]);

  const handleDelete = async () => {
    if (id) {
      await removeCocktail(id);
      navigate('/');
    }
  };

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigate('/')} className="text-amber-500 font-medium">
          ← Zurück
        </button>
        <h1 className="text-lg font-bold text-white">
          {isNew ? 'Neuer Cocktail' : 'Bearbeiten'}
        </h1>
        <div className="w-16" />
      </div>

      {/* Image */}
      <div className="mb-6">
        <ImageCapture value={image} onChange={setImage} />
      </div>

      {/* Name */}
      <div className="mb-6">
        <label className="text-zinc-500 text-sm mb-2 block">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z.B. Mojito"
          className="w-full bg-zinc-900 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-600"
        />
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="text-zinc-500 text-sm mb-2 block">Fundort</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="z.B. Strandbar Mallorca"
          className="w-full bg-zinc-900 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500/50 placeholder:text-zinc-600"
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="text-zinc-500 text-sm mb-2 block">Bewertung</label>
        <RatingSelector value={rating} onChange={setRating} />
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <label className="text-zinc-500 text-sm mb-2 block">Zutaten</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {ingredients.map((ing) => (
            <IngredientChip
              key={ing.id}
              ingredient={ing}
              onRemove={() => handleRemoveIngredient(ing.id)}
            />
          ))}
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="inline-flex items-center gap-1 bg-zinc-800 text-amber-500 rounded-full px-4 py-1.5 text-sm font-medium active:scale-95 transition-transform"
          >
            + Zutat
          </button>
        </div>
      </div>

      {/* Delete button (edit mode only) */}
      {!isNew && (
        <div className="mt-8">
          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 text-red-400 text-sm border border-zinc-800 rounded-xl"
            >
              Cocktail löschen
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500/20 text-red-400 rounded-xl text-sm font-medium"
              >
                Wirklich löschen
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-zinc-800 text-zinc-400 rounded-xl text-sm"
              >
                Abbrechen
              </button>
            </div>
          )}
        </div>
      )}

      {/* Ingredient Picker Modal */}
      {showPicker && (
        <IngredientPicker
          selected={ingredients}
          onToggle={handleToggleIngredient}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
