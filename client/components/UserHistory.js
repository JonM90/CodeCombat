import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'
import {fetchCompletedProblems} from '../store';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

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
            <div>
                <Paper style={style} zDepth={3} />
                <List>
                    {completed && completed.map(val => {

                        return (<ListItem 
                            key={val.title} 
                            primaryText={val.title} 
                            initiallyOpen={false}
                            primaryTogglesNestedList={true}
                            nestedItems={[
                                <ListItem 
                                    key={val.solution}
                                    children={[<div className="solution">{val.solution}</div>]}
                                    // children={[<Paper style={style} zDepth={3} children={[<p>{val.solution}</p>]}/>]}
                                    //primaryText={val.solution}
                                    // primaryText={`hello\n \nworld`}
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