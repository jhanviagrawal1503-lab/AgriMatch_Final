import { useState } from "react";
import "./RatingPopup.css";

function RatingPopup({ show, listing, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);

  if (!show) return null;

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    onSubmit(rating);
    setRating(0);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">

        <h2>⭐ Rate Listing</h2>

        <p>
          How would you rate <strong>{listing.shop_name}</strong>?
        </p>

        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "selected" : ""}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <div className="popup-buttons">

          <button
            className="cancel-btn"
            onClick={() => {
              setRating(0);
              onClose();
            }}
          >
            Cancel
          </button>

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Rating
          </button>

        </div>

      </div>
    </div>
  );
}

export default RatingPopup;