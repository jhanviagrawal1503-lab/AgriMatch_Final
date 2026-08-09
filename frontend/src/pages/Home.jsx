import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Statistics */}
      <section className="stats">
        <div className="stat-card">
          <h2>250+</h2>
          <p>Farmers</p>
        </div>

        <div className="stat-card">
          <h2>1500+</h2>
          <p>Listings</p>
        </div>

        <div className="stat-card">
          <h2>98%</h2>
          <p>Recommendation Accuracy</p>
        </div>

        <div className="stat-card">
          <h2>15+</h2>
          <p>States Covered</p>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose AgriMatch?</h2>

        <p className="feature-subtitle">
          Everything farmers and buyers need in one place.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🌾</span>
            <h3>Smart Recommendations</h3>
            <p>
              Get AI-powered crop suggestions based on soil, season and
              community ratings.
            </p>
          </div>

          <div className="feature-card">
            <span>🤝</span>
            <h3>Farmer-Buyer Network</h3>
            <p>
              Connect directly with trusted farmers and agri suppliers.
            </p>
          </div>

          <div className="feature-card">
            <span>📈</span>
            <h3>Price Prediction</h3>
            <p>
              Estimate future crop prices using machine learning.
            </p>
          </div>

          <div className="feature-card">
            <span>⭐</span>
            <h3>Community Ratings</h3>
            <p>
              Buy confidently using trusted community reviews.
            </p>
          </div>

          <div className="feature-card">
            <span>🚚</span>
            <h3>Nearby Suppliers</h3>
            <p>
              Find fertilizers, seeds and agri-input shops nearby.
            </p>
          </div>

          <div className="feature-card">
            <span>🔍</span>
            <h3>Advanced Search</h3>
            <p>
              Filter crops by soil type, season and budget.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about">
        <h2>About AgriMatch</h2>

        <p>
          AgriMatch is an AI-powered agriculture platform that helps farmers
          discover suitable crops, compare agri-input suppliers and receive
          personalized recommendations using community ratings and smart
          filtering.
        </p>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <h2>How AgriMatch Works</h2>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Listings</h3>
            <p>
              Explore crops and agri-input suppliers using smart filters.
            </p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Recommendations</h3>
            <p>
              Receive personalized suggestions based on your farming conditions.
            </p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Rate & Review</h3>
            <p>
              Help other farmers by sharing your experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2>🌾 AgriMatch</h2>

            <p>
              AI-powered crop recommendation and marketplace platform for
              farmers.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>

            <a href="/">Home</a>
            <a href="/listings">Listings</a>
            <a href="/recommendations">Recommendations</a>
            <a href="/login">Login</a>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>

            <p>📧 support@agrimatch.com</p>
            <p>📍 India</p>
            <p>☎ +91 98765 43210</p>
          </div>
        </div>

        <hr />

        <p className="copyright">
          © 2026 AgriMatch. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;