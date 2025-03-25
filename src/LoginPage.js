import React, { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password
    });
  
    if (error) {
      setError(error.message);
    } else {
      // Get the user’s email after successful login
      const userEmail = data.user.email;
  
      // Now look up the exhibitor record that matches this email
      const { data: exhibitor, error: fetchError } = await supabase
        .from("exhibitors")
        .select("slug")
        .eq("user_email", userEmail)
        .single();
  
      if (fetchError || !exhibitor) {
        setError("User is logged in, but no page was found.");
      } else {
        // Redirect the user to their landing page
        navigate(`/${exhibitor.slug}`);
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Client Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <button onClick={handleLogin}>Log In</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;