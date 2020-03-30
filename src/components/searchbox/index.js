import React,{Component,Fragment} from 'react';
import {InputGroup,FormGroup,Button,FormControl,Form} from 'react-bootstrap' ;
import {Typeahead} from 'react-bootstrap-typeahead';
import './index.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {getContests} from '../../api/contests';
import {ifreqfailed} from '../../api/error';
const getInitialState = () => ({
    index: 0,
    selected: [],
  });
  
  class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            selected: [],
            contests:[],
            selectedOption:'code'
        };
      }
    

    componentDidMount = async ()=>{
        console.log(this.props.user);
        const contests = await getContests(this.props.user);
        if(ifreqfailed(contests)){
          return;
        }
        if(!contests){
          alert('Error in fetching contest! Try Again! Check your connection or Login again.');
          return;
        }
        await this.setState({contests:contests.result.data.content.contestList})
    }
    
    onChangeRadioButton = (changeEvent)=>{
        this.setState({selectedOption:changeEvent.target.value})
    }

    render() {
      const { index, selected,contests,selectedOption:selop } = this.state;
      const state = contests[index];
      let isInvalid;
      let isValid;
      let validationState;
  
      if (selected.length) {
        const isMatch = selected[0][`${selop}`] === state[`${selop}`];
  
        // BS4 validation
        isInvalid = !isMatch;
        isValid = isMatch;
  
        // BS3 validation
        validationState = isMatch ? 'success' : 'error';
      }
  
      return (
        <Fragment>
          <FormGroup validationState={validationState}>
            <InputGroup>
              <InputGroup.Prepend className="input-group-prepend">
                <span className="input-group-text">
                  Enter the contest
                </span>
              </InputGroup.Prepend>
              <Typeahead
                id="form-example"
                isInvalid={isInvalid}
                isValid={isValid}
                labelKey="capital"
                onChange={(s) => this.setState({ selected: s },()=>{console.log(this.state.selected)})}
                options={this.state.contests.map((ele)=>(ele[selop]))}
                placeholder="Select a capital..."
                selected={selected}
              />
              <InputGroup.Append className="input-group-append">
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                      const contest = this.state.contests.filter((ele)=>{
                        return ele[selop]===selected[0];
                      })
                      console.log(contest[0]);
                      this.props.history.push(`/contestchef/contest/${contest[0].code}`)
                  }}>
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Form.Group style={{textAlign:'left'}}>
            <Form.Check style={{paddingTop:"5px"}} value='code' checked={this.state.selectedOption==='code'} onChange={this.onChangeRadioButton} type="radio" label="Search by code" />
            <Form.Check type="radio" value='name' checked={this.state.selectedOption==='name'} onChange={this.onChangeRadioButton} label="Search by name" />
            </Form.Group>
          </FormGroup>
        </Fragment>
      );
    }
  }

  export default SearchBox;