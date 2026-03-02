import { render, screen } from "@testing-library/react";
import SavedPage from "../pages/SavedPage";
import { SavedRecipesProvider } from "../context/SavedRecipesContext";
import { FavoritedRecipesProvider } from "../context/FavoritedRecipesContext";
import { AuthProvider } from "../context/AuthContext";
import { vi, describe, beforeEach, test } from "vitest";

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

const mockSavedRecipes = [
  {
    idMeal: "1",
    strMeal: "Test Meal",
    strMealThumb: "https://via.placeholder.com/150",
    strInstructions: "Test instructions",
  },
];

describe("SavedPage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReset();
  });

  test("shows 'No saved recipes yet' when no recipes exist", () => {
    localStorageMock.getItem.mockReturnValueOnce("[]");
    render(
      <Providers>
        <SavedPage />
      </Providers>
    );

    expect(screen.getByText(/No saved recipes yet/i)).toBeInTheDocument();
  });

  test("renders recipe cards when saved recipes exist", () => {
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockSavedRecipes));
    render(
      <Providers>
        <SavedPage />
      </Providers>
    );

    expect(screen.getByText("Test Meal")).toBeInTheDocument();
    expect(screen.getByAltText("Test Meal")).toBeInTheDocument();
  });
});