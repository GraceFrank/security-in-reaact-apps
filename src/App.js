import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Profile from "./Profile";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const setAuthToken = (authToken) => {
    localStorage.setItem("token", authToken);
    setToken(authToken);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn: false, token, setAuthToken }}>
      <Router>
        <nav>
          <div className="nav-wrapper">
            <ul>
              <li>
                <Link to="/profile">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/admin">ADMIN</Link>
              </li>
              <li>
                <button className="btn red waves-light lighten-2" type="button">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/admin" component={Admin} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
