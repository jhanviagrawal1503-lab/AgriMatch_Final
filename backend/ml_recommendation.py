import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def get_recommendations(user_id, ratings_data, listings_data, top_n=5):

    ratings_df = pd.DataFrame(ratings_data)
    listings_df = pd.DataFrame(listings_data)

    # -----------------------------------------
    # CASE 1: No ratings at all
    # -----------------------------------------

    if ratings_df.empty:

        recommendations = (
            listings_df
            .sort_values(by="average_rating", ascending=False)
            .head(top_n)
        )

        return recommendations.to_dict(orient="records")


    # -----------------------------------------
    # Merge ratings with listing information
    # -----------------------------------------

    rated_data = pd.merge(
        ratings_df,
        listings_df,
        left_on="listing_id",
        right_on="_id"
    )

    rated_data = rated_data.reset_index(drop=True)


    # -----------------------------------------
    # Find this user's ratings
    # -----------------------------------------

    user_data = rated_data[
        rated_data["user_id"] == user_id
    ]


    # -----------------------------------------
    # CASE 2: User hasn't rated anything
    # -----------------------------------------

    if user_data.empty:

        recommendations = (
            listings_df
            .sort_values(by="average_rating", ascending=False)
            .head(top_n)
        )

        return recommendations.to_dict(orient="records")


    # -----------------------------------------
    # Create listing feature text
    # -----------------------------------------

    rated_data["features"] = (
        rated_data["crop"].fillna("") + " " +
        rated_data["soil_type"].fillna("") + " " +
        rated_data["season"].fillna("")
    )


    # -----------------------------------------
    # TF-IDF
    # -----------------------------------------

    vectorizer = TfidfVectorizer()

    feature_vectors = vectorizer.fit_transform(
        rated_data["features"]
    )


    # -----------------------------------------
    # Create user's preference vector
    # -----------------------------------------

    user_indices = user_data.index.tolist()

    user_vector = np.average(
        feature_vectors[user_indices].toarray(),
        axis=0,
        weights=user_data["rating"]
    )


    # -----------------------------------------
    # Calculate similarity
    # -----------------------------------------

    similarities = cosine_similarity(
        [user_vector],
        feature_vectors
    )[0]

    rated_data["similarity"] = similarities


    # -----------------------------------------
    # Remove listings already rated by user
    # -----------------------------------------

    already_rated = user_data["listing_id"].tolist()

    recommendations = rated_data[
        ~rated_data["listing_id"].isin(already_rated)
    ]


    # -----------------------------------------
    # Remove duplicate listings
    # -----------------------------------------

    recommendations = recommendations.drop_duplicates(
        subset="_id"
    )


    # -----------------------------------------
    # Sort by similarity
    # -----------------------------------------

    recommendations = recommendations.sort_values(
        by="similarity",
        ascending=False
    )


    recommendations = recommendations.head(top_n)


    # -----------------------------------------
    # Prepare frontend response
    # -----------------------------------------

    result = []
    liked_crops = user_data[
    user_data["rating"] >= 3
    ]["crop"].unique().tolist()

    liked_crops_text = ", ".join(liked_crops)

    for _, row in recommendations.iterrows():

        similarity_score = round(
            float(row["similarity"]) * 100,
            2
        )

        result.append({
            "id": str(row["_id"]),
            "shop_name": row["shop_name"],
            "crop": row["crop"],
            "soil": row["soil_type"],
            "season": row["season"],
            "price": row["price"],
            "average_rating": row["average_rating"],
            "score": similarity_score,
            "becauseYouLiked": liked_crops_text
        })

    return result