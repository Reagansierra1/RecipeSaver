import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import { useRecipes } from "../context/SavedRecipesContext";
import { useFavoritedRecipes } from "../context/FavoritedRecipesContext";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recipe", { state: { recipe } });
  };
  const { saveRecipe, removeRecipe, isSaved } = useRecipes();
  const { favoriteRecipe, removeFavoriteRecipe, isFavorited } = useFavoritedRecipes();
  const saved = isSaved(recipe.idMeal);
  const favorited = isFavorited(recipe.idMeal);
  const handleSavedClick = () => {
    if (saved) {
      removeRecipe(recipe.idMeal);
    } else {
      saveRecipe(recipe);
    }
  };

  const handleFavoritedClick = () => {
    if (favorited) {
      removeFavoriteRecipe(recipe.idMeal);
    } else {
      favoriteRecipe(recipe);
    }
  };

  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        onClick={handleClick} 
      />
      <h2 onClick={handleClick} >{recipe.strMeal}</h2>
      <p onClick={handleClick} >{recipe.strInstructions.slice(0, 100)}...</p>
      <div>
        <button onClick={handleSavedClick}>{saved ? 'Saved' : 'Save'}</button>
        <button onClick={handleFavoritedClick}>{favorited ? '<3' : 'Favorite' }</button>
      </div>
    </div>
  );
}

export default RecipeCard;