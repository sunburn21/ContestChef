import React,{Fragment} from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap';
import moment from 'moment';
import Timer from '../timer';
import Submissions from '../submissions';



export default (props)=>{
    const timeFormat = 'MM DD YYYY, h:mm a';
    const startd = moment(props.details.startDate);
    const endd = moment(props.details.endDate);
    const currentd = moment();
    const onGoing = (startd<=currentd && currentd<endd);
    const hasStarted = (startd<=currentd);
    const timeTillDate=onGoing?endd:startd;
    // const countdown = moment(timeTillDate-currentd);
    const timerprops = {
        startd,endd,onGoing,hasStarted,timeTillDate,timeFormat
    }
    return (
        <Fragment>
            <Card className='text-center' style={{ width: '1',height:'100vh' }}>
                        <Card.Body>
                            <Card.Title>Timer</Card.Title>
                            <Container className='text-center' >
                                <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                                    <Row className=''>
                                    {onGoing?<Timer data={timerprops}/>:(!hasStarted?<Timer data={timerprops}/>:"Contest has ended.")}
                                    </Row>
                                </div>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Row className=''>
                                    <   Submissions subs={props.details.submissions} />
                                    </Row>  
                                </div>
                            </Container>
                        </Card.Body>
                    </Card>
        </Fragment>
    )
}