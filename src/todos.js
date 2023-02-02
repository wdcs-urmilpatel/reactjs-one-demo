import React, { useState,useEffect, useContext } from 'react';
import { Button,Card,Container,Row,Col  } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './UserContext';

const Todos = () => {
  const [todosRecord, setTodosRecord] = useState();
  const [todosRecordTotal, setTodosRecordTotal] = useState();
  const {userData, setUserDetails} = useContext(UserContext);

  
  const getAllApi = async () => {
    try {
    
      const todosResp = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userData.id}`);
      setTodosRecord(todosResp.data);
      setTodosRecordTotal(todosResp.data.length);
    
    } catch (error) {
      //console.error(error);
    }
 
  }
  useEffect(() => {
    getAllApi();
  },[])
  return (
      <>
      <header className="App-header">Todos </header>
      <div>
      <Container>
        <Row>
          {todosRecord && todosRecord.map((gatTodos) =>
            <Col className='col-4 mt-4 mb-4'  key={gatTodos.id}>
              <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{gatTodos.title}</Card.Title>
                <Card.Text>
                {gatTodos.completed ? 'Completed' : 'Pending'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          )}
      </Row>
    </Container>
    </div>
    </>
  );
}

export default Todos;
