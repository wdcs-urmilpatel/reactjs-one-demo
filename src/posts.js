import React, { useState,useEffect, useContext } from 'react';
import { Button,Card,Stack,Container,Row,Col  } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";

const Post = () => {
  const {userData, setUserDetails} = useContext(UserContext);
  const [postRecord, setPostRecord] = useState();
  const [commentsTotalRecord, setcommentsTotalRecord] = useState();
  const navigate = useNavigate();
  const commentsPage = () => {
    navigate('/comments');
   
  }

  const getAllApi = async () => {
    try {
      const postsresponse = await axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + userData.id);
      setPostRecord(postsresponse.data);

      const commentsresponse = await axios.get('https://jsonplaceholder.typicode.com/comments?postId=' + userData.id);
      setcommentsTotalRecord(commentsresponse.data.length);
    
    } catch (error) {
      //console.error(error);
    }
 
  }
  useEffect(() => {
    getAllApi();
  },[])
 
  return (
    
    <div>
       <header className="App-header">
        Post here 
        </header>
   
        <div>
          <Container>
            <Row>
              {postRecord && postRecord.map((gatPost) =>
                <Col className='col-4 mt-4 mb-4'  key={gatPost.id}>
                  <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{gatPost.title}</Card.Title>
                    <Card.Text>
                    {gatPost.body}
                    </Card.Text>
                    <Button variant="primary" onClick={commentsPage}>Comments - {commentsTotalRecord}</Button>
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
