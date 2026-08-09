import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Recommendations from "./pages/Recommendations";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ListingDetails from "./pages/ListingDetails";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/listings"
          element={
            <ProtectedRoute>
              <Listings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <Recommendations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/listing/:id"
          element={
            <ProtectedRoute>
              <ListingDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;