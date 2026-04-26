// Shop.test.jsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Shop from "../pages/Shop";
import { CartProvider } from "../CartContext";
import { MemoryRouter } from "react-router-dom";

// We're faling fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "Test Product",
          price: 10,
          image: "",
        },
      ]),
  })
);

const renderShop = () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <Shop />
      </CartProvider>
    </MemoryRouter>
  );
};

describe("Shop cart flow", () => {
  it("adds product to cart", async () => {
    const user = userEvent.setup();

    renderShop();

    const product = await screen.findByText(/test product/i);
    expect(product).toBeInTheDocument();

    const button = screen.getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(button);

    const cartLink = screen.getByText(/cart/i);

    expect(cartLink).toBeInTheDocument();
  });
});