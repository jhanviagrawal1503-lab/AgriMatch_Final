import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import HighestRatedCard from "../components/HighestRatedCard";
import RecommendationCard from "../components/RecommendationCard";
import "./Recommendations.css";

function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);
  const [highestRated, setHighestRated] = useState(null);
  const [loading, setLoading] = useState(true);

  // BACKEND INTEGRATION
  useEffect(() => {

    const userId = localStorage.getItem("user_id");

    // No logged-in user
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8000/recommend/${userId}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }

        return response.json();
      })
      .then((data) => {

        console.log("Recommendation API response:", data);

        if (data.status === "success") {

          const recommendationList = data.recommendations || [];

          setRecommendations(recommendationList);

          // Find highest-rated recommendation
          if (recommendationList.length > 0) {

            const highest = recommendationList.reduce(
              (max, item) =>
                item.average_rating > max.average_rating
                  ? item
                  : max,
              recommendationList[0]
            );

            setHighestRated(highest);

          } else {
            setHighestRated(null);
          }

        } else {

          // no_ratings case
          setRecommendations([]);
          setHighestRated(null);

        }

        setLoading(false);
      })
      .catch((error) => {

        console.error("Error fetching recommendations:", error);

        setRecommendations([]);
        setHighestRated(null);
        setLoading(false);

      });

  }, []);

  return (
    <>
      <Navbar />

      <div className="recommend-page">

        <h1>Personalized Recommendations</h1>

        <p className="recommend-subtitle">
          Based on your ratings, we found listings you may like.
        </p>

        {/* Highest Rated */}
        {!loading && highestRated && (
          <HighestRatedCard listing={highestRated} />
        )}

        <h2 className="recommend-heading">
          Recommended For You
        </h2>

        {loading ? (

          <div className="empty-state">
            <h2>Loading recommendations... 🌱</h2>
          </div>

        ) : recommendations.length > 0 ? (

          <div className="recommend-grid">

            {recommendations.map((recommendation) => (

              <RecommendationCard
                key={recommendation.id}
                crop={recommendation}
              />

            ))}

          </div>

        ) : (

          <div className="empty-state">

            <h2>No recommendations yet 🌱</h2>

            <p>
              Rate a few listings first and we'll recommend similar crops and shops for you.
            </p>

          </div>

        )}

      </div>
    </>
  );
}

export default Recommendations;