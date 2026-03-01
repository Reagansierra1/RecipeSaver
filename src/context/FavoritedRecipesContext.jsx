import React, { createContext, useState, useContext, useEffect } from "react";

export const FavoritedRecipesContext = createContext();

export const FavoritedRecipesProvider = ({ children }) => {
  const [favoritedRecipes, setFavoritedRecipes] = useState(() => {
    const stored = localStorage.getItem("favoritedRecipes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritedRecipes", JSON.stringify(favoritedRecipes));
  }, [favoritedRecipes]);

  const favoriteRecipe = (recipe) => {
    if (!favoritedRecipes.some((r) => r.idMeal === recipe.idMeal)) {
      setFavoritedRecipes([...favoritedRecipes, recipe]);
    }
  };

  const removeFavoriteRecipe = (idMeal) => {
    setFavoritedRecipes(favoritedRecipes.filter((r) => r.idMeal !== idMeal));
  };

  const isFavorited = (idMeal) => {
    return favoritedRecipes.some((r) => r.idMeal === idMeal);
  };

  return (
    <FavoritedRecipesContext.Provider value={{ favoritedRecipes, favoriteRecipe, removeFavoriteRecipe, isFavorited }}>
      {children}
    </FavoritedRecipesContext.Provider>
  );
};

export const useFavoritedRecipes = () => {
  const context = useContext(FavoritedRecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipesProvider');
  }
  return context;
};