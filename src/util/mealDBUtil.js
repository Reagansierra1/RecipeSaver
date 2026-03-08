export const fetchRecipes = async (searchTerm = "") => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};