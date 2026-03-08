import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import SavedPage from "./pages/SavedPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { SavedRecipesProvider } from "./context/SavedRecipesContext";
import { FavoritedRecipesProvider } from "./context/FavoritedRecipesContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import RecipeDetailsPage from "./pages/RecipeDetailsPage";

function App() {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <FavoritedRecipesProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/saved" element={<ProtectedRoute><SavedPage /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recipe" element={<RecipeDetailsPage />} />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </BrowserRouter>
        </FavoritedRecipesProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  );
}

export default App;