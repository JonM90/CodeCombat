import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems} from '../store';
import { PopUp } from './pop_up';


export class Train extends Component{
    constructor(){
        super();
        this.state = {
          eligibleQs: []
        }
    }

    componentDidMount() {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
    }

    componentWillReceiveProps(nextProps) {
      let allQs = nextProps.allQuestions.allProblems;
      let compQs = nextProps.allQuestions.completedProblems;
      let Qs = [];
      if (allQs && compQs) {
        allQs.forEach( q => {
          compQs.forEach( p => {
            if (p.id !== q.id) Qs.push(q)
          })
        })
      }
      let eligibleQs = Qs.filter(q => {
        return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
      })
      this.setState({eligibleQs})
    }

    render() {
      if (this.state.eligibleQs) console.log('this.state.eligibleQs', this.state.eligibleQs)

      return (
          <div id="train-main">

              <h1>TRAIN COMPONENT</h1>
             
              <PopUp />
              
          </div>
      )
    }
}

const mapState = (state) => {
  // console.log('STATE:', state)
  return {
    email: state.user.email,
    user: state.user,
    allQuestions: state.problems
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllProblems: () => {
      dispatch(fetchAllProblems())
    },
    loadCompletedProblems: (userId) => {
      dispatch(fetchCompletedProblems(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
