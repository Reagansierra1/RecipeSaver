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

function App() {
  return (
    <AuthProvider>
      <SavedRecipesProvider>
        <FavoritedRecipesProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </FavoritedRecipesProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  );
}

export default App;