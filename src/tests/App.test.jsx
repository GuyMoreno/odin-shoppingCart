// NEW
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "../CartContext";

// Import the components in order that the router know them
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";

// Fake fetching
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: "Banana", price: 10, image: "" }]),
  })
);

const renderAppWithRouter = () => {
  // create router
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "shop", element: <Shop /> },
      ],
    },
  ];

  const router = createMemoryRouter(routes, { initialEntries: ["/"] });

  render(
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
};

describe("App Integration Tests", () => {
  
  it("increases the navbar counter when adding items", async () => {
    const user = userEvent.setup();
    renderAppWithRouter();

    // First is 0?
    const cartLink = screen.getByRole("link", { name: /cart/i });
    expect(cartLink).toHaveTextContent("0");

    const shopLink = screen.getByRole("link", { name: /shop/i });
    await user.click(shopLink);

    const addButton = await screen.findByRole("button", { name: /add to cart/i });

    // Clicking and expecting "1"
    await user.click(addButton);
    expect(cartLink).toHaveTextContent("1");

    // ... "2"
    await user.click(addButton);
    expect(cartLink).toHaveTextContent("2");

    await user.click(addButton);
    expect(cartLink).toHaveTextContent("3");
  });

});