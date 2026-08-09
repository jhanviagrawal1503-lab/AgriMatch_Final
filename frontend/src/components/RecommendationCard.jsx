import "./ListingCard.css";

function RecommendationCard({ crop }) {
  return (
    <div className="listing-card">

      <div className="listing-image">
        🌾
      </div>

      <div className="listing-content">
        <h2>{crop.shop_name}</h2>
        <h2>{crop.crop}</h2>

        <p>
          ⭐ <strong>{crop.average_rating}</strong> / 5
        </p>

        <p className="match">
          💚 <strong>{crop.score}% Match</strong>
        </p>

        <p className="because">
          Because you liked <strong>{crop.becauseYouLiked}</strong>
        </p>
        

        <p>
          <strong>🌱 Soil:</strong> {crop.soil}
        </p>

        <p>
          <strong>☀️ Season:</strong> {crop.season}
        </p>

        <p>
          <strong>💰 Price:</strong> ₹{crop.price}
        </p>

      </div>

    </div>
  );
}

export default RecommendationCard;