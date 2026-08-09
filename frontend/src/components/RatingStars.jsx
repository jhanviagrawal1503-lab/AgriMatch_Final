import { useState } from "react";

function RatingStars() {
  const [rating, setRating] = useState(0);

  return (
    <div style={{ marginTop: "10px" }}>
      <p><strong>Rate this:</strong></p>

      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "28px",
            color: star <= rating ? "gold" : "lightgray",
            marginRight: "5px",
          }}
        >
          ★
        </span>
      ))}

      <p>Your Rating: {rating}/5</p>
    </div>
  );
}

export default RatingStars;