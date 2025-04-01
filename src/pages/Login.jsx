import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { emailRegex } from "../constants";
import "../css/Form.css";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false);
  const { authenticateUser } = useAuthContext();
 
  const Login = async () => {
    if (loading) return;

    const incomingUser = {
      authentication: {
        email: email,
        password: password,
      },
    };

    try {
      await authenticateUser(incomingUser);
      setSuccess(true)
    } catch (err) {
      setError("Incorrect Email/Password")
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!emailRegex.test(email)) {
      setError("Invalid Email");
      return;
    }

    Login();
  };

  if (success) {
    return <Navigate to="/" />;
  }


  return (
    <div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="form-input"
          ></input>

          <input
            type="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="form-input"
          ></input>

          <div className="submission-section">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <Link to="/register">Don't have an account? Register Here</Link>
          </div>
        </form>
      </div>

      {error && (
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
