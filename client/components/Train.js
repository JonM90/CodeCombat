import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, updateUserPoints, setCompletedProblem} from '../store';
import { PopUp } from './pop_up';
import {CodeEditor} from './editor';

//HOW DO WE UPDATE POINTS?
//HOW DO WE UPDATE QUESTIONS LIST AFTER COMPLETED?
//HOW DO WE ONLY ALLOW POINTS TO ADD ON NEW QUESTIONS?


//send editor isCorrect function? if correct, do axios here based on points of user and user id. 
//adjust thunk to return user's new points. with that update this.state's user points, which will rerender. 
//can you update completed points here as well?  

export class Train extends Component{
    constructor(){
        super();
        this.state = {
          eligibleQs: [],
          showPopup: false,
          userPoints: 0 // set user points everytime points changes
        }
        this.togglePopup = this.togglePopup.bind(this);
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    componentDidMount() {
      if (this.props.loadAllProblems && this.props.loadCompletedProblems) {
        this.props.loadAllProblems();
        this.props.loadCompletedProblems(this.props.user.id);
      }
      this.setState({showPopup: true})
    }

    componentWillReceiveProps(nextProps) {
      let allQs = nextProps.allQuestions.allProblems;
      let compQs = nextProps.allQuestions.completedProblems;
      let compIds = compQs.map(q => q.id)
      if (allQs.length && compQs.length) {
        let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
          return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
        })
        this.setState({eligibleQs})
      }
    }

    render() {
     let addPoints = this.props.addPoints;
     this.props.setProbToComplete(2,9);
      return (
          <div id="train-main">

              <h1>TRAIN COMPONENT</h1>
              <button onClick={this.togglePopup}>show popup</button>

                  {this.state.eligibleQs && this.state.showPopup ?
                    <PopUp
                    func={this.togglePopup}
                    quest={this.state.eligibleQs[0]}
                    /> : null}

              <div className="editor-div">
                {
                  this.state.eligibleQs.length ? <CodeEditor addPoints={this.props.addPoints}  userPoints={this.props.user.points} userId={this.props.user.id} questions={this.state.eligibleQs} /> : <h1>No Dice</h1>
                }

              </div>
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
    },
    addPoints: (userId,point) => {
      dispatch(updateUserPoints(userId,point))
    },
    setProbToComplete: (userId, problemId) => {
      dispatch(setCompletedProblem(userId,problemId))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
