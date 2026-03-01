import React, { createContext, useState, useContext, useEffect } from "react";

export const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState(() => {
    const stored = localStorage.getItem("savedRecipes");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const saveRecipe = (recipe) => {
    if (!savedRecipes.some((r) => r.idMeal === recipe.idMeal)) {
      setSavedRecipes([...savedRecipes, recipe]);
    }
  };

  const removeRecipe = (idMeal) => {
    setSavedRecipes(savedRecipes.filter((r) => r.idMeal !== idMeal));
  };

  const isSaved = (idMeal) => {
    return savedRecipes.some((r) => r.idMeal === idMeal);
  };

  return (
    <SavedRecipesContext.Provider value={{ savedRecipes, saveRecipe, removeRecipe, isSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within RecipesProvider');
  }
  return context;
};