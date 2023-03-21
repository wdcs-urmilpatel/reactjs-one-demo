import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { UserContext } from "./UserContext";

function DashbordPage() {
  const { userData, setUserDetails } = useContext(UserContext);
  const [postRecordTotal, setPostRecordTotal] = useState();
  const [albumsRecordTotal, setAlbumsRecordTotal] = useState();
  const [todosRecordTotal, setTodosRecordTotal] = useState();

  const [login, setLogin] = useState(false);

  // localStorage Get
  //const getUserData = JSON.parse(localStorage.getItem("userDataStorge"));
  //console.log("==getdata==userData=", userData);

  const navigate = useNavigate();

  const postPage = () => {
    navigate("/posts");
  };
  const albumsPage = () => {
    navigate("/albums");
  };
  const todosPage = () => {
    navigate("/todos");
  };
  const logout = () => {
    localStorage.removeItem("userDataStorge");
    navigate("/");
  };

  const getAllApi = async () => {
    try {
      const postsresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userData.id}`
      );
      setPostRecordTotal(postsresponse.data.length);

      const albumsresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userData.id}`
      );
      setAlbumsRecordTotal(albumsresponse.data.length);

      const todosresponse = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?userId=${userData.id}`
      );
      setTodosRecordTotal(todosresponse.data.length);
    } catch (error) {
      //console.error(error);
    }
  };

  useEffect(() => {
    getAllApi();
  }, []);

  useEffect(() => {
    const disableBackButton = (e) => {
      // Push a new state onto the browser history stack
      window.history.pushState(null, null, window.location.pathname);
      // Prevent the user from navigating back
      localStorage.removeItem("userDataStorge");
      e.preventDefault();
    };
    // Listen for the "popstate" event on the window object
    window.addEventListener("popstate", disableBackButton);
    // Clean up the event listener on unmount
    return () => window.removeEventListener("popstate", disableBackButton);
  }, []);

  useEffect(() => {
    if (!login) {
      navigate("/dashboard");
    }
  }, [login]);

  return (
    <div>
      <header className="d-flex justify-content-between align-content-center App-header mb-5">
        <h1>Welcome Dashboard - {userData.username}</h1>
        <div className="">
          <Button className="btn btn-secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" onClick={postPage}>
                Post - {postRecordTotal}
              </Button>
              <Button variant="success" onClick={albumsPage}>
                Albums - {albumsRecordTotal}
              </Button>
              <Button variant="warning" onClick={todosPage}>
                Todos - {todosRecordTotal}
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashbordPage;
