import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HomePage from "../pages/Homepage";
import { SavedRecipesProvider } from "../context/SavedRecipesContext";
import { FavoritedRecipesProvider } from "../context/FavoritedRecipesContext";
import { AuthProvider } from "../context/AuthContext";
import { vi, describe, beforeEach, afterEach, expect } from "vitest";

const mockData = {
  meals: [
    {
      idMeal: "1",
      strMeal: "Test Meal 1",
      strMealThumb: "https://via.placeholder.com/150",
      strInstructions: "Do something",
    },
    {
      idMeal: "2",
      strMeal: "Test Meal 2",
      strMealThumb: "https://via.placeholder.com/150",
      strInstructions: "Do something else",
    },
    {
      idMeal: "3",
      strMeal: "Test Meal 3",
      strMealThumb: "https://via.placeholder.com/150",
      strInstructions: "Another recipe",
    },
  ],
};

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

describe("HomePage", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    localStorageMock.removeItem.mockReset();
    localStorageMock.clear.mockReset();

    vi.stubGlobal("fetch", vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("displays loading initially", () => {
    render(
      <Providers>
        <HomePage />
      </Providers>
    );
    expect(screen.getByText(/Loading recipes/i)).toBeInTheDocument();
  });

  test("renders multiple recipe cards with correct data", async () => {
    render(
      <Providers>
        <HomePage />
      </Providers>
    );

    await waitFor(() => {
      mockData.meals.forEach((meal) => {
        expect(screen.getByText(meal.strMeal)).toBeInTheDocument();
        expect(screen.getByText(meal.strInstructions.slice(0, 100) + "...")).toBeInTheDocument();
        expect(screen.getByAltText(meal.strMeal)).toBeInTheDocument();
      });
    });

    const saveButtons = screen.getAllByText("Save");
    const favoriteButtons = screen.getAllByText("Favorite");
    expect(saveButtons).toHaveLength(mockData.meals.length);
    expect(favoriteButtons).toHaveLength(mockData.meals.length);
  });

  test("can save a recipe and update localStorage", async () => {
    localStorageMock.getItem.mockReturnValueOnce(null);

    render(
      <Providers>
        <HomePage />
      </Providers>
    );

    await waitFor(() => {
      const saveButtons = screen.getAllByText("Save");
      fireEvent.click(saveButtons[0]);

      expect(screen.getAllByText("Saved")[0]).toBeInTheDocument();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "savedRecipes",
        expect.stringContaining(mockData.meals[0].strMeal)
      );
    });
  });

  test("can favorite a recipe and update localStorage", async () => {
    localStorageMock.getItem.mockReturnValueOnce(null); 

    render(
      <Providers>
        <HomePage />
      </Providers>
    );

    await waitFor(() => {
      const favoriteButtons = screen.getAllByText("Favorite");
      fireEvent.click(favoriteButtons[0]);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "favoritedRecipes",
        expect.stringContaining(mockData.meals[0].strMeal)
      );
    });
  });
});