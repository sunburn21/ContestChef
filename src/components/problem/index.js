import React,{Component} from 'react';
import {Row,Col,Container,Card,Button} from 'react-bootstrap';
import MarkdownRender from '../problemstatement';
import SubModal from '../modal';
import {getSubmissionsForProblem} from '../../api/contests';
import SideBar from '../sidebar';
import {getProblem} from '../../api/contests';
import {ifreqfailed} from '../../api/error';
import './index.css';

class Problem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            submissions:[]
        };
      }
      componentDidMount = async ()=>{
        const problem = await getProblem({id:this.props.match.params.id,pid:this.props.match.params.problemid,headers:this.props.user.headers});
        if(ifreqfailed(problem)){
            return;
        }
        const submissions = await getSubmissionsForProblem({id:this.props.match.params.id,pid:this.props.match.params.problemid,headers:this.props.user.headers});
        if(ifreqfailed(submissions)){
            return;
        }
        console.log(problem.result.data.content);
        await this.setState({...problem.result.data.content,submissions:submissions.result.data.content})
        await this.setState({body:this.state.body.replace(/###/gi,"\n###").replace(/`/gi,"")});
      }
    render(){
        return(
            <div style={{background:'#e9ecef'}}>
                <Container>
            <Row style={{}}>
                <Col xs lg={{span:7,offset:1}}>
                    <Card style={{ width: '1' }}>
                        <Card.Body>
                            <Card.Title>{this.state.problemName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{this.state.problemCode}</Card.Subtitle>
                            <div className='statement_wrapper' style={{fontSize:'15px'}}>
                                <MarkdownRender source={this.state.body} />
                            </div>
                            <SubModal headers={this.props.user.headers} langs={this.state.languagesSupported}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col  xs lg={3}>
                <SideBar details={this.state}/>
                </Col>
            </Row>
            </Container>
            </div>


        )
    }
}

export default Problem;
