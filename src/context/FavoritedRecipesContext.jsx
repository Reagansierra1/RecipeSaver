import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const FavoritedRecipesContext = createContext();

export function FavoritedRecipesProvider({ children }) {
  const { user } = useAuth();
  const [favoritedRecipes, setFavoritedRecipes] = useState([]);

  useEffect(() => {
    if (!user) {
      setFavoritedRecipes([]);
      return;
    }

    const allFavorites = JSON.parse(localStorage.getItem("favoritedRecipesByUser")) || {};
    const userFavorites = allFavorites[user.username] || [];
    setFavoritedRecipes(userFavorites);
  }, [user]);

  const favoriteRecipe = (recipe) => {
    if (!user) return;

    setFavoritedRecipes((prev) => {
      if (prev.find((r) => r.idMeal === recipe.idMeal)) return prev;
      const updated = [...prev, recipe];

      const allFavorites = JSON.parse(localStorage.getItem("favoritedRecipesByUser")) || {};
      allFavorites[user.username] = updated;
      localStorage.setItem("favoritedRecipesByUser", JSON.stringify(allFavorites));

      return updated;
    });
  };

  const removeFavoriteRecipe = (idMeal) => {
    if (!user) return;

    setFavoritedRecipes((prev) => {
      const updated = prev.filter((r) => r.idMeal !== idMeal);

      const allFavorites = JSON.parse(localStorage.getItem("favoritedRecipesByUser")) || {};
      allFavorites[user.username] = updated;
      localStorage.setItem("favoritedRecipesByUser", JSON.stringify(allFavorites));

      return updated;
    });
  };

  const isFavorited = (idMeal) => {
    if (!user) return false;
    return favoritedRecipes.some((r) => r.idMeal === idMeal);
  };

  return (
    <FavoritedRecipesContext.Provider
      value={{ favoritedRecipes, favoriteRecipe, removeFavoriteRecipe, isFavorited }}
    >
      {children}
    </FavoritedRecipesContext.Provider>
  );
}

export const useFavoritedRecipes = () => {
  const context = useContext(FavoritedRecipesContext);
  if (!context) throw new Error("useFavoritedRecipes must be used within FavoritedRecipesProvider");
  return context;
};