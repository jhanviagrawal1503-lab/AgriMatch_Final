import "./HighestRatedCard.css";

function HighestRatedCard({ listing }) {
  return (
    <div className="highest-card">
      <h2>⭐ Your Highest Rated Listing</h2>

      <div className="highest-content">
        <div className="highest-icon">🌾</div>

        <div>
          <h3>{listing.name}</h3>

          <p>
            You rated this ⭐⭐⭐⭐⭐
          </p>

          <p>
            We'll recommend similar listings based on its features.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HighestRatedCard;