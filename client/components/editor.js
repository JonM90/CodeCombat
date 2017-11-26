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
      output: [],
      eligibleQueue: [],
      // problems: [],
      problemNum: 0,
      logger:[],
      pass: false,
      error:false
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
      if (this.state.eligibleQueue.length) {
        this.ace.editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum]).signature}{}`)
      }
    }
  }

  onChange(newValue, e) {
    console.log("NEW VALUE", newValue, "EVENT", e);
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    console.log(editor.getValue()); // Outputs the value of the editor
    console.log("ARE THERE ERRORS???? BEFORE", this.state.error)
    //USED TO GET ANNOTATIOINS FROM THE CODE EDITOR
    let comments = editor.getSession().getAnnotations()
    let error = false;
    console.log("ANNOTATIONS OVER HERE BEFORE:", comments)
    //LOOP THROUGH THE EDITOR SO THAT WE CAN SEE IF THERE IS AN ERROR
    comments.forEach(val => {
      if(val.type === "error"){
        error = true
        this.setState({error})
      }
    })
    
    this.setState({attempt, error})
    console.log("ANNOTATIONS OVER HERE AFTER:", comments)
    console.log("ARE THERE ERRORS???? AFTER", this.state.error)
  }

  nextQuestion(e){
    e.preventDefault();
    this.setState({problemNum: this.state.problemNum + 1})
    this.setState({output: ''})
    const editor = this.ace.editor
    this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{}`)
  }

  onSubmit(e) {

    e.preventDefault();
    events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs])
    events.on('output', (output) => {
      this.setState({output:output[0], logger:output[1]})})
    events.on('pass', (pass) => {
      this.setState({pass})
    })
    
    
  }
  render() {
    let quest = this.state.eligibleQueue
    console.log('quest', quest)
    return (
      this.state.problemNum !== this.state.eligibleQueue.length ?
      (<div className="main-train-container" >

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

            <form 
              id="train-submit" 
              className="submit-btn" 
              onSubmit={!this.state.error ? this.onSubmit : (e) => {
                e.preventDefault()
                this.setState({output:"FIX YOUR ERRORS"})
              } }>
              <input id="train-submit-btn"type="submit" />
              <button onClick={this.nextQuestion}>
                NEXT
              </button>
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">CONSOLE:</h4>
              {console.log("DON'T MIND ME IM JUST A LOGGER", this.state.logger)}
              {
                this.state.logger ? <div id="output-text"> {this.state.logger.slice(0, this.state.logger.length/2).map(val => (<div key={val}>{val}</div>))} </div>  : <div>{this.state.output}</div>
              }

            </div>

            <div className="test-specs-div">
              <h4 className="right-container-headers">Test Specs:</h4>
              
              {
                this.state.output && this.state.output !== "FIX YOUR ERRORS" ? <div id="output-text"> {this.state.output.map(val => (<div key={val}>{val}</div>))} </div>  : <div>{this.state.output}</div>
              }
            </div>

          </div>
        </div>
      </div>) : <div><h2>CONGRATULATIONS!!!</h2></div>
    );
  }
}

