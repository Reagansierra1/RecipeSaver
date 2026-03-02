import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import { describe, test } from "vitest";

const Providers = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

describe("LoginPage", () => {
  test("renders login form elements", () => {
    render(
      <Providers>
        <LoginPage />
      </Providers>
    );

    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});