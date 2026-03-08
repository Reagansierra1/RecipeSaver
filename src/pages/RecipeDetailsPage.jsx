import { useLocation} from "react-router-dom";
import "./RecipeDetailsPage.css";
import { useRecipes } from "../context/SavedRecipesContext";
import { useFavoritedRecipes } from "../context/FavoritedRecipesContext";

function RecipeDetailsPage() {
  const location = useLocation();
  const recipe = location.state?.recipe;

  const { saveRecipe, removeRecipe, isSaved } = useRecipes();
  const { favoriteRecipe, removeFavoriteRecipe, isFavorited } = useFavoritedRecipes();
  const saved = isSaved(recipe.idMeal);
  const favorited = isFavorited(recipe.idMeal);

  const handleSavedClick = () => {
    if (saved){
      removeRecipe(recipe.idMeal);
    }
    else{
      saveRecipe(recipe);
    }
  }

  const handleFavoritedClick = () => {
    if (favorited){
      removeFavoriteRecipe(recipe.idMeal);
    }
    else{
      favoriteRecipe(recipe);
    }
  }

  if (!recipe) {
    return <p>No recipe found.</p>;
  }

  return (
    <div className="recipe-details-container">

      <h1 className="recipe-details-title">{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-details-image"
      />

      <div className="recipe-details-buttons">
        <button className="recipe-btn" onClick={handleSavedClick}>{saved ? 'Saved' : 'Save'}</button>
        <button className="recipe-btn" onClick={handleFavoritedClick}>{favorited ? '❤️' : '🤍' }</button>
      </div>

      <div className="recipe-details-instructions">
        <h2>Instructions</h2>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetailsPage;