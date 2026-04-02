import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { Cocktail, Ingredient, ShoppingItem } from '../types';

interface CocktailDB extends DBSchema {
  cocktails: {
    key: string;
    value: Cocktail;
  };
  customIngredients: {
    key: string;
    value: Ingredient;
  };
  shoppingList: {
    key: string;
    value: ShoppingItem;
  };
}

let dbPromise: Promise<IDBPDatabase<CocktailDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<CocktailDB>('cocktail-app-db', 2, {
      upgrade(db, oldVersion) {
        if (oldVersion < 1) {
          db.createObjectStore('cocktails', { keyPath: 'id' });
          db.createObjectStore('customIngredients', { keyPath: 'id' });
        }
        if (oldVersion < 2) {
          db.createObjectStore('shoppingList', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllCocktails(): Promise<Cocktail[]> {
  const db = await getDB();
  return db.getAll('cocktails');
}

export async function getCocktail(id: string): Promise<Cocktail | undefined> {
  const db = await getDB();
  return db.get('cocktails', id);
}

export async function saveCocktail(cocktail: Cocktail): Promise<void> {
  const db = await getDB();
  await db.put('cocktails', cocktail);
}

export async function deleteCocktail(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('cocktails', id);
}

export async function getCustomIngredients(): Promise<Ingredient[]> {
  const db = await getDB();
  return db.getAll('customIngredients');
}

export async function saveCustomIngredient(ingredient: Ingredient): Promise<void> {
  const db = await getDB();
  await db.put('customIngredients', ingredient);
}

export async function getShoppingList(): Promise<ShoppingItem[]> {
  const db = await getDB();
  return db.getAll('shoppingList');
}

export async function addShoppingItems(items: ShoppingItem[]): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('shoppingList', 'readwrite');
  for (const item of items) {
    await tx.store.put(item);
  }
  await tx.done;
}

export async function removeShoppingItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('shoppingList', id);
}

export async function clearShoppingList(): Promise<void> {
  const db = await getDB();
  await db.clear('shoppingList');
}

// --- Export / Import ---

export interface ExportData {
  version: number;
  exportedAt: string;
  cocktails: Cocktail[];
  customIngredients: Ingredient[];
  shoppingList: ShoppingItem[];
}

export async function exportAll(): Promise<ExportData> {
  const db = await getDB();
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    cocktails: await db.getAll('cocktails'),
    customIngredients: await db.getAll('customIngredients'),
    shoppingList: await db.getAll('shoppingList'),
  };
}

export async function importAll(data: ExportData): Promise<void> {
  const db = await getDB();

  const txCocktails = db.transaction('cocktails', 'readwrite');
  await txCocktails.store.clear();
  for (const item of data.cocktails) {
    await txCocktails.store.put(item);
  }
  await txCocktails.done;

  const txIngredients = db.transaction('customIngredients', 'readwrite');
  await txIngredients.store.clear();
  for (const item of data.customIngredients) {
    await txIngredients.store.put(item);
  }
  await txIngredients.done;

  const txShopping = db.transaction('shoppingList', 'readwrite');
  await txShopping.store.clear();
  for (const item of data.shoppingList) {
    await txShopping.store.put(item);
  }
  await txShopping.done;
}
