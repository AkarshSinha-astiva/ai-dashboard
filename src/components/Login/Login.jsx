import React, { useState } from "react";
import "./Login.css";
import Image from "../../assets/LoginImage.png";
import { useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.png";
import GoogleSvg from "../../assets/GoogleSvg.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const isValid =
      formData.email === "test@example.com" && formData.password === "123456";

    if (isValid) {
      setError("");
      //console.log("Login successful");
    } else {
      setError("Invalid username or password");
      setFormData({ email: "", password: "", remember:false });
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">{/* <img src={Logo} alt="" /> */}</div>
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
                required
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    color="#281515ff"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    color="#281515ff"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input
                    type="checkbox"
                    id="remember-checkbox"
                    checked={formData.remember}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        remember: e.target.checked,
                      }))
                    }
                  />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                {/* <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button> */}
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            New to Astiva?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
