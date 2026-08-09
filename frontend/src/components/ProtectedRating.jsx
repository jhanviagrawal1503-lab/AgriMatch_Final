import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

function ProtectedRating() {
  // Temporary login flag
  // Backend will replace this later.
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div
        style={{
          marginTop: "15px",
          padding: "12px",
          background: "#f8f9fa",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            marginBottom: "10px",
            color: "#555",
          }}
        >
          🔒 Please login to rate this listing.
        </p>

        <Link to="/login">
          <button
            style={{
              background: "#2e7d32",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </Link>
      </div>
    );
  }

  return <RatingStars />;
}

export default ProtectedRating;