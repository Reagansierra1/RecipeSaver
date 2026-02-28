import React from "react";
import "./RecipeCard.css";

// Props: title, image, onSave, onFavorite
function RecipeCard({ title, image, description, onSave, onFavorite }) {
  return (
    <div className="recipe-card">
      <img 
        src={image} 
        alt={title} 
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        <button>Save</button>
        <button>Favorite</button>
      </div>
    </div>
  );
}

export default RecipeCard;