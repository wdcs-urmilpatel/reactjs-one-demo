import React, { useState,useEffect, useContext } from 'react';
import { Card,Container,Row,Col  } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './UserContext';

const Post = () => {
  const {userData, setUserDetails} = useContext(UserContext);
  const [comments, setComments] = useState();

  useEffect(() => {
    (async () =>{
      const postApi = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userData.id}`);
      console.log('userData.id',userData.id);
      console.log('postApi.data',postApi.data);
     
      Promise.all(
        postApi.data.map( rs => axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${rs.id}`)
        .then(res => {
          setComments(res.data)
        }))
        );
    })()
   
  },[userData])
 
  return (
    
    <div>
       <header className="App-header">
          Comments
        </header>
        <div>
          <Container>
            <Row>
              {comments && comments.map((gatComments) =>
                <Col className='col-4 mt-4 mb-4'  key={gatComments.id}>
                  <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{gatComments.name}</Card.Title>
                    <Card.Text>
                    {gatComments.email}
                    </Card.Text>
                    <Card.Text>
                    {gatComments.body}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              )}
          </Row>
        </Container>
        </div>
        
    </div>
  );
}

export default Post;
