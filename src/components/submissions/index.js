import React from 'react';
import {Card,ListGroup,Table} from 'react-bootstrap';

export default (props)=>{
    return (
        <div style={{marginTop:'2'}}>
            <Card style={{ width: '100%' }}>
            <Card.Header>Submissions</Card.Header>
            <Table striped bordered hover size="sm" style={{fontSize:'15px'}}>
  <thead >
    <tr >
      <th>@</th>
      <th>#</th>
      <th>Result</th>
    </tr>
  </thead>
  <tbody>
      {props.subs.map((ele)=>(
          <tr style={{fontSize:'10px'}}>
            <td>{ele.username}</td>
            <td>{ele.problemCode}</td>
            <td>{ele.result}</td>
        </tr>
      ))}
  </tbody>
</Table>
            </Card>
        </div>
    )
}