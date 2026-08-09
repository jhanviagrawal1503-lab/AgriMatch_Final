import "./SuccessPopup.css";

function SuccessPopup({ show, onClose, onLogout }) {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">

        <h2>⚠️ Confirm Logout</h2>

        <p>
          Are you sure you want to log out?
        </p>

        <div className="popup-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="logout-confirm-btn" onClick={onLogout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default SuccessPopup;