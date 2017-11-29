import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, updateUserPoints, setCompletedProblem} from '../store';
import { PopUp } from './pop_up';
import {CodeEditor} from './editor';
import socket from '../socket';


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
          pass: false,
          userPoints: 0, // set user points everytime points changes
          problemNum: 0,
          points: 0

        }
        this.togglePopup = this.togglePopup.bind(this);
        this.isPassing = this.isPassing.bind(this);
        // this.onPassTrue = this.onPassTrue.bind(this);
        // this.nextQuestion = this.nextQuestion.bind(this);

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
      this.setState({
        showPopup: true,
        points: this.props.user.points
      })
      socket.on('pass', (pass) => {
        if (pass) this.isPassing(pass)
      })
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
      // socket.on('pass', (pass) => {
      //   if (pass) this.isPassing(pass)
      // })
    }

    isPassing(pass) {
      // socket.on('pass', (pass) => {
        console.log('SOCKET ON PASS:', pass)
        this.setState({pass})
        // pass ? alert('YOU PASSED!') : null
        // if (pass) this.onPassTrue(pass)
      // })
        console.log("ON PASS TRUE:", pass, this.state.pass, 'this.state.currentProb', this.state.eligibleQs[this.state.problemNum])
        // if (this.state.pass){
          let currProb = this.state.eligibleQs[this.state.problemNum]
          let questPoints = currProb.level * 5;
          let newPoints = this.state.points + questPoints;
          console.log("YOU NOW HAVE ", newPoints, " POINTS!")
          this.setState({points: newPoints})
          // console.log("STATE - ONPASSTRUE FUNC:", this.state)
          this.props.addPoints(this.props.user.id, newPoints);
          this.props.setProbToComplete(this.props.user.id, currProb.id);
        // }
    }

    nextQuestion(e){
      e.preventDefault();
      console.log("NEXT IS FIRED", this.state.problemNum)
      let currProblem = this.state.problemNum + 1;
      this.setState({
        problemNum : currProblem,
        currentProblem : this.props.questions[currProblem]
        // output : ''
      })
      const editor = this.ace.editor
      ///this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{}`)
      editor.setValue(`function ${(this.state.eligibleQueue[currProblem]).signature}{}`)
      // this.onPassTrue();
      console.log("STATE - NEXTQUESTION FUNC:", this.state)
    }

    // onPassTrue(pass){
    //   console.log("ON PASS TRUE STATE:",this.state)
    //   console.log("ON PASS TRUE PROPS:",this.props)
    //   console.log("ON PASS TRUE:", pass, this.state.pass, 'this.state.currentProb', this.state.eligibleQs[this.state.problemNum])
    //   if (this.state.pass){
    //     let currProb = this.state.eligibleQs[this.state.problemNum]
    //     let questPoints = currProb.level * 5;
    //     let newPoints = this.state.points + questPoints;
    //     console.log("YOU NOW HAVE ", newPoints, " POINTS!")
    //     this.setState({points: newPoints})
    //     // console.log("STATE - ONPASSTRUE FUNC:", this.state)
    //     this.props.addPoints(this.props.user.id, newPoints);
    //     this.props.setProbToComplete(this.props.user.id, currProb.id);
    //   }
    // }

    render() {
     let addPoints = this.props.addPoints;
    //  this.props.setProbToComplete(2,9);
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
                  this.state.eligibleQs.length ? <CodeEditor
                    addPoints = {this.props.addPoints}
                    setProbToComplete = {this.props.setProbToComplete}
                    nextQuestion = {this.nextQuestion}
                    // userPoints = {this.props.user.points}
                    userId = {this.props.user.id}
                    // questions = {this.state.eligibleQs}
                    question = {this.state.eligibleQs[this.state.problemNum]}
                  /> : <h1>No Dice</h1>
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
    addPoints: (userId, point) => {
      dispatch(updateUserPoints(userId, point))
    },
    setProbToComplete: (userId, problemId) => {
      dispatch(setCompletedProblem(userId, problemId))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
