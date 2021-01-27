import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";

const Admin = lazy(() => import("./Admin"));
const NotFound = lazy(() => import("./NotFound"));
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  return (
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
              
            </ul>
          </div>
        </nav>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={Login} />

            <Route
              path="/dashboard"
              component={Dashboard}
            />
            <Route
              path="/admin"
              component={Admin}
            />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
  );
}

export default App;
