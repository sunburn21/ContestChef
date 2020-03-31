import React,{Component} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Button,Modal,Form,Container,Row,Col,Spinner,Table} from 'react-bootstrap';
import './index.css'

class Leaderboard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            problems:[],
            rankings:[]
        };
      }
    componentWillReceiveProps = ()=>{
      this.setState({rankings:this.props.rankings,problems:this.props.problems})
    }
    setShow = (val)=>{
        this.setState({show:val},()=>{
          console.log(this.state);
        }); 
    }
    render(){
        const {show}=this.state;
        const handleClose = () => this.setShow(false);
        const handleShow = () => this.setShow(true);
        
        return (
          <div>
            <Button variant="secondary" onClick={handleShow}>
              Leaderboard
            </Button>
      
            <Modal   show={show} onHide={handleClose} animation={true}
          size="lg"
aria-labelledby="contained-modal-title-vcenter"
      // aria-labelledby="example-custom-modal-styling-title"
      centered>
              <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Leaderboard
        <div class="pl-2" style={{fontSize:'20px',color:'#6c757d'}}>{this.props.code}</div>
              </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div style={{overflow:'scroll'}}>
                <Table striped bordered hover size="sm" style={{fontSize:'10px'}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Score</th>
                        {this.state.problems.map((ele)=>(
                            <th>{ele.problemCode}</th>
                        ))}
                        </tr>
                    </thead>
                    <tbody >
                      {
                        this.state.rankings.map((ele)=>{
                          var totals = 0;
                          ele.problemScore.forEach((p)=>{
                            totals+=p.score;
                          })
                          return(
                            <tr>
                              <td>{ele.rank}</td>
                              <td>{ele.username}</td>
                              <td>{totals}</td>
                              {this.state.problems.map((el)=>{
                                  var score = 0;
                                  ele.problemScore.forEach(e => {
                                    if(e.problemCode===el.problemCode){
                                      score = score+e.score;
                                      return;
                                    }
                                  });
                                return (<td>{score}</td>)
                              })}
                            </tr>
                          )
                        })
                      } 
                    </tbody>
                </Table>
                </div>
              
              </Modal.Body>
            </Modal>
          </div>
        );
    }
    
  }
  
export default Leaderboard;