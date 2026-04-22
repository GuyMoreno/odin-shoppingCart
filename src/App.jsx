// App.jsx

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "../src/index.css";

// App is always shown
// Nav is PERMANENT
// Outlet is varing... showing different content
const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
