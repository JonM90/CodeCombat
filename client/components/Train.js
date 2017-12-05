import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, setCompletedProblem, updateUserRank} from '../store';
import {Redirect} from 'react-router'
import { PopUp } from './pop_up';
import {CodeEditor} from './editor';
import socket from '../socket';

export class Train extends Component{
  constructor(){
    super();
    this.state = {
      showPopup: false,
      userPoints: 0, // set user points everytime points changes
      eligibleQs: [],
      currentProblem: {},
      currInd: 0,
      pass: false,
      userSolution: '',
      redirect: false,
      userRank: 0,
     // displayCongrats: false,
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.isPassing = this.isPassing.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
   // this.toggleCongrats = this.toggleCongrats.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
s
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  handleSkip(){
    this.setState({ currInd: this.state.currInd + 1 });
  }

  componentDidMount() {

     //this.props.updateUserRank(1, 10);
    if (this.props.loadAllProblems && this.props.loadCompletedProblems) {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
    }

    this.setState({
      showPopup: true,
      userPoints: this.props.user.points,
      userRank: this.props.user.rank
    })

    socket.on('pass', (pass, userSolution) => {
      if (pass) {
        this.setState({userSolution, pass})
        this.isPassing(pass)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    let allQs = nextProps.allQuestions.allProblems;
    let compQs = nextProps.allQuestions.completedProblems;
    let compIds = compQs.map(q => q.id)
    if (allQs.length && compQs.length || Array.isArray(compIds)) {
      let rank = this.props.user.rank;
      let rankRange = [rank - 1, rank, rank + 1, rank + 2, rank + 3, rank + 4, rank + 5, rank + 6, rank + 7]
      let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => { return rankRange.includes(q.level) })
      this.setState({eligibleQs})
    }
  }

  isPassing(pass) {
    let currProb = this.state.eligibleQs[this.state.currInd]
    let questPoints = currProb.level * 20;
    let newPoints = this.state.userPoints + questPoints;
    this.setState({userPoints: newPoints})
    this.props.setProbToComplete(this.props.user.id, currProb.id, this.state.userSolution, newPoints);
       
       let newRank = this.state.userRank;

       if (this.state.userPoints >= 100 && this.state.userPoints <= 200){
        newRank = (newRank + 1);
       }
       if (this.state.userPoints >= 200 && this.state.userPoints <= 300){
        newRank = (newRank + 1);
       }
       if (this.state.userPoints  >= 300 && this.state.userPoints <= 400){
        newRank = (newRank + 1);
       }
       if (this.state.userPoints >= 400 && this.state.userPoints <= 500){
        newRank = (newRank + 1);
       }

       if (this.state.userPoints >= 500 && this.state.userPoints <= 600){
        newRank = (newRank + 1);
       }
           this.props.updateUserRank(`${this.props.user.id}`, newRank);
  }

  nextQuestion(e){
    e.preventDefault();
    this.setState({pass: false})
    let currProbNum = this.state.currInd + 1;
    this.setState({
      currInd: currProbNum,
      currentProblem: this.state.eligibleQs[currProbNum]
    })
  }

  handleNext(){}

  render() {
          
    return (
      <div id="train-main">

        <h4 className="component-title-h4">Training Mode</h4>

        {this.state.redirect ? <Redirect to="/" /> : null}

        <h2 className="my-points">MY POINTS: {this.state.userPoints}</h2>

        { this.state.eligibleQs && this.state.showPopup ?
          <PopUp
            func={this.togglePopup}
            quest={this.state.eligibleQs[this.state.currInd]}
            skipFunc={this.handleSkip}
            quitFunc={ () => this.setState({redirect: true}) }
          /> : null }

        <div className="editor-div">
          { this.state.eligibleQs.length ?
          <CodeEditor
              question = {this.state.eligibleQs[this.state.currInd]}
              setProbToComplete = {this.props.setProbToComplete}
              nextQuestion = {this.nextQuestion}
              userId = {this.props.user.id}
              userRank={this.props.user.rank}
              justCompleted = {this.props.justCosmpleted}
              passed = {this.state.pass}
              userPoints={this.state.userPoints}
             // updateUserRank={this.props.updateUserRank}
            /> : <h1>No Dice</h1> }
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user,
    allQuestions: state.problems,
    justCompleted: state.problems.justCompleted,
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
    setProbToComplete: (userId, problemId, userSolution, userPoints) => {
      dispatch(setCompletedProblem(userId, problemId, userSolution, userPoints))
    },
    updateUserRank: (userId, rank) => {
      dispatch(updateUserRank(userId, rank))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
