import React, { useState, useEffect, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from '../util/mealDBUtil.js';
import './Homepage.css'

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes().then(setRecipes);
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Search recipes and explore new meals here.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
        />
        <button>Search</button>
      </div>
      <div className="recipe-grid">
      {recipes.map((recipe) => (
          <RecipeCard
            recipe = {recipe}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;