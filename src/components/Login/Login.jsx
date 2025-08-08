import React, { useState } from "react";
import "./Login.css";
import Image from "../../assets/LoginImage.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ForgotPasswordModal from "./PasswordReset/ForgotPasswordModal";

const Login = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            remember_me: formData.remember,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.status) {
        // Save auth data (token + user)
        if (formData.remember) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
        }

        // Redirect to dashboard/home
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(formData);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2>Sign In to Astiva</h2>
            <p>Please enter your details</p>

            <div className={`error-message ${error ? "show" : ""}`}>
              {error || " "}
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                {showPassword ? (
                  <FaEyeSlash
                    color="#281515"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    color="#281515"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <div
                  className="forgot-pass-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  Forgot password?
                </div>
              </div>

              <div className="login-center-buttons">
                <button type="submit" disabled={loading}>
                  Log In
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            New to Astiva?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
        {showModal && (
          <ForgotPasswordModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Login;
