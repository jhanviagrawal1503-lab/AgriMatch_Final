from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel, Field
from bson import ObjectId
from ml_recommendation import get_recommendations

app = FastAPI()

# ---------------- CORS ---------------- #

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- MongoDB ---------------- #

client = MongoClient("mongodb://localhost:27017")

db = client["AgriMatchDB"]

users_collection = db["users"]
listings_collection = db["listings"]
ratings_collection = db["ratings"]


# ---------------- Helper ---------------- #

def listing_helper(listing):
    return {
        "id": str(listing["_id"]),
        "shop_name": listing["shop_name"],
        "crop": listing["crop"],
        "soil_type": listing["soil_type"],
        "season": listing["season"],
        "price": listing["price"],
        "average_rating": listing.get("average_rating", 0.0)
    }

# ---------------- Model ---------------- #

class Listing(BaseModel):

    shop_name: str = Field(..., min_length=2, max_length=50)

    crop: str = Field(..., min_length=2, max_length=30)

    soil_type: str = Field(..., min_length=2, max_length=30)

    season: str = Field(..., min_length=2, max_length=20)

    price: int = Field(..., gt=0)


class User(BaseModel):
    user_id: str = Field(..., min_length=3, max_length=20)
    password: str = Field(..., min_length=6)


class Rating(BaseModel):
    user_id: str
    listing_id: str
    rating: float = Field(..., ge=0, le=5)

# ---------------- Home ---------------- #

@app.get("/")
def home():
    return {"message": "AgriMatch Backend Running"}
# ---------------- REGISTER ---------------- #

@app.post("/register")
def register(user: User):

    # Check if user already exists
    existing_user = users_collection.find_one(
        {"user_id": user.user_id}
    )

    if existing_user:
        return {
            "status": "error",
            "message": "User already exists"
        }

    # Save new user
    users_collection.insert_one({
        "user_id": user.user_id,
        "password": user.password
    })

    return {
        "status": "success",
        "message": "Registration successful",
        "user_id": user.user_id
    }

# ---------------- LOGIN ---------------- #

@app.post("/login")
def login(user: User):

    existing_user = users_collection.find_one(
        {"user_id": user.user_id}
    )

    # User does not exist
    if not existing_user:
        return {
            "status": "error",
            "message": "User not found"
        }

    # Wrong password
    if existing_user["password"] != user.password:
        return {
            "status": "error",
            "message": "Incorrect password"
        }

    # Successful login
    return {
        "status": "success",
        "message": "Login successful",
        "user_id": existing_user["user_id"]
    }

# ---------------- RATE LISTING ---------------- #

# ---------------- RATE LISTING ---------------- #

@app.post("/rate")
def rate_listing(rating: Rating):

    # Check that the user exists
    user = users_collection.find_one(
        {"user_id": rating.user_id}
    )

    if not user:
        return {
            "status": "error",
            "message": "User not found"
        }

    # Check that the listing exists
    try:
        listing_id = ObjectId(rating.listing_id)
    except:
        return {
            "status": "error",
            "message": "Invalid listing ID"
        }

    listing = listings_collection.find_one(
        {"_id": listing_id}
    )

    if not listing:
        return {
            "status": "error",
            "message": "Listing not found"
        }

    # Check if this user already rated this listing
    existing_rating = ratings_collection.find_one({
        "user_id": rating.user_id,
        "listing_id": rating.listing_id
    })

    if existing_rating:

        # Update existing rating
        ratings_collection.update_one(
            {"_id": existing_rating["_id"]},
            {
                "$set": {
                    "rating": rating.rating
                }
            }
        )

        message = "Rating updated successfully"

    else:

        # Create new rating
        ratings_collection.insert_one({
            "user_id": rating.user_id,
            "listing_id": rating.listing_id,
            "rating": rating.rating
        })

        message = "Rating submitted successfully"

    # Calculate new average rating
    all_ratings = ratings_collection.find({
        "listing_id": rating.listing_id
    })

    rating_values = [
        item["rating"]
        for item in all_ratings
    ]

    if rating_values:
        average_rating = sum(rating_values) / len(rating_values)
    else:
        average_rating = 0.0

    # Update average rating in listings collection
    listings_collection.update_one(
        {"_id": listing_id},
        {
            "$set": {
                "average_rating": round(average_rating, 2)
            }
        }
    )

    return {
        "status": "success",
        "message": message,
        "user_id": rating.user_id,
        "listing_id": rating.listing_id,
        "rating": rating.rating,
        "average_rating": round(average_rating, 2)
    }

# ---------------- GET RATINGS ---------------- #

@app.get("/ratings")
def get_ratings():

    ratings = []

    for rating in ratings_collection.find():
        ratings.append({
            "id": str(rating["_id"]),
            "user_id": rating["user_id"],
            "listing_id": rating["listing_id"],
            "rating": rating["rating"]
        })

    return ratings

# ---------------- GET RATINGS FOR ONE USER ---------------- #

@app.get("/ratings/{user_id}")
def get_user_ratings(user_id: str):

    ratings = []

    for rating in ratings_collection.find(
        {"user_id": user_id}
    ):

        # Find the listing that this user rated
        try:
            listing = listings_collection.find_one(
                {"_id": ObjectId(rating["listing_id"])}
            )
        except:
            continue

        if not listing:
            continue

        ratings.append({
            "user_id": rating["user_id"],
            "listing_id": rating["listing_id"],
            "rating": rating["rating"],
            "shop_name": listing["shop_name"],
            "crop": listing["crop"],
            "soil_type": listing["soil_type"],
            "season": listing["season"],
            "price": listing["price"]
        })

    return ratings

# ---------------- CREATE ---------------- #

@app.post("/add-listing")
def add_listing(listing: Listing):

    listing_dict = listing.model_dump()
    listing_dict["average_rating"] = 0.0

    result = listings_collection.insert_one(listing_dict)

    saved_listing = listings_collection.find_one(
        {"_id": result.inserted_id}
    )

    return listing_helper(saved_listing)


# ---------------- READ ALL ---------------- #

@app.get("/listings")
def get_listings():

    listings = []

    for listing in listings_collection.find():
        listings.append(listing_helper(listing))

    return listings


# ---------------- READ ONE ---------------- #

@app.get("/listing/{id}")
def get_listing(id: str):

    listing = listings_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if listing:
        return listing_helper(listing)

    return {"error": "Listing not found"}


# ---------------- UPDATE ---------------- #

@app.put("/listing/{id}")
def update_listing(id: str, listing: Listing):

    listings_collection.update_one(
        {"_id": ObjectId(id)},
        {
            "$set": {
                "shop_name": listing.shop_name,
                "crop": listing.crop,
                "soil_type": listing.soil_type,
                "season": listing.season,
                "price": listing.price,
                
            }
        }
    )

    updated_listing = listings_collection.find_one(
        {"_id": ObjectId(id)}
    )

    if updated_listing:
        return listing_helper(updated_listing)

    return {"error": "Listing not found"}


# ---------------- DELETE ---------------- #

@app.delete("/listing/{id}")
def delete_listing(id: str):

    result = listings_collection.delete_one(
        {"_id": ObjectId(id)}
    )

    if result.deleted_count == 1:
        return {
            "status": "success",
            "message": "Listing Deleted Successfully"
        }

    return {"error": "Listing not found"}


# ---------------- SEARCH ---------------- #

@app.get("/soil-types")
def get_soil_types():

    soil_types = listings_collection.distinct("soil_type")

    return soil_types
@app.get("/seasons")
def get_seasons():

    seasons = listings_collection.distinct("season")

    return seasons
@app.get("/price-options")
def get_price_options():

    prices = listings_collection.distinct("price")

    prices.sort()

    return prices
# ---------------- FILTER ---------------- #

@app.get("/filter/season")
def filter_by_season(season: str):

    listings = []

    for listing in listings_collection.find(
        {"season": {"$regex": f"^{season}$", "$options": "i"}}
    ):
        listings.append(listing_helper(listing))

    return listings

@app.get("/filter")
def filter_listings(
    soil_type: str = None,
    season: str = None,
    max_price: int = None
):

    query = {}

    if soil_type:
        query["soil_type"] = {
            "$regex": soil_type,
            "$options": "i"
        }

    if season:
        query["season"] = {
            "$regex": season,
            "$options": "i"
        }

    if max_price:
        query["price"] = {
            "$lte": max_price
        }

    listings = []

    for listing in listings_collection.find(query):
        listings.append(listing_helper(listing))

    return listings

@app.get("/recommend/{user_id}")
def recommend(user_id: str):

    # Get all ratings
    ratings = []

    for rating in ratings_collection.find():
        ratings.append({
            "user_id": rating["user_id"],
            "listing_id": rating["listing_id"],
            "rating": rating["rating"]
        })

    # Get all listings
    listings = []

    for listing in listings_collection.find():
        listings.append({
            "_id": str(listing["_id"]),
            "shop_name": listing["shop_name"],
            "crop": listing["crop"],
            "soil_type": listing["soil_type"],
            "season": listing["season"],
            "price": listing["price"],
            "average_rating": listing.get("average_rating", 0.0)
        })

    # Check whether this user has rated anything
    user_ratings = [
        rating for rating in ratings
        if rating["user_id"] == user_id
    ]

    if not user_ratings:
        return {
            "status": "no_ratings",
            "message": "User has not rated any listings yet",
            "recommendations": []
        }

    # Send data to ML
    recommendations = get_recommendations(
        user_id=user_id,
        ratings_data=ratings,
        listings_data=listings,
        top_n=5
    )

    return {
        "status": "success",
        "user_id": user_id,
        "recommendations": recommendations
    }