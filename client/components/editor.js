import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
// const socket = require('../client/socket')
const {EventEmitter} = require('events');
const events = new EventEmitter()
// import axios from 'axios';
export default events;

export class CodeEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      currentProblem: {},
      output: '',
      eligibleQueue: []
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    // axios.get('api/problems/6')
    //   .then(res=>res.data)
    //   .then(currentProblem => {
    //     this.setState({currentProblem})
    //     // console.log("SO WE KNO:",this.state.currentProblem)
    //    })
    console.log('EDITOR.props.questions!', this.props.questions.length)

    // if (this.props.questions.length) {this.setState({eligibleQueue: this.props.questions})}
  }

  componentWillReceiveProps(nP) {
    console.log('NP:', nP)
    console.log('EDITOR.props.questions!', nP.questions.length)
    if (nP.questions.length) {
      console.log('ENTERED IF:', !!nP.questions.length)
      this.setState({eligibleQueue: nP.questions})
      // console.log('SET QUEUE STATE:', this.state.eligibleQueue)
    }
  }

  onChange(newValue, e) {
    // console.log(newValue, e);
    let attempt = newValue;

    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // editor.getSession.setBehaviorEnabled(true)
    // console.log(editor.getValue()); // Outputs the value of the editor
    this.setState({attempt})
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('SUBMIT!', socket)
    // console.log('this.state.currentProblem.testSpecs:',this.state.currentProblem.testSpecs)
    events.emit('userSubmit', [this.state.attempt, this.state.currentProblem.testSpecs])
    events.on('output', (output) => {this.setState({output})})
  }
  render() {
    console.log('this.state.eligibleQueue!', this.state.eligibleQueue)
    // console.log('EDITOR.props.questions!', this.props.questions.length)
    // if (this.props.questions.length) {this.setState({eligibleQueue: this.props.questions})}
    // let queue = this.state.eligibleQueue;
    // console.log('QUEUE:', queue)
    return (
      <div className="main-train-container" >

        <div className="question-div">
          <h2>Write a function that can destroy the world!!!</h2>
        </div>

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

