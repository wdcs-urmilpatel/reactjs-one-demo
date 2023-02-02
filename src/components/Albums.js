import React from 'react';
import { Card,Col,Container,Row  } from 'react-bootstrap'

const AlbumsPhotos = ({ photos, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
        <div>
          <Container>
            <Row>
            {photos && photos.map((gatPhotos) =>
                <Col className='col-4 mt-4 mb-4'  key={gatPhotos.id}>
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={gatPhotos.thumbnailUrl} />
                  <Card.Body>
                    <Card.Title>{gatPhotos.title}</Card.Title>
                    <Card.Text>
                    {gatPhotos.body}
                    </Card.Text>
                  
                  </Card.Body>
                </Card>
              </Col>
              )}
              </Row>
          </Container>
    </div>
  );
};

export default AlbumsPhotos;
