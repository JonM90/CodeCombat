import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'
import {fetchCompletedProblems} from '../store';
import {List, ListItem} from 'material-ui/List';

class UserHistory extends Component {
    constructor(props){
        super(props)
        this.state={
            comlpetedProblems:[],
        }
    }

    componentDidMount() {
        this.props.loadCompletedProblems(this.props.user.id);
      }

    render(props) {
        let completed = this.props.allQuestions.completedProblems
        return (
            <List>
                {completed && completed.map(val => (
                    <ListItem 
                        key={val.title} 
                        primaryText={val.title} 
                        initiallyOpen={false}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem 
                                key={val.solution}
                                primaryText={val.solution.replace(/\n/g, "\n")}
                                />
                        ]} />))}
            </List>
        );
    }
}

const mapState = (state) => {
    // console.log('STATE:', state)
    return {
        user:state.user,
        allQuestions: state.problems
    }
  }
  
  const mapDispatch = dispatch => {
    return {

      loadCompletedProblems: (userId) => {
        dispatch(fetchCompletedProblems(userId))
      }
    }
  }
  
  export default connect(mapState, mapDispatch)(UserHistory)