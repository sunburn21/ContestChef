import React,{Component} from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Button,Modal,Form,Container,Row,Col,Spinner} from 'react-bootstrap';
import './index.css'
import {submitCode,getStatus,poll} from '../../api/code';

class SubModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            langs:[],
            code:``,
            input:``,
            output:``,
            language:``,
            cmpinfo:``,
            isLoading : false
        };
      }
    // componentDidMount(){
    //     this.setState({languages:this.props.languages},()=>{
    //         console.log({lang:this.state.languages});
    //     }); 
    // }
    setShow = (val)=>{
        this.setState({show:val,langs:this.props.langs}); 
    }
    handleSelectChange = (e)=>{
      this.setState({language:e.target.value})
    }
    handleCodeChange = (e)=>{
      this.setState({code:e.target.value});
    }
    handleInputChange = (e)=>{
      this.setState({input:e.target.value},()=>{
      });
    }
    handleRunCode = async ()=>{
      this.setState({output:""});
      const bodydata = {
        sourceCode: this.state.code,
        language:this.state.language,
        input:this.state.input
      }
      if(bodydata.language==='Language' || bodydata.language==""){
        alert('Select language');
        return;
      }
      if(!bodydata.sourceCode){
        alert('Enter code');
        return;
      }
      await this.setState({isLoading:true})
      const result = await submitCode({headers:this.props.headers,bodydata});
      if(!result){
        alert('Error Occurred! Try Submitting Again.');
        this.setState({isLoading:false});
        return;
      }
      console.log({result});
      const {data} = result.result;
      // console.log(data.link);
      const statusresult = await poll({headers:this.props.headers,id:data.link});
      if(!statusresult){
        alert('Error Occurred! Try Submitting Again.');
        this.setState({isLoading:false});
        return;
      }else{
        this.setState({output:statusresult.result.data.output,cmpinfo:statusresult.result.data.cmpinfo,isLoading:false});
        console.log(statusresult.result.data.output);

      }
    }
    render(){
        const {show}=this.state;
        const handleClose = () => this.setShow(false);
        const handleShow = () => this.setShow(true);
        
        return (
          <div>
            <Button variant="secondary" onClick={handleShow}>
              Test/Submit
            </Button>
      
            <Modal show={show} onHide={handleClose} animation={true} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
              <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control onChange={this.handleSelectChange} style={{padding:'0'}} as="select">
                  <option>Language</option>
                    {this.state.langs.map((ele)=>(<option>{ele}</option>))}
                  </Form.Control>
                </Form.Group>
              </Modal.Title>
              
              </Modal.Header>
              <Modal.Body>
                <Form>

                <Form.Row className="show-grid">
                  <Col>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Your Code</Form.Label>
                    <Form.Control onChange={this.handleCodeChange} style={{height:'298px'}} as="textarea" xs={6} />
                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Row className="center">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input</Form.Label>
                    <Form.Control onChange={this.handleInputChange}  style={{height:'125px'}} xs={6} as="textarea"  />
                  </Form.Group>
                  </Form.Row>
                  <Form.Row className="show-grid">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Output</Form.Label>
                    <Form.Control value={this.state.output+this.state.cmpinfo} style={{height:'125px'}} xs={6} as="textarea"  />
                  </Form.Group>
                  </Form.Row>
                  </Col>
                </Form.Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleRunCode}>
                  {this.state.isLoading?(<><Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
    <span className="sr-only">Loading...</span></>):'Run'}
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
    }
    
  }
  
export default SubModal;