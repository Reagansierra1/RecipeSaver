import React, { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { FavoritedRecipesContext } from "../context/FavoritedRecipesContext";

function FavoritesPage() {
  const { favoritedRecipes } = useContext(FavoritedRecipesContext);

  return (
    <div>
      <h1>Favorite Recipes</h1>
      {favoritedRecipes.length === 0 ? (
        <p>No favorited recipes yet.</p>
      ) : (
        <div className="recipe-grid">
          {favoritedRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;