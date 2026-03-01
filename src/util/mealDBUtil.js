export const fetchRecipes = async () => {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};