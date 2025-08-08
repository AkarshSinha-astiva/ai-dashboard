import React, { useState } from "react";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("If the email exists, a password reset link has been sent.");
        setCooldown(true);
        setTimeout(() => setCooldown(false), 60000); // 1 min
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Reset Password</h2>

        <input
          type="email"
          className="modal-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message && <p className="modal-message">{message}</p>}

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            disabled={loading || !email || cooldown}
            onClick={handleReset}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
