export interface Cocktail {
  id: string;
  name: string;
  image: string | null; // "data:image/jpeg;base64,..." or "placeholder:martini"
  rating: number; // 1-5
  ingredients: CocktailIngredient[];
  createdAt: number;
}

export interface CocktailIngredient {
  id: string;
  name: string;
  icon: string;
}

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: string;
  isCustom: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  icon: string;
}
