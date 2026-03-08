import React, { useState, useEffect, useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { fetchRecipes } from '../util/mealDBUtil.js';
import './Homepage.css'

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const query = searchTerm || "";
        const data = await fetchRecipes(query);
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="status-message">
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>Search recipes and explore new meals here.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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