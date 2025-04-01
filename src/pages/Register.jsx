import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { usernameRegex, passwordRegex, emailRegex } from "../constants";
import "../css/Form.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);
  const [apiError, setAPIError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { registerUser } = useAuthContext();

  const createNewUser = async () => {
    if (loading) return;

    const newUser = {
      username: username,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      await registerUser(newUser);
      setSuccess(true);
    } catch (err) {
      setAPIError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setAPIError(null);

    const foundErrors = [];

    if (!firstName) {
      foundErrors.push("First name can't be empty");
    }
    if (!lastName) {
      foundErrors.push("Last name can't be empty");
    }
    if (!usernameRegex.test(username)) {
      foundErrors.push("Username must be 3 to 23 characters long");
    }
    if (!emailRegex.test(email)) {
      foundErrors.push("Invalid Email");
    }
    if (!passwordRegex.test(password)) {
      foundErrors.push(
        "Password must be 8-24 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character"
      );
    }
    if (!(matchPassword === password)) {
      foundErrors.push("Passwords do not match");
    }

    if (foundErrors.length > 0) {
      setErrors(foundErrors);
    } else {
      createNewUser();
    }
  };

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First Name"
            className="form-input"
          ></input>

          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last Name"
            className="form-input"
          ></input>

          <input
            type="text"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            className="form-input"
          ></input>

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

          <input
            type="password"
            autoComplete="off"
            onChange={(e) => setMatchPassword(e.target.value)}
            value={matchPassword}
            placeholder="Verify Password"
            className="form-input"
          ></input>

          <div className="submission-section">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <Link to="/login">Already have an account? Login Here</Link>
          </div>
        </form>
      </div>

      {errors && (
        <div className="error-container">
          <ul className="error-list">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {apiError && (
        <div className="error-container">
          <div className="error">Username or Email are already taken</div>
        </div>
      )}
    </div>
  );
}

export default Register;
