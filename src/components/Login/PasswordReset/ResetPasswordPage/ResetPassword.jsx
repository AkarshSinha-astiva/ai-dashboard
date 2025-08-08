import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token");

  // ✅ Handle missing token on page load
  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing reset token.");
    }
  }, [token]);

  const validatePassword = (pwd) => {
    // Example: Minimum 8 chars, one uppercase, one lowercase, one number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  const handleReset = async () => {
    setMessage("");

    if (!password || !confirmPassword) {
      return setMessage("Please fill in all fields.");
    }
    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }
    if (!validatePassword(password)) {
      return setMessage(
        "Password must be at least 8 characters, include uppercase, lowercase, and a number."
      );
    }
    if (!token) {
      return setMessage("Invalid or missing reset token.");
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // token from URL
          },
          body: JSON.stringify(password),
        }
      );

      const data = await res.json();
      console.log

      if (res.ok) {
        setSuccess(true);
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>

        {message && (
          <p className={`reset-message ${success ? "success" : "error"}`}>
            {message}
          </p>
        )}

        {!success && (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="reset-input"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reset-input"
            />
            <button
              onClick={handleReset}
              disabled={loading}
              className={`reset-button ${loading ? "disabled" : ""}`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
