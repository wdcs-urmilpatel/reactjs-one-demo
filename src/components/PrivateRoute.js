import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const { Component } = props;

  const { userData, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    let login = localStorage.getItem("userDataStorge");
    if (!userData.id) {
      localStorage.removeItem("userDataStorge");
      navigate("/");
    }
    // is login user to redirect dashboard
    if (login) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Component />
    </>
  );
};

export default PrivateRoute;
