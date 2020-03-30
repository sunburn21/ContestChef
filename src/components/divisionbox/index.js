import React,{Fragment} from 'react';
import {Card} from 'react-bootstrap';

const divstyle = {width:'250px',height:'100px',
                borderRadius:'5px',textAlign:'left',padding:'10px',
                border:'2px solid #e9ecef',cursor:'pointer'};

export default (props)=>{
    return(
        <Fragment>
            <Card.Img variant="top" alt="" src={props.details.bannerFile} />
                            <Card style={{marginTop:'20px'}} className="text-center">
                                <Card.Header>Divisions</Card.Header>
                                <Card.Body>
                                    <div style={{display:'flex',justifyContent:'space-around'}}>
                                        <span onClick={()=>{
                                            props.divClick(0)
                                        }} className='division' style={divstyle}>
                                        <Card.Title>Division 1</Card.Title>
                                        <Card.Text>If user's rating is >=1100</Card.Text>
                                        </span>
                                        <span onClick={()=>{
                                            props.divClick(1)
                                        }} className='division' style={divstyle}>
                                        <Card.Title>Division 2</Card.Title>
                                        <Card.Text>If user's rating is {'<='}1099 </Card.Text>
                                        </span>
                                    </div>
                                </Card.Body>
                                {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
                            </Card>
        </Fragment>
    )
}