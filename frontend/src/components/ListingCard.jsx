import { useState } from "react";
import RatingStars from "./RatingStars";
import RatingPopup from "./RatingPopup";
import "./ListingCard.css";

function ListingCard({ listing }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleRatingSubmit = async (rating) => {
  const userId = localStorage.getItem("user_id");

  if (!userId) {
    alert("Please login before rating a listing.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        listing_id: listing.id,
        rating: rating,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      alert(`You rated ${listing.shop_name} ${rating}/5 ⭐`);
      setShowPopup(false);

      console.log("Rating response:", data);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Rating error:", error);
    alert("Could not connect to backend.");
  }
};

  return (
    <>
      <div className="listing-card">

        {/* Image */}
        <div className="listing-image">
          🌾
        </div>

        <div className="listing-content">

          

          {/* Shop Name */}
          <h2>{listing.shop_name}</h2>

          {/* Crop */}
          <p>
            <strong>🌾 Crop:</strong> {listing.crop}
          </p>

          {/* Soil */}
          <p>
            <strong>🌱 Soil:</strong> {listing.soil_type}
          </p>

          {/* Season */}
          <p>
            <strong>☀️ Season:</strong> {listing.season}
          </p>

          {/* Price */}
          <p>
            <strong>💰 Price:</strong> {listing.price}
          </p>

          {/* Average Rating */}
          <p className="average-rating">
            ⭐ <strong>{listing.average_rating}</strong> / 5
          </p>

          {/* Rate Button */}
          <button
            className="details-btn"
            onClick={() => setShowPopup(true)}
          >
            ⭐ Rate This
          </button>

        </div>
      </div>

      {/* Rating Popup */}
      <RatingPopup
        show={showPopup}
        listing={listing}
        onClose={() => setShowPopup(false)}
        onSubmit={handleRatingSubmit}
      />
    </>
  );
}

export default ListingCard;
