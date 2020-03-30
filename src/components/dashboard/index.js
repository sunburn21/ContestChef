import React,{Component} from "react";
import SearchBox from '../searchbox';
import {Jumbotron,Button} from 'react-bootstrap' 

import "./index.css";
class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      contests:{}
    };
  }
  render(){
    return(
      <div className="dashboard_container" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
         <Jumbotron >
           <div style={{marginTop:'-100px'}}>
           <h1>ContestChef</h1>
            <p>
              A minimalistic Codechef companion app.
            </p>
            {/* <p>
              <Button variant="primary">Learn more</Button>
            </p> */}
            <div style={{maxWidth:"500px"}}>
            <SearchBox user={this.props.user} history={this.props.history}/>
            </div>
           </div>
            
          </Jumbotron>
      </div>
    )
  }
}

export default Dashboard;