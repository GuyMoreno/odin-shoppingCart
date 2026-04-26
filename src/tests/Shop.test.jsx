// Shop.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "../pages/Shop";
import { CartProvider } from "../CartContext";
import { MemoryRouter } from "react-router-dom";

describe("Shop basic", () => {
  it("renders loading state", () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Shop />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});