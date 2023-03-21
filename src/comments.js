import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const { userData, setUserDetails } = useContext(UserContext);
  const [comments, setComments] = useState();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userDataStorge");
    navigate("/");
  };

  useEffect(() => {
    (async () => {
      const postApi = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${userData.id}`
      );

      Promise.all(
        postApi.data.map((rs) =>
          axios
            .get(
              `https://jsonplaceholder.typicode.com/comments?postId=${rs.id}`
            )
            .then((res) => {
              setComments(res.data);
            })
        )
      );
    })();
  }, [userData]);

  return (
    <div>
      <header className="d-flex justify-content-between align-content-center App-header mb-5">
        <h1>Comments </h1>
        <div className="">
          <Button className="btn btn-secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>
      <div>
        <Container>
          <Row>
            {comments &&
              comments.map((gatComments) => (
                <Col className="col-4 mt-4 mb-4" key={gatComments.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{gatComments.name}</Card.Title>
                      <Card.Text>{gatComments.email}</Card.Text>
                      <Card.Text>{gatComments.body}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Post;
