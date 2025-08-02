import React, { useState, useEffect, useMemo } from "react";
import "./SignUp.css";
import Image from "../../assets/LoginImage.png";
import { useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.png";
import GoogleSvg from "../../assets/GoogleSvg.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import Select from "react-select";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [countries, setCountries] = useState([]);
  // Fetch country list
  useEffect(() => {
    fetch("https://api.first.org/data/v1/countries?limit=300")
      .then((res) => res.json())
      .then((data) => {
        const countryList = Object.values(data.data).map(
          (item) => item.country
        );
        setCountries(countryList);
      });
  }, []);

  const countryOptions = useMemo(
    () =>
      countries.map((country) => ({
        value: country,
        label: country,
      })),
    [countries]
  );

  console.log(countries);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add validations and API call here
    if (!formData.email || !formData.password || !formData.firstName) {
      setError("Please fill all required fields");
    } else {
      setError("");
      console.log("Account created:", formData);
      navigate("/");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <p className="login-top-p">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Sign In</span>
          </p>
        <div className="login-right-container">
          <div className="login-center">
            <h2>Create your Astiva account</h2>
            <div className={`error-message ${error ? "show" : ""}`}>
              {error || " "}
            </div>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
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
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(true)} />
                )}
              </div>
              <Select
                name="country"
                options={countryOptions}
                value={countryOptions?.find(
                  (option) => option.value === formData.country
                )}
                onChange={(selectedOption) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: selectedOption ? selectedOption.value : "",
                  }))
                }
                placeholder="Select Country/Region"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "100%",
                    padding: "6px",
                    marginBottom: "16px",
                    border: "0px",
                    borderBottom: "1px solid black",
                    borderRadius: "10px",
                    boxShadow: "none",
                    caretColor: "transparent",
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight:'500',
                    color:'black'
                  }),
                  input: (base) => ({
                    ...base,
                    textShadow: "0 0 0 gray",
                    caretColor: "transparent",
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#999",
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                  }),
                  menu: (base) => ({
                    ...base,
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                  }),
                  option: (base, state) => ({
                    ...base,
                    textAlign: "left",
                    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                    color: "black",
                    fontFamily: "Poppins, sans-serif",
                  }),
                }}
              />
              <div className="login-center-buttons">
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            By creating an account, you agree to the{" "}
            <a href="#">Terms of Service</a>. For more information about
            Astiva's privacy practices, see the{" "}
            <a href="#">Astiva Privacy Statement</a>. We'll occasionally send
            you account-related emails.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
