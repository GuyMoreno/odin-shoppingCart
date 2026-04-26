import { useEffect, useState } from "react";
import "./Shop.css";
import { useCart } from "../CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setCart } = useCart();

  const [quantities, setQuantities] = useState({});

  // fetch products
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

  // ➕ increase per product
  const increase = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  // ➖ decrease per product
  const decrease = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  // 🛒 add to cart
  const addToCart = (product, quantity) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  return (
    <div className="shop-grid">

  {products.map((product) => (

    <div className="product-card" key={product.id}>

      

      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
      </div>

      <div className="product-bottom">
        <div className="quantity-controls">
          <button onClick={() => decrease(product.id)} aria-label="decrease">-</button>
          <input
            type="number"
            min="1"
            value={quantities[product.id] || 1}
            onChange={(e) =>
              setQuantities((prev) => ({
                ...prev,
                [product.id]: Number(e.target.value),
              }))
            }
          />
          <button onClick={() => increase(product.id)} aria-label="increase">+</button>
        </div>

        <button
          className="add-btn"
          aria-label="Add to Cart"
          onClick={() =>
            addToCart(product, quantities[product.id] || 1)
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>
  );
};

export default Shop;