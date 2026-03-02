import { render, screen, waitFor } from "@testing-library/react";
import FavoritesPage from "../pages/FavoritesPage";
import { SavedRecipesProvider } from "../context/SavedRecipesContext";
import { FavoritedRecipesProvider } from "../context/FavoritedRecipesContext";
import { AuthProvider } from "../context/AuthContext";
import { vi, describe, beforeEach, test } from "vitest";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
vi.stubGlobal("localStorage", localStorageMock);

const Providers = ({ children }) => (
  <AuthProvider>
    <SavedRecipesProvider>
      <FavoritedRecipesProvider>{children}</FavoritedRecipesProvider>
    </SavedRecipesProvider>
  </AuthProvider>
);

const mockFavoritedRecipes = [
  {
    idMeal: "2",
    strMeal: "Favorite Meal",
    strMealThumb: "https://via.placeholder.com/150",
    strInstructions: "Instructions for favorite recipe",
  },
];

describe("FavoritesPage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReset();
  });

  test("shows 'No favorited recipes yet' when no favorites exist", () => {
    localStorageMock.getItem.mockReturnValue("[]"); // Return empty array
    render(
      <Providers>
        <FavoritesPage />
      </Providers>
    );

    expect(screen.getByText(/No favorited recipes yet/i)).toBeInTheDocument();
  });

  test("renders recipe cards when favorites exist", async () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFavoritedRecipes));

    render(
      <Providers>
        <FavoritesPage />
      </Providers>
    );

    await waitFor(() => {
      expect(screen.getByText(/Favorite Meal/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Favorite Meal/i)).toBeInTheDocument();
    });
  });
});