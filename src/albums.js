import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Albums = () => {
  const [albumsRecord, setAlbumsRecord] = useState();
  const [photosRecordTotal, setPhotosRecordTotal] = useState();
  const { userData, setUserDetails } = useContext(UserContext);
  console.log("userData===", userData);
  const navigate = useNavigate();
  const photosPage = () => {
    navigate(`/photos?albumId=${userData.id}&page=1`);
  };
  const getAllApi = async () => {
    try {
      const albumsResp = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userData.id}`
      );
      setAlbumsRecord(albumsResp.data);

      const photosResp = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${userData.id}`
      );
      setPhotosRecordTotal(photosResp.data.length);
    } catch (error) {
      //console.error(error);
    }
  };
  useEffect(() => {
    getAllApi();
  }, []);
  return (
    <>
      <header className="App-header">Albums </header>
      <div>
        <Container>
          <Row>
            {albumsRecord &&
              albumsRecord.map((gatAlbums) => (
                <Col className="col-4 mt-4 mb-4" key={gatAlbums.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{gatAlbums.title}</Card.Title>
                      <Card.Text>{gatAlbums.body}</Card.Text>
                      <Button variant="primary" onClick={photosPage}>
                        Albums Photos - {photosRecordTotal}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Albums;
