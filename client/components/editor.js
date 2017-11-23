import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
// const socket = require('../client/socket')
const {EventEmitter} = require('events');
export const events = new EventEmitter()
import {fetchAllProblems, fetchCompletedProblems} from '../store';
import axios from 'axios';

export class CodeEditor extends Component {
  constructor() {
    super();
    this.state = {
      attempt: '',
      currentProblem: {},
      output: '',
      problems: [],
      problemNum: 0,
      pass: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount(){
    console.log("THIS.PROPS DID MOUNT!!", this.props) 
    // this.props.loadAllProblems(this.props.user.id);
    // this.props.loadCompletedProblems(this.props.user.id)
    // this.setState({currentProblem: this.state.eligibleQs[0]})   
    const editor = this.ace.editor
    this.props.allQuestions && editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
  }

  onChange(newValue, e) {
    console.log(newValue, e);
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // editor.getSession.setBehaviorEnabled(true)
    console.log(editor.getValue()); // Outputs the value of the editor

    this.setState({attempt})
  }

  nextQuestion(){
    this.setState({problemNum:this.state.problemNum+1})
    const editor = this.ace.editor
    this.props.allQuestions && editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum+1]).signature}{}`)
  }

  onSubmit(e) {
    e.preventDefault();
    events.emit('userSubmit', [this.state.attempt, this.props.allQuestions[this.state.problemNum].testSpecs])
    events.on('output', (output) => {this.setState({output})})
    events.on('pass', (pass)=>{
      this.setState({pass})
    })
  }
  render() {
    // console.log("CURRENT PROBLEM RENDER", this.state.currentProblem)
    console.log('POSITION', this.state.problemNum) 
    let quest = this.props.allQuestions  
    // if (!quest.length) return null
    return (

      <div className="main-train-container" >

        {quest && <div className="question-div">
              <h2 className="question-title-text">{quest && quest[this.state.problemNum].title}</h2>
              <h6 className="question-description-text">{quest && quest[this.state.problemNum].description}</h6>
        </div>}

          <div className="train-container">
              <div className="editor-div left-train-container">
                <ReactAce
                      style={{ height: '50vh'}}
                      mode="javascript"
                      theme="monokai"
                      enableBasicAutocompletion = {true}
                      onChange={this.onChange}
                      ref={instance => { this.ace = instance; }} // Let's put things into scope
                />

                    <form id="train-submit" className="submit-btn" onSubmit={this.onSubmit}>
                      <input id="train-submit-btn"type="submit" />
                    </form>
                    <button
                    onClick={this.nextQuestion}
                    > 
                      NEXT
                    </button>
               </div>

                 <div className="right-train-container">
                  <div className="output-div" >
                      <h4 className="right-container-headers">Output:</h4>
                      
                  </div>

                   <div className="test-specs-div">
                      <h4 className="right-container-headers">Test Specs:</h4>
                      {
                        this.state.output ? <div id="output-text"> {this.state.output} </div>  : <div><p>OUTPUT FAILED</p> </div>
                      }
                   </div>

                </div>
            </div>
        </div>
    );
  }
}

const mapState = (state) => {
  console.log('STATE:', state)
  return {
    email: state.user.email,
    user: state.user,
    allQuestions: state.problems.allProblems,
    completedQuestions: state.problems.completedProblems
  }
}

// const mapDispatch = dispatch => {
//   return {
//     loadAllProblems: (userId) => {
//       dispatch(fetchAllProblems())
//       dispatch(fetchCompletedProblems(userId))
//     }
//     // loadCompletedProblems: (userId) => {
//     //   dispatch(fetchCompletedProblems(userId))
//     // }
//   }
// }

export default connect(mapState)(CodeEditor)