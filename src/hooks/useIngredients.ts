import { useState, useEffect, useCallback } from 'react';
import type { Ingredient } from '../types';
import { defaultIngredients } from '../data/ingredients';
import * as db from '../db';

export function useIngredients() {
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    db.getCustomIngredients().then(setCustomIngredients);
  }, []);

  const allIngredients = [...defaultIngredients, ...customIngredients];

  const addCustomIngredient = useCallback(async (name: string, icon: string) => {
    const ingredient: Ingredient = {
      id: `custom-${Date.now()}`,
      name,
      icon: icon || '🍹',
      category: 'Eigene',
      isCustom: true,
    };
    await db.saveCustomIngredient(ingredient);
    setCustomIngredients((prev) => [...prev, ingredient]);
    return ingredient;
  }, []);

  return { ingredients: allIngredients, addCustomIngredient };
}
