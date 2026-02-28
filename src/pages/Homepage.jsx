import React from "react";
import RecipeCard from "../components/RecipeCard";

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Search recipes and explore new meals here.</p>
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

export default HomePage;