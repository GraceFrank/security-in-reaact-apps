import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Dashboard from "./Dashboard";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false, token: null }}>
      <Router>
        <nav>
          <div className="nav-wrapper">
            <ul>
              <li>
                <Link to="/dashboard">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/admin">ADMIN</Link>
              </li>
              <li>
                <button
                  className="btn waves-effect red waves-light lighten-2"
                  type="button"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/admin" component={Admin} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
