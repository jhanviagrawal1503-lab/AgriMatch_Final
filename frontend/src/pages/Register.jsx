import { useState } from "react";
import { registerUser } from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";

function Register() {
    const [form, setForm] = useState({
    user_id: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleRegister = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const data = await registerUser(
      form.user_id,
      form.password
    );

    if (data.status === "success") {
      alert("Registration Successful!");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error("Registration error:", error);
    alert("Could not connect to backend.");
  }
};

  return (
    <>
      <Navbar />

      <div className="login-page">
        <div className="login-card">

          <h1>Create Account 🌱</h1>

          <p>
            Join AgriMatch to rate listings and receive personalized recommendations.
          </p>

          <form onSubmit={handleRegister}>

            <label>User ID</label>
            <input
              type="text"
              name="user_id"
              placeholder="Create a user ID"
              value={form.user_id}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Register
            </button>

          </form>

          <div className="login-footer">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default Register;