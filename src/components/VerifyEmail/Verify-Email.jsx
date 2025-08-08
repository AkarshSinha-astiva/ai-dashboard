import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"; // If not using react-router, see notes below

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] =
    (useState < "loading") | "success" | ("error" > "loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    // Call backend verify API
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.status) {
          setStatus("success");
          setMessage(
            "Your email has been verified successfully! Redirecting to login..."
          );
          setTimeout(() => navigate("/"), 3000);
        } else {
          setStatus("error");
          setMessage(data.message || "Email verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("An error occurred. Please try again later.");
      });
  }, [searchParams, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {status === "loading" && <p>🔄 {message}</p>}
      {status === "success" && <p style={{ color: "green" }}>✅ {message}</p>}
      {status === "error" && <p style={{ color: "red" }}>❌ {message}</p>}
    </div>
  );
};

export default VerifyEmail;
