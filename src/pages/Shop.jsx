// Shop.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Shop.css";
import { useCart } from "../CartContext"

// We import React tools:
// useState = store data that can change
// useEffect = run code when the page loads

const Shop = () => {
  
  // Create a state to store products
  // starts as an empty list
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, setCart } = useCart();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products?limit=7"
        );

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Cart
  const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
};

  return (
    <div>
      <h1>Shop</h1>
      <div className="shop-grid">
        {products.map((product) => (
        <div className="product-card" key={product.id}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Shop;
// Export the component so we can use it in routing
