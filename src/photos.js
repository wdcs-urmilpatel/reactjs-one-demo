import React, { useState, useEffect, useContext } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import "./App.css";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import queryString from "query-string";

const Photos = () => {
  const { userData, setUserDetails } = useContext(UserContext);

  const [photos, setPhotos] = useState([]);
  const [pagenumber, SetPagenumber] = useState(1);
  const [photosPerPage] = useState(6);
  // search on change
  const [searchInput, setSearchInput] = useState("");

  const [isLaoding, setIsLaoding] = useState(true);

  let { search } = useLocation();
  let { page } = queryString.parse(search);

  const navigate = useNavigate();

  const getPost = async (spage = 1) => {
    try {
      setIsLaoding(true);
      let query = "";

      if (searchInput) {
        query += `&search=${searchInput}`;
      }

      if (page) {
        query += `&page=${spage}`;
      }

      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${userData.id}${query}`
      );
      setPhotos(response.data);
      SetPagenumber(page);
      setIsLaoding(false);
    } catch (error) {
      setIsLaoding(false); // Stop loading in case of error
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, [searchInput]);

  const pagevisited = pagenumber * photosPerPage;
  const getPhotos = photos.slice(pagevisited, pagevisited + photosPerPage);

  const displayphotos = getPhotos.map((gatPhotos) => {
    return (
      <Col className="col-4 mt-4 mb-4" key={gatPhotos.id}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={gatPhotos.thumbnailUrl} />
          <Card.Body>
            <Card.Title>{gatPhotos.title}</Card.Title>
            <Card.Text>{gatPhotos.body}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  const pageCount = Math.ceil(photos.length / photosPerPage);
  const changePage = ({ selected }) => {
    SetPagenumber(selected + 1);
    navigate(`/photos?albumId=${userData.id}&page=${selected + 1}`);
  };

  const handleSearch = (searchValue) => {
    let value = searchValue.toLowerCase();

    setSearchInput(value);
    //console.log("value", value);
  };

  return (
    <>
      <header className="App-header">All Photos </header>
      <div>
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <div className="col-sm-4 ">
              <div className="mb-4 mt-4">
                <input
                  type="search"
                  icon="search"
                  placeholder="Search..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="form-control"
                />
              </div>{" "}
            </div>
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            {isLaoding ? (
              <Spinner animation="border" variant="info" />
            ) : (
              displayphotos
            )}
            <Col className="col-12">
              <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                pageCount={pageCount}
                onPageChange={changePage}
                forcePage={page ? page - 1 : 0}
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                marginPagesDisplayed={2}
                pageRangeDisplayed={6}
                containerClassName="pagination"
                activeClassName="active"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Photos;
