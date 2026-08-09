import { useParams } from "react-router-dom";
import { useState } from "react";
import listings from "../data/listings";
import RatingStars from "../components/RatingStars";

function ListingDetails() {
  const { id } = useParams();

  const listing = listings.find(
    item => item.id === Number(id)
  );

  const [rating, setRating] = useState(0);

  if (!listing) return <h2>Listing not found</h2>;

  return (
    <div style={{padding:"40px"}}>

      <h1>{listing.name}</h1>

      <RatingStars rating={listing.averageRating} />

      <h3>
        Average Rating:
        {" "}
        {listing.averageRating}/5
      </h3>

      <p>
        {listing.totalRatings} people have rated this.
      </p>

      <hr />

      <h2>Rate this crop</h2>

      <div style={{fontSize:"40px"}}>

        {[1,2,3,4,5].map(star=>(
          <span
            key={star}
            style={{
              cursor:"pointer",
              color:
                star<=rating
                ? "#FFD700"
                : "#ccc"
            }}
            onClick={()=>setRating(star)}
          >
            ★
          </span>
        ))}

      </div>

      <br />

      <button>
        Submit Rating
      </button>

    </div>
  );
}

export default ListingDetails;