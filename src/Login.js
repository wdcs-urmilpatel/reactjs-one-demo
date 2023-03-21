import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./App.css";
import { UserContext } from "./UserContext";

const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .max(255)
    .required("Your Email is required"),
});

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [user, setUsers] = useState();
  const [SuccessMesg, setSuccessMesg] = useState("");
  const [ErrorMesg, setErrorMesg] = useState("");
  const navigate = useNavigate();
  const { userData, setUserDetails } = useContext(UserContext);

  const onSubmit = async (data) => {
    const apiURL = "https://jsonplaceholder.typicode.com/users";
    const response = await axios.get(apiURL + "?email=" + data.email);

    try {
      if (response.data.length > 0) {
        setUsers(response.data);
        setUserDetails(response.data[0]);
        //set local storage
        localStorage.setItem(
          "userDataStorge",
          JSON.stringify(response.data[0])
        );
        setSuccessMesg("Login Successfully.");
        navigate("/dashboard");
      } else {
        setErrorMesg("Invalid email address");
      }
    } catch (error) {
      setErrorMesg("Invalid email address");
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Login Page</h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="col-sm-4 offset-sm-4">
            <h3>Email Login </h3>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                defaultValue="Sincere@april.biz"
                className="form-control"
                placeholder="Email Address"
                {...register("email")}
              />

              {errors.email && (
                <p className="alert-error">{errors.email.message}</p>
              )}
            </Form.Group>
            <Button className="btn-flat" type="submit">
              Submit
            </Button>
            <p className="pt-2 alert-successfully">{SuccessMesg}</p>
            <p className="pt-2 alert-error">{ErrorMesg}</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
