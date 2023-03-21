import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./Login";
import { UserContext } from "./UserContext";
import Albums from "./albums";
import Comments from "./comments";
import Dashboard from "./dashboard";
import Photos from "./photos";
import Posts from "./posts";
import Todos from "./todos";
import PrivateRoute from "../src/components/PrivateRoute";

function App() {
  const [userData, setUserData] = useState(
    localStorage.userDataStorge ? JSON.parse(localStorage.userDataStorge) : {}
  );
  const [authed, setAuthed] = useState(false);

  const setUserDetails = (data) => {
    setUserData(data);
  };

  return (
    <div className="App">
      <div className="container-fluid ps-0">
        <UserContext.Provider
          value={{
            setUserDetails,
            userData,
          }}
        >
          <Router>
            <Routes>
              <Route
                path="/"
                element={<PrivateRoute Component={Login} />}
                exact
              />
              <Route
                path="/login"
                element={<PrivateRoute Component={Login} />}
                exact
              />

              <Route
                element={<PrivateRoute Component={Dashboard} />}
                path="/dashboard"
                exact
              />
              <Route
                element={<PrivateRoute Component={Posts} />}
                path="/posts"
                exact
              />
              <Route
                element={<PrivateRoute Component={Albums} />}
                path="/albums"
                exact
              />
              <Route
                element={<PrivateRoute Component={Todos} />}
                path="/todos"
                exact
              />
              <Route
                element={<PrivateRoute Component={Comments} />}
                path="/comments"
                exact
              />
              <Route
                element={<PrivateRoute Component={Photos} />}
                path="/photos"
                exact
              />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
