import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { CartProvider } from "../CartContext";
import { MemoryRouter } from "react-router-dom";

const renderApp = () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );
};

describe("App basic UI", () => {

  it("renders navbar", () => {
    renderApp();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders shop link", () => {
    renderApp();
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });

  it("renders cart link", () => {
    renderApp();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

});