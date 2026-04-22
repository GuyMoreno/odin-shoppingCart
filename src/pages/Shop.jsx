// Shop.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// We import React tools:
// useState = store data that can change
// useEffect = run code when the page loads
const Shop = () => {
  // Create a state to store products
  // starts as an empty list
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // This runs only once when the page loads
    fetch("https://fakestoreapi.com/products?limit=3")
      // Ask the internet for 3 products
      .then((res) => res.json())
      // Convert the response into usable JavaScript data
      .then((data) => setProducts(data));
    // Save the products into state
    // This will make the page re-render
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      {/* Loop through all products and show them */}
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Shop;
// Export the component so we can use it in routing
