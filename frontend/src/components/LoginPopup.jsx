import "./LoginPopup.css";

function LoginPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>🔒 Login Required</h2>

        <p>
          Please login before using this feature.
        </p>

        <button onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default LoginPopup;