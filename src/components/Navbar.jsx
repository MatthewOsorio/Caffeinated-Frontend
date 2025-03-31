import { useAuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import logo from "../assets/icons/coffee.png";
import "../css/Navbar.css";

function Navbar() {
  const { userID, username, logoutUser } = useAuthContext();
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-brand">
          <div>Caffinated</div>
          <img src={logo} className="logo" />
        </div>
      </Link>
      <div className="navbar-links">
        {userID ? (
          <div className="user-options">
            <Link to={`/profile/${userID}`}>
              <div className="nav-link">{username}'s Profile </div>
            </Link>

            <div className="nav-link" onClick={logoutUser}>
              Log out
            </div>
          </div>
        ) : (
          <Link to="/login">
            <div className="nav-link">Log In</div>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
