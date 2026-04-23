// Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";
import "../Cart.css";

const Cart = () => {
  const { cart, setCart } = useCart();

  // Plus
  const increase = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  // Minus
  const decrease = (id) =>
    setCart((prev) =>
      prev.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  
  
  return (
    <div className="cart">

    <h1 className="cart-title">Cart</h1>

    {cart.length === 0 && <p>Your cart is empty</p>}

    <div className="cart-list">

      {cart.map((item) => (

        <div className="cart-item" key={item.id}>

          <h3>{item.title}</h3>

          <p>Price: ${item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <div className="cart-actions">

            <button onClick={() => increase(item.id)}>+</button>

            <button onClick={() => decrease(item.id)}>-</button>

          </div>

        </div>

      ))}

    </div>

  </div>
  );
};

export default Cart;
