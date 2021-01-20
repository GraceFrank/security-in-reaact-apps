import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./Login";

import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
const ADMIN = "5cd15cb7869ed0915ee7555f";
const USER = "5cd15cb7869ed0915ee75560";

const Admin = lazy(() => import("./Admin"));
const NotFound = lazy(() => import("./NotFound"));
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  const setAuthUser = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };
  const logOut = () => {
    setAuthUser();
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn: false, user, setAuthUser }}>
      <Router>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">
              Logo
            </a>
            <ul className="right">
              <li>
                <Link to="/dashboard">DASHBOARD</Link>
              </li>
              <li>
                <Link to="/admin">ADMIN</Link>
              </li>
              <li>
                {user && (
                  <button
                    onClick={logOut}
                    className="btn red waves-light lighten-2"
                    type="button"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/" component={Login} />
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
              requiredRoles={[USER, ADMIN]}
            />
            <ProtectedRoute
              path="/admin"
              component={Admin}
              requiredRoles={[ADMIN]}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
