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
      eligibleQueue: [],
      // problems: [],
      problemNum: 0,
      pass: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }
  componentDidMount() {
    console.log("THIS.PROPS DID MOUNT!!", this.props)
    console.log('EDITOR.props.questions!', this.props.questions.length)

    // const editor = this.ace.editor
    // this.state.eligibleQueue.length && editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
    // if (this.props.questions.length) {this.setState({eligibleQueue: this.props.questions})}
  }

  componentWillReceiveProps(nP) {
    console.log('NP:', nP)
    console.log('EDITOR.props.questions!', nP.questions.length)
    if (nP.questions.length) {
      console.log('ENTERED IF:', !!nP.questions.length)
      this.setState({eligibleQueue: nP.questions})
      const editor = this.ace.editor
      if (this.state.eligibleQueue.length) {
        console.log('INJECTING EDITOR with:!', this.state.eligibleQueue[this.state.problemNum])
        editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum]).signature}{}`)
      }
    }
  }

  onChange(newValue, e) {
    // console.log(newValue, e);
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // console.log(editor.getValue()); // Outputs the value of the editor
    this.setState({attempt})
  }

  nextQuestion(){
    this.setState({problemNum: this.state.problemNum + 1, outPut: ''})
    const editor = this.ace.editor

    this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{}`)
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('this.state.currentProblem.testSpecs:',this.state.currentProblem.testSpecs)
    // events.emit('userSubmit', [this.state.attempt, this.props.allQuestions[this.state.problemNum].testSpecs])
    events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs])
    events.on('output', (output) => {this.setState({output})})
    events.on('pass', (pass) => {
      this.setState({pass})
    })
  }
  render() {
    console.log('this.state.eligibleQueue!', this.state.eligibleQueue)
    console.log('POSITION', this.state.problemNum)
    let quest = this.state.eligibleQueue
    console.log('quest', quest)
    // console.log('EDITOR.props.questions!', this.props.questions.length)
    // if (this.props.questions.length) {this.setState({eligibleQueue: this.props.questions})}
    // let queue = this.state.eligibleQueue;
    // console.log('QUEUE:', queue)
    return (
      <div className="main-train-container" >

        {quest.length && <div className='question-div'>
          <h2 className='question-title-text'>{quest.length && quest[this.state.problemNum].title}</h2>
          <h6 className='question-description-text'>{quest.length && quest[this.state.problemNum].description}</h6>
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
              <button onClick={this.nextQuestion}>
                NEXT
              </button>
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">Output:</h4>

            </div>

            <div className="test-specs-div">
              <h4 className="right-container-headers">Test Specs:</h4>
              {
                this.state.output ? <div id="output-text"> {this.state.output} </div>  : <div><p></p> </div>
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

