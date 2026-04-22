import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/auth/signup", {
        email,
        password
      });

      alert("User created");

      // ✅ REDIRECT HERE
      window.location.href = "/login";

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?
        <button onClick={() => window.location.href = "/login"}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;