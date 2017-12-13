import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, setCompletedProblem} from '../store';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
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
      let rankRange = [rank - 1, rank, rank + 1]
      let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => { return rankRange.includes(q.level) })
      this.setState({eligibleQs})
    }
  }

  isPassing(pass) {
    let currProb = this.state.eligibleQs[this.state.currInd]
    let questPoints = Math.floor((Math.log(currProb.level) + 1) * 30);
    let newPoints = this.state.userPoints + questPoints;
    this.setState({userPoints: newPoints})

    let lvl = Math.floor(Math.sqrt(newPoints) * 0.2)
    console.log('questPts:', questPoints, 'newpoints;', newPoints, 'LVL:', lvl)

    this.props.setProbToComplete(this.props.user.id, currProb.id, this.state.userSolution, newPoints, lvl);
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

  render() {
    return (
      <div id="train-main">

        <h4 className="component-title-h4">Training Mode</h4>
        {/* <button onClick={this.togglePopup}>show popup</button> */}

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
              // setProbToComplete = {this.props.setProbToComplete}
              nextQuestion = {this.nextQuestion}
              userId = {this.props.user.id}
              justCompleted = {this.props.justCompleted}
              passed = {this.state.pass}
            /> : <div className="train-complete-div">
              <h1>Great Job! You've Completed All Missions!</h1>
              <Link to={`/users/${this.props.userId}/battle`}>
                <button id="try-battle-btn">Try Battle Mode</button>
              </Link>

              </div>}
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
    setProbToComplete: (userId, problemId, userSolution, userPoints, rank) => {
      dispatch(setCompletedProblem(userId, problemId, userSolution, userPoints, rank))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
