import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createElement } from 'react';
import type { ShoppingItem, CocktailIngredient } from '../types';
import * as db from '../db';

interface ShoppingListContextType {
  items: ShoppingItem[];
  loading: boolean;
  addFromCocktail: (ingredients: CocktailIngredient[]) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const ShoppingListContext = createContext<ShoppingListContextType | null>(null);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getShoppingList().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const addFromCocktail = useCallback(async (ingredients: CocktailIngredient[]) => {
    const newItems: ShoppingItem[] = ingredients.map((ing) => ({
      id: ing.id,
      name: ing.name,
      icon: ing.icon,
    }));
    await db.addShoppingItems(newItems);
    setItems((prev) => {
      const existingIds = new Set(prev.map((i) => i.id));
      const toAdd = newItems.filter((i) => !existingIds.has(i.id));
      return [...prev, ...toAdd];
    });
  }, []);

  const removeItem = useCallback(async (id: string) => {
    await db.removeShoppingItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearAll = useCallback(async () => {
    await db.clearShoppingList();
    setItems([]);
  }, []);

  return createElement(
    ShoppingListContext.Provider,
    { value: { items, loading, addFromCocktail, removeItem, clearAll } },
    children
  );
}

export function useShoppingList() {
  const ctx = useContext(ShoppingListContext);
  if (!ctx) throw new Error('useShoppingList must be used within ShoppingListProvider');
  return ctx;
}
