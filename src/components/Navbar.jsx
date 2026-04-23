// Navbar.jsx
import { Link } from "react-router-dom";
import "../Navbar.css";
import { useCart } from "../CartContext";

const Navbar = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => {
  return sum + item.quantity;
}, 0);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>

  <Link to="/cart">
    Cart ({totalItems})
  </Link>

</li>
      </ul>
    </nav>
  );
};

export default Navbar;
