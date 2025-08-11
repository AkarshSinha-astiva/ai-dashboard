import React, { useState, useRef } from "react";
import "./SignUp.css";
import Image from "../../assets/LoginImage.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { signup } from "../../api/authApis";

const SignUp = () => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  // Auto focus first field
  React.useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must have at least 1 uppercase letter and 1 number";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Submit handler
  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");

    if (!validate()) return;

    setLoading(true);
    const payload = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      agree_to_terms: formData.agreeToTerms,
    };

    try {
      console.log(payload,'before')
      const result = await signup(payload);
      console.log(result, payload);
      setApiSuccess("Account created successfully! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setApiError(err?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  console.log(formData)

  return (
    <div className="signup-main">
      <div className="signup-left">
        <img src={Image} alt="Sign up illustration" />
      </div>
      <div className="signup-right">
        <p className="signup-top-p">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign In</span>
        </p>
        <div className="signup-right-container">
          <div className="signup-center">
            <h2 style={{ marginBottom: "12px" }}>Create your Astiva account</h2>

            {/* API messages */}
            {apiError && <div className="error-message show">{apiError}</div>}
            {apiSuccess && (
              <div className="success-message show">{apiSuccess}</div>
            )}

            <form onSubmit={handleSignUp} noValidate>
              {/* First Name */}
              {errors.firstName && (
                <small className="field-error">{errors.firstName}</small>
              )}
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                ref={firstInputRef}
              />

              {/* Last Name */}
              {errors.lastName && (
                <small className="field-error">{errors.lastName}</small>
              )}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />

              {/* Email */}
              {errors.email && (
                <small className="field-error">{errors.email}</small>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              {/* Password */}
              {errors.password && (
                <small className="field-error">{errors.password}</small>
              )}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )}
              </div>

              {/* Terms checkbox */}
              {errors.agreeToTerms && (
                <small className="field-error">{errors.agreeToTerms}</small>
              )}
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label>
                  I agree to the <a href="#">Terms of Service</a> and{" "}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <div className="signup-center-buttons">
                <button type="submit" disabled={loading}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
