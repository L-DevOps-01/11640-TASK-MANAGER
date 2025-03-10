import { Link } from "react-router-dom";
import "./nav-bar.scss";
const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default NavBar;
