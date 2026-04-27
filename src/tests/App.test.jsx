import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { CartProvider } from "../CartContext";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const renderApp = () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </MemoryRouter>
  );
};

// Describe = Test Suit
describe("App basic UI", () => {
  // It = a test case
  it("renders navbar", () => {
    // Runs the App component
    renderApp();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  
  // It = a test case
  it("renders shop link", () => {
    renderApp();
    //  using regex with the i flag allows simpler case-insensitive comparison
      // i
    expect(screen.getByText(/shop/i)).toBeInTheDocument();
  });
  
  // It = a test case
  it("renders cart link", () => {
    renderApp();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
 

});

