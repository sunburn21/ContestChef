import React from 'react';
import './index.css';
import {Row,Col,Container,Card,Button} from 'react-bootstrap';
import DivisionBox from '../divisionbox';
import ProblemsList from '../problemlist';
import SideBar from '../sidebar';
// const divstyle = {width:'250px',height:'100px',
//                 borderRadius:'5px',textAlign:'left',padding:'10px',
//                 border:'2px solid #e9ecef',cursor:'pointer'};

export default (props)=>{
    return(
        <div>
            <Container>
            <Row style={{height:'100vh'}}>
                <Col xs lg={{span:7,offset:1}}>
                    <Card style={{ width: '1',height:'100vh' }}>
                        <Card.Body>
                            <Card.Title>{props.details.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{props.details.code}</Card.Subtitle>
                            {props.isParent?<DivisionBox divClick={props.onDivClick} details={props.details} />:<ProblemsList history={props.history} problems={props.details.problemsList}/>}
                        </Card.Body>
                    </Card>
                </Col>
                <Col  xs lg={3}>
                <SideBar details={props.details}/>
                </Col>
            </Row>
            </Container>
        </div>
    )
} 





