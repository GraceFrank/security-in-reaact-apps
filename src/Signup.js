import axios from "axios";
import React, { useState } from "react";
const SignUp = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    const updatedUser = { ...user };
    updatedUser[id] = value;
    setUser(updatedUser);
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div className="card horizontal">
        <div className="card-content">
          <form>
            <div>
              <label htmlFor="username">
                Username
                <input
                  name="username"
                  id="username"
                  type="text"
                  />
              </label>
            </div>

            <div>
              <label htmlFor="firstName">
                First Name
                <input
                  name="firstName"
                  id="firstName"
                />
                
              </label>
            </div>

            <div>
              <label htmlFor="lastName">
                LastName
                <input
                  name="lastName"
                  id="lastName"
                  
                />
                
              </label>
            </div>

            <div>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                />
                
              </label>
            </div>

            <div>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                />
              </label>
            </div>

            <button
              className="btn red waves-light lighten-2"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      <p>
        Aleady have an account? <br />
        <a href="/">Log in here</a>
      </p>
    </div>
  );
};

export default SignUp;
