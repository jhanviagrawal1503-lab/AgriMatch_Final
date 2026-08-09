import { useEffect, useState } from "react";
import { getListings } from "../api";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import "./Listings.css";


function Listings() {
  const [listings, setListings] = useState([]);


  const [search, setSearch] = useState("");
  const [soil, setSoil] = useState("All");
  const [season, setSeason] = useState("All");
  const [price, setPrice] = useState("All");


  useEffect(() => {
  getListings()
    .then((data) => {
      setListings(data);
    })
    .catch((error) => {
      console.error("Error fetching listings:", error);
    });
  }, []);


  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.crop &&
      listing.crop
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesSoil =
      soil === "All" || listing.soil_type === soil;


    const matchesSeason =
      season === "All" || listing.season === season;


    const matchesPrice =
      price === "All" || listing.price <= Number(price);


    return (
      matchesSearch &&
      matchesSoil &&
      matchesSeason &&
      matchesPrice
    );
  });


  return (
    <>
      {/* NAVBAR */}
      <Navbar />


      <div className="listings-page">


        <h1>Marketplace</h1>


        <p className="listing-subtitle">
          Find crops based on your farming conditions.
        </p>


        {/* SEARCH */}


        <input
          className="search-bar"
          type="text"
          placeholder="🔍 Search Crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        {/* FILTERS */}


        <div className="filters">


          {/* Soil */}


          <div className="filter-group">
            <label>🌱 Soil Type</label>


            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
            >
              <option>All</option>
              <option>Loamy</option>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Black Soil</option>
              <option>Sandy Loam</option>
            </select>
          </div>


          {/* Season */}


          <div className="filter-group">
            <label>☀️ Season</label>


            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option>All</option>
              <option>Kharif</option>
              <option>Rabi</option>
              <option>Summer</option>
              <option>Winter</option>
              <option>Monsoon</option>
            </select>
          </div>


          {/* Price */}


          <div className="filter-group">
            <label>💰 Price</label>


            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">All</option>
              <option value="100">₹100</option>
              <option value="200">₹200</option>
              <option value="500">₹500</option>
              <option value="800">₹800</option>
              <option value="1000">₹1,000</option>
            </select>
          </div>


        </div>


        {/* LISTINGS */}


        <div className="listing-grid">


          {filteredListings.length > 0 ? (


            filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
              />
            ))


          ) : (


            <div className="no-results">
              🌾 No listings match your search.
            </div>


          )}


        </div>


      </div>
    </>
  );
}


export default Listings;
