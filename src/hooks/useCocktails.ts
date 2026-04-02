import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { createElement } from 'react';
import type { Cocktail } from '../types';
import * as db from '../db';

interface CocktailContextType {
  cocktails: Cocktail[];
  loading: boolean;
  addCocktail: (cocktail: Cocktail) => Promise<void>;
  updateCocktail: (cocktail: Cocktail) => Promise<void>;
  removeCocktail: (id: string) => Promise<void>;
  getCocktail: (id: string) => Cocktail | undefined;
}

const CocktailContext = createContext<CocktailContextType | null>(null);

export function CocktailProvider({ children }: { children: ReactNode }) {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.getAllCocktails().then((data) => {
      setCocktails(data);
      setLoading(false);
    });
  }, []);

  const addCocktail = useCallback(async (cocktail: Cocktail) => {
    await db.saveCocktail(cocktail);
    setCocktails((prev) => [...prev, cocktail]);
  }, []);

  const updateCocktail = useCallback(async (cocktail: Cocktail) => {
    await db.saveCocktail(cocktail);
    setCocktails((prev) => prev.map((c) => (c.id === cocktail.id ? cocktail : c)));
  }, []);

  const removeCocktail = useCallback(async (id: string) => {
    await db.deleteCocktail(id);
    setCocktails((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCocktailById = useCallback(
    (id: string) => cocktails.find((c) => c.id === id),
    [cocktails]
  );

  return createElement(
    CocktailContext.Provider,
    {
      value: {
        cocktails,
        loading,
        addCocktail,
        updateCocktail,
        removeCocktail,
        getCocktail: getCocktailById,
      },
    },
    children
  );
}

export function useCocktails() {
  const ctx = useContext(CocktailContext);
  if (!ctx) throw new Error('useCocktails must be used within CocktailProvider');
  return ctx;
}
