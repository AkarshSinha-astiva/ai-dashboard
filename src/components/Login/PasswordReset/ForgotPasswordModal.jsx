import React, { useState } from "react";
import "./ForgotPasswordModal.css";
import { useAppContext } from "../../../components/context/AppContext";

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showVerificationView, setShowVerificationView] = useState(false);
  const { counter, startCounter } = useAppContext();
  console.log(counter);
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
        startCounter(60);
        setShowVerificationView(true); // switch to verification UI
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    startCounter(60);
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Verification email resent successfully.");
      } else {
        setMessage(data.message || "Failed to resend verification email.");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container fade">
        {!showVerificationView ? (
          <div key="reset-view" className="fade-content">
            <h2 className="modal-title">Reset Password</h2>

            <input
              type="email"
              className="modal-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {message && <p className="modal-message">{message}</p>}
            <p className="modal-message">
              {counter > 0 && (
                <> You can resend the link after {counter} seconds</>
              )}
            </p>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-primary"
                disabled={loading || !email || counter > 0}
                onClick={handleReset}
              >
                {loading ? "Please wait..." : "Reset Password"}
              </button>
            </div>
          </div>
        ) : (
          <div key="verify-view" className="fade-content">
            <h2 className="modal-title">Please verify your email</h2>
            <p className="modal-message">
              We just sent an email to <strong>{email}</strong>. Click the link
              in the email to verify your account.
              {counter > 0 && (
                <> You can resend the link after {counter} seconds</>
              )}
            </p>

            {message && <p className="modal-message">{message}</p>}

            <div className="modal-actions">
              <button
                className="btn-primary"
                disabled={loading || counter > 0}
                onClick={handleResendEmail}
              >
                {loading ? "Resending..." : "Resend Email"}
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowVerificationView(false);
                  setMessage("");
                }}
              >
                Update Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
