import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Temporarily just navigate to dashboard without authentication
      // TODO: Uncomment this when Firebase is properly configured
      // await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login temporarily disabled - Firebase not configured");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}