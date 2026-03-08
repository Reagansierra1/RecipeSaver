import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const SavedRecipesContext = createContext();

export function SavedRecipesProvider({ children }) {
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (!user) {
      setSavedRecipes([]);
      return;
    }

    const allRecipes = JSON.parse(localStorage.getItem("savedRecipesByUser")) || {};
    const userRecipes = allRecipes[user.username] || [];
    setSavedRecipes(userRecipes);
  }, [user]);

  const saveRecipe = (recipe) => {
    if (!user) return;

    setSavedRecipes((prev) => {
      if (prev.find((r) => r.idMeal === recipe.idMeal)) return prev;
      const updated = [...prev, recipe];

      const allRecipes = JSON.parse(localStorage.getItem("savedRecipesByUser")) || {};
      allRecipes[user.username] = updated;
      localStorage.setItem("savedRecipesByUser", JSON.stringify(allRecipes));

      return updated;
    });
  };

  const removeRecipe = (idMeal) => {
    if (!user) return;

    setSavedRecipes((prev) => {
      const updated = prev.filter((r) => r.idMeal !== idMeal);

      const allRecipes = JSON.parse(localStorage.getItem("savedRecipesByUser")) || {};
      allRecipes[user.username] = updated;
      localStorage.setItem("savedRecipesByUser", JSON.stringify(allRecipes));

      return updated;
    });
  };

  const isSaved = (idMeal) => {
    if (!user) return false;
    return savedRecipes.some((r) => r.idMeal === idMeal);
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe, isSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
}

export const useRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (!context) throw new Error("useRecipes must be used within SavedRecipesProvider");
  return context;
};