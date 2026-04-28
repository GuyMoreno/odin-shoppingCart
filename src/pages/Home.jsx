// Home.jsx
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Our Store</h1>
        <p>Discover the best products at the most affordable prices.</p>
        
        {/* כפתור שמוביל ישירות לחנות - נותן חוויית משתמש טובה יותר */}
        <Link to="/shop" className="shop-now-btn">
          Shop Now
        </Link>
      </header>

      
    </div>
  );
};

export default Home;
