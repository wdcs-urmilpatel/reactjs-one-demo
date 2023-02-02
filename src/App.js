import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./dashboard";
import Posts from "./posts";
import Albums from "./albums";
import Todos from "./todos";
import Comments from "./comments";
import Photos from "./photos";
import { UserContext } from "./UserContext";
// import PrivateRoute from "../src/components/PrivateRoute";
// import PublicRoute from "../src/components/PublicRoute";

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [userData, setUserData] = useState(
    localStorage.userDataStorge ? JSON.parse(localStorage.userDataStorge) : {}
  );
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
              <Route path="/" element={<Login />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route
                path="/dashboard"
                element={
                  <PrivateWrapper auth={{ isAuthenticated: true }}>
                    <Dashboard />
                  </PrivateWrapper>
                }
              /> */}
              <Route path="/posts" element={<Posts />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/todos" element={<Todos />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/photos" element={<Photos />} />
            </Routes>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;

// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import { useState } from "react";
// import Navbar from "./Navbar";
// import Protected from "./Protected";
// import Home from "./Home";
// import About from "./About";
// import Profile from "./Profile";
// function App() {
// const [isLoggedIn, setisLoggedIn] = useState(null);
// const logIn = () => {
// setisLoggedIn(true);
// };
// const logOut = () => {
// setisLoggedIn(false);
// };
// return (
// <BrowserRouter>
// <div>
// <Navbar />
// {isLoggedIn ? (
// <button onClick={logOut}>Logout</button>
// ) : (
// <button onClick={logIn}>Login</button>
// )}
// <Routes>
// <Route path='/' element={<Home />} />
// <Route path='/profile'
// element={
// <Protected isLoggedIn={isLoggedIn}>
// <Profile />
// </Protected>
// }
// />
// <Route path ='/about' element={<About />} />
// </Routes>
// </div>
// </BrowserRouter>
// );
// }
// export default App;
