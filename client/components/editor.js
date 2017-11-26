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
    if (!this.ace) return null;
    this.editor = this.ace.editor
    console.log('MOUNTED', this.editor)
    // this.state.eligibleQueue.length && this.editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
  }

  componentWillReceiveProps(nP) {
    if (nP.questions.length) {
      this.setState({eligibleQueue: nP.questions})
      if (this.props.eligibleQueue.length) {
        this.ace.editor.setValue(`function ${(this.props.eligibleQueue[this.props.problemNum]).signature}{
  //write your code here!  
}`)
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

  nextQuestion(e){
    e.preventDefault();
    this.setState({problemNum: this.state.problemNum + 1})
    this.setState({output: ''})
    const editor = this.ace.editor
    this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{
  //write your code here!
}`)
  }

  onSubmit(e) {
    e.preventDefault();
    events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs])
    events.on('output', (output) => {this.setState({output:output[0]})})
    events.on('pass', (pass) => {
      this.setState({pass})
    })
  }
  render() {

    // const result =   this.state.output ? this.state.output : ''

    // this.state.output ?  console.log('OUTPUT in EDITOR: ', result) : ''

    let quest = this.state.eligibleQueue
    console.log('quest', quest)
    return (
      this.state.problemNum !== this.state.eligibleQueue.length ?
      (<div className="main-train-container" >

        {quest.length && <div className='question-div'>
          <h2 className='question-title-text'>{quest.length && quest[this.props.problemNum].title}</h2>
          <h4 className='question-description-text'>{quest.length && quest[this.props.problemNum].description}</h4>
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
                this.state.output ? <div id="output-text"> {this.state.output.map(elem => (<div> { elem  }</div> ))} </div>  : <div><p></p></div>
              }
            </div>

          </div>
        </div>
      </div>) : <div><h2>CONGRATULATIONS!!!</h2></div>
    );
  }
}

