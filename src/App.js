import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,Link
} from 'react-router-dom';
import {getCurrentUser} from './api/auth';
import LoginPage from './components/loginpage';
import Home from './components/dashboard';
import Auth from './components/auth'
import ContestDetails from './components/contestdetails';
import ProblemPage from './components/problem';
import './App.css';
import { IoIosHome } from "react-icons/io";
import {FaSignInAlt} from 'react-icons/fa';
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      renderlogin:true
    };
  }

  componentDidMount = () => {
      this.authUser();
  };

  authUser = async () => {
    const result = await getCurrentUser();
    if (result && result.headers) {
      this.setState({ user: result,renderlogin:false })
    } else {
      this.setState({ user: undefined });
    }
  };

  render(){
    const isLoggedIn = !!this.state.user;
    return (
      <Router>
      <div className="App">
        <div style={{position:"fixed",left:'0',top:'0',fontSize:'30px',display:'flex',width:'150px',justifyContent:'space-around'}}> 
        <Link style={{color:'#333333'}} to='/'> <IoIosHome/></Link>
        <Link style={{color:'#333333'}} to='/login'><FaSignInAlt/><span style={{fontSize:'18px'}}>Login</span> </Link>
        </div>
        <Switch>
          <Route path='/' exact  render={(props)=>isLoggedIn?<Home {...props} user = {this.state.user} />:<LoginPage {...props} />}/>;
          <Route path='/login' exact component={LoginPage}/>;
          {isLoggedIn?null:<Route path="/auth" exact component={Auth({authUser:this.authUser,state:this.state})} />}
          <Route path='/contest/:id' render={(props)=>isLoggedIn?<ContestDetails {...props} user = {this.state.user} />:<LoginPage {...props}  />}/>
          <Route path='/problem/:id/:problemid' render={(props)=>isLoggedIn?<ProblemPage {...props} user = {this.state.user} />:<LoginPage {...props}  />}/>

        </Switch>
      </div>
      </Router>
      
    );
  }
  
}

export default App;
