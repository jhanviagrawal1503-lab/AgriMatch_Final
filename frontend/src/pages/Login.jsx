import { useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const data = await loginUser(userId, password);

        if (data.status === "success") {
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("isLoggedIn", "true");

          alert("Login Successful!");
          navigate("/listings");

        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Could not connect to backend.");
    }
};
  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">

          <h1>Welcome Back 🌾</h1>

          <p>
            Login to rate listings and receive personalized recommendations.
          </p>

          <form onSubmit={handleLogin}>

            <label>User ID</label>

              <input
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <div className="login-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Login;