import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginPopup from "./LoginPopup";
import SuccessPopup from "./SuccessPopup";

function Navbar() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleProtectedClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  // Opens the logout confirmation popup
  const handleLogout = () => {
    setShowSuccess(true);
  };

  // User clicked "Cancel"
  const closeSuccessPopup = () => {
    setShowSuccess(false);
  };

  // User confirmed logout
  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setShowSuccess(false);

    alert("✅ Logged out successfully!");

    navigate("/");
  };

  return (
    <>
      <nav className="navbar">

        <h1 className="logo">
          🌾 <span>Agri</span>Match
        </h1>

        <ul className="nav-links">

          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/listings"
              onClick={handleProtectedClick}
            >
              Listings
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recommendations"
              onClick={handleProtectedClick}
            >
              Recommendations
            </NavLink>
          </li>

          <li>
            {isLoggedIn ? (
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="login-btn"
              >
                Login
              </NavLink>
            )}
          </li>

        </ul>

      </nav>

      <LoginPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <SuccessPopup
        show={showSuccess}
        onClose={closeSuccessPopup}
        onLogout={confirmLogout}
      />
    </>
  );
}

export default Navbar;