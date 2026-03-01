import React, { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { SavedRecipesContext } from "../context/SavedRecipesContext";
import "./SavedPage.css";

function SavedPage() {
  const { savedRecipes } = useContext(SavedRecipesContext);
  return (
    <div>
      <h1>Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {savedRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPage;