import React, { useState,useEffect, useContext } from 'react';
import { Button,Stack,Container,Row,Col  } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";



function DashbordPage() {

  const {userData, setUserDetails} = useContext(UserContext);
  const [postRecordTotal, setPostRecordTotal] = useState();
  const [albumsRecordTotal, setAlbumsRecordTotal] = useState();
  const [todosRecordTotal, setTodosRecordTotal] = useState();

 // localStorage Get
  //const getUserData = JSON.parse(localStorage.getItem("userDataStorge"));
  //console.log('==getdata===',getUserData.name);
  
  const navigate = useNavigate();

  const postPage = () => {
    navigate('/posts');
  }
  const albumsPage = () => {
    navigate('/albums');
  }
  const todosPage = () => {
    navigate('/todos');
  }
  

  const getAllApi = async () => {
    try {
      const postsresponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userData.id}`);
      setPostRecordTotal(postsresponse.data.length);


      const albumsresponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userData.id}`);
      setAlbumsRecordTotal(albumsresponse.data.length);

      const todosresponse = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userData.id}`);
      setTodosRecordTotal(todosresponse.data.length);
      
    } catch (error) {
      //console.error(error);
    }
 
  }
useEffect(() => {
  getAllApi();
},[])
  return (
    <div>
      <header className="App-header mb-5">Welcome Dashboard - {userData.username}</header>
      <Container>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" onClick={postPage}>Post - {postRecordTotal}</Button>
              <Button variant="success" onClick={albumsPage}>Albums - {albumsRecordTotal}</Button>
              <Button variant="warning" onClick={todosPage}>Todos - {todosRecordTotal}</Button>
            </Stack>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DashbordPage;
