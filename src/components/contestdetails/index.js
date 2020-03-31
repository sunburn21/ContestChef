import React,{Component} from 'react';
import {getContestDetails,getSubmissions,getContestRankings} from '../../api/contests';
import Divisions from '../divisions';
import {ifreqfailed} from '../../api/error';
class ContestDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            startDate: "",
            endDate: "",
            isParent: false,
            children: [],
            bannerFile: "",
            freezingTime: 0,
            announcements: "",
            problemsList:[],
            submissions: [],
            rankings:[]
        };
      }
    componentDidMount = async ()=>{
        console.log(this.props.user);
        this.onPageRender(this.props.match.params.id);
    }

    onPageRender= async (id)=>{
        const contests = await getContestDetails({headers:this.props.user.headers,id:id});
        if(ifreqfailed(contests)){
            return;
        }
        await this.setState({...contests.result.data.content});
        const rankings = await getContestRankings({headers:this.props.user.headers,id:id});
        if(ifreqfailed(rankings)){
            return;
        }
        if(rankings && rankings.result){
            await this.setState({rankings:rankings.result.data.content});
        }else{
            await this.setState({rankings:[]});
        }
        const submissions = await getSubmissions({headers:this.props.user.headers,id:id});
        if(ifreqfailed(contests)){
            return;
        }
        if(submissions.result){
            await this.setState({submissions:submissions.result.data.content},()=>{
                console.log(this.state.submissions);
            })
        }else{
            await this.setState({submissions:[]},()=>{
                console.log(this.state.submissions);
            })
        }
    }

    onDivClick = (a)=>{
        this.onPageRender(this.state.children[a]);
        this.props.history.push(`/contest/${this.state.children[a]}`);
    }
    
    render() {
        return (
            <div style={{background:'#e9ecef',height:'100vh',width:'100vw'}}>
                <Divisions onDivClick={this.onDivClick} details={this.state} history={this.props.history} isParent={this.state.isParent} />
            </div>
        )
    }

}

export default ContestDetails;