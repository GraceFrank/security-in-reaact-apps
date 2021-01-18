import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const url =
  "https://cors-anywhere.herokuapp.com/https://gdoc.herokuapp.com/api/login";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const authContext = useContext(AuthContext);
  const { setAuthToken } = authContext;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    axios
      .post(url, { email, password })
      .then((res) => {
        setSubmitting(false);
        if (!res.status === 200) throw new Error();
        setAuthToken(res.data["x-auth-token"]);
        props.history.push("/profile");
      })
      .catch((err) => {
        setSubmitting(false);
        console.log(err);
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

            <button className="btn red waves-light lighten-2" type="submit">
              {submitting ? "Loading..." : "Submit"}
            </button>
            {error && <p>{error} </p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
