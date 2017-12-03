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
        const style = {
            height: 100,
            width: 500,
            margin: 5,
            textAlign: 'center',
            display: 'inline-block',
          };
        return (
            <div id="problem-history-container">
                <h3 id="problem-history-h3">My Completed Problems</h3>
                <List id="problem-history-list">
                    {completed && completed.map(val => {

                        return (<ListItem 
                            key={val.title} 
                            primaryText={<span className="problemHistory">{val.title}</span>} 
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            hoverColor="#222"
                            nestedItems={[
                                <ListItem 
                                    key={val.solution}
                                    children={[<div className="solution">{val.solution}</div>]}
                                    />
                            ]} />)})
                    }
                </List>
            </div>
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