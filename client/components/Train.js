import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, setCompletedProblem} from '../store';
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
      // problemNum: 0,
      currInd: 0,
      pass: false,
      userSolution: '',
      redirect: false
    }

    this.togglePopup = this.togglePopup.bind(this);
    this.isPassing = this.isPassing.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
      //currInd: (this.state.currInd + 1)
    });
  }

  handleSkip(){
    this.setState({ currInd: this.state.currInd + 1 });
  }

  componentDidMount() {
    if (this.props.loadAllProblems && this.props.loadCompletedProblems) {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
    }

    this.setState({
      showPopup: true,
      userPoints: this.props.user.points
    })

    socket.on('pass', (pass, userSolution) => {
      console.log('SOCKET ON PASS:', pass, 'userSolution:', userSolution)
      if (pass) {
        this.setState({userSolution, pass})
        // this.setState({pass})
        this.isPassing(pass)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    let allQs = nextProps.allQuestions.allProblems;
    let compQs = nextProps.allQuestions.completedProblems;
    let compIds = compQs.map(q => q.id)
    if (allQs.length && compQs.length) {
      // console.log('allQs:', allQs, 'compQs:', compQs)
      let rank = this.props.user.rank;
      let rankRange = [rank - 1, rank, rank + 1]
      let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
        // return (rank === q.level || rank === q.level - 1 || rank === q.level + 1)
        return rankRange.includes(q.level)
      })
      // console.log('eligibleQs', eligibleQs)
      this.setState({eligibleQs})
    }
  }

  isPassing(pass) {
    console.log('SOCKET ON PASS TRUE:', this.state.pass, 'this.state.currentProb', this.state.eligibleQs[this.state.currInd], 'userSolution:', this.state.userSolution)

    let currProb = this.state.eligibleQs[this.state.currInd]
    let questPoints = currProb.level * 5;
    let newPoints = this.state.userPoints + questPoints;
    console.log('newPoints', newPoints, 'setProbToComplete WITH:', this.props.user.id, currProb.id, this.state.userSolution, newPoints)
    this.setState({userPoints: newPoints})
    this.props.setProbToComplete(this.props.user.id, currProb.id, this.state.userSolution, newPoints);
  }

  nextQuestion(e){
    e.preventDefault();
    this.setState({pass: false})
    let currProbNum = this.state.currInd + 1;
    console.log('NEXT IS FIRED, PROB#', currProbNum, 'currentProblem:', this.state.eligibleQs[currProbNum])
    this.setState({
      currInd: currProbNum,
      currentProblem: this.state.eligibleQs[currProbNum]
    })
  }

  render() {
    console.log('this.state.pass', this.state.pass)

    return (
      <div id="train-main">

        <h4 className="component-title-h4">Training Mode</h4>
        {/* <button onClick={this.togglePopup}>show popup</button> */}

        {this.state.redirect ? <Redirect to="/" /> : null}

        <h2 className="my-points">MY POINTS: {this.state.userPoints}</h2>
        {
          // <button onClick={this.togglePopup} className="loading">show popup</button>
        }

        { this.state.eligibleQs && this.state.showPopup ?
          <PopUp
            func={this.togglePopup}
            // quest={this.state.eligibleQs[0]}
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
              justCompleted = {this.props.justCompleted}
              passed = {this.state.pass}
            /> : <h1>No Dice</h1> }
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
    allQuestions: state.problems,
    justCompleted: state.problems.justCompleted
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
    }
    // addPoints: (userId, point) => {
    //   dispatch(updateUserPoints(userId, point))
    // }
  }
}

export default connect(mapState, mapDispatch)(Train)
