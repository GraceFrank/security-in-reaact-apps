import axios from "axios";
import React, { useState } from "react";
import { validateSignUpForm } from "./validators";
const url = "http://localhost:4000/api/users";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { isFormValid, errors } = validateSignUpForm(user);
    if (!isFormValid) {
      setSubmitting(false);
      setErrors(errors);
    } else {
      const data = {
        name: {
          first: user.firstName,
          last: user.lastName,
        },
        userName: user.username,
        email: user.email,
        password: user.password,
      };
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url,
        data,
      })
        .then((res) => {
          setSubmitting(false);
          if (!res.status === 201) throw new Error();
          props.history.push("/");
        })
        .catch((err) => {
          setSubmitting(false);
          setFormError("Username or Email already in use");
        });
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div className="card horizontal">
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">
                Username
                <input
                  name="username"
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={handleChange}
                />
              </label>
              {errors.username && (
                <span className="helper-text red-text">{errors.username}</span>
              )}
            </div>

            <div>
              <label htmlFor="firstName">
                First Name
                <input
                  name="firstName"
                  id="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <span
                    className="helper-text red-text"
                    data-error="wrong"
                    data-success="right"
                  >
                    {errors.firstName}
                  </span>
                )}
              </label>
            </div>

            <div>
              <label htmlFor="lastName">
                LastName
                <input
                  name="lastName"
                  id="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span
                    className="helper-text red-text"
                    data-error="wrong"
                    data-success="right"
                  >
                    {errors.lastName}
                  </span>
                )}
              </label>
            </div>

            <div>
              <label htmlFor="email">
                Email
                <input
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span
                    className="helper-text red-text"
                    data-error="wrong"
                    data-success="right"
                  >
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <div>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span
                    className="helper-text red-text red"
                    data-error="wrong"
                    data-success="right"
                  >
                    {errors.password}
                  </span>
                )}
              </label>
            </div>

            <button
              className="btn red waves-light lighten-2"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Loading..." : "Submit"}
            </button>
            {formError && <p>{formError} </p>}
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
