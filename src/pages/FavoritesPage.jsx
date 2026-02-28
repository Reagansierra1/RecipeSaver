import React from "react";
import RecipeCard from "../components/RecipeCard";

function FavoritesPage() {
  return (
    <div>
      <h1>Favorite Recipes</h1>
      <p>Your favorited recipes will appear here.</p>
      <RecipeCard
        title="Chocolate Cake"
        image="https://placehold.co/600x400"
        description="A delicious chocolate cake"
      />
      <RecipeCard
        title="Blueberry Muffins"
        image="https://placehold.co/600x400"
        description="A great morning meal for on the go!"
      />
    </div>
  );
}

export default FavoritesPage;