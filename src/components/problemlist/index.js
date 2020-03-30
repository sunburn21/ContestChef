import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import './index.css';

class ProblemList extends Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onProblemClick = (ele)=>{
    this.props.history.push(`/contestchef/problem/${ele.contestCode}/${ele.problemCode}`);
  }
  render(){
    const {problems} = this.props;
    console.log(problems);
    const sproblems = [...problems].sort((a,b)=>(-a.successfulSubmissions+b.successfulSubmissions));
    return (
        <div style={{marginTop:'30px'}}>
            <div style={{fontSize:'20px'}}>Problems</div>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Submissions</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
                {sproblems.map((ele,i)=>(
                  <tr className='problem_item' style={{fontSize:'15px',cursor:'pointer'}} onClick={()=>(this.onProblemClick(ele))}>
                      <td>{i+1}</td>
                      <td>{ele.problemCode}</td>
                      <td>{ele.successfulSubmissions}</td>
                      <td>{ele.accuracy.toPrecision(3)}</td>
                  </tr> 
                ))}
            </tbody>
          </Table>
        </div>
    )

  }
    
}

export default ProblemList;