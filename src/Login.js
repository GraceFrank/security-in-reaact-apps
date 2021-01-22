import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const url = "http://localhost:4000/api/login";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthUser } = authContext;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    axios
      .post(url, { email, password })
      .then((res) => {
        setSubmitting(false);
        if (!res.status === 200) throw new Error();
        setAuthUser(res.data.payload);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        setSubmitting(false);
        setError("Email or password is incorrect");
      });
  };

  return (
    <div className="container">
      <h2 className="header">Login</h2>
      <div className="card horizontal">
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>

            <button
              className="btn red waves-light lighten-2"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Loading..." : "Submit"}
            </button>
            {error && <p>{error} </p>}
          </form>
        </div>
      </div>
      <p>
        Don't have an account? <br />
        <a href="/signup">Signup here</a>
      </p>
    </div>
  );
}

export default Login;
