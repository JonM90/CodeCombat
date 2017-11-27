import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
const {EventEmitter} = require('events');
export const events = new EventEmitter()
// import socket from '../socket';
// export default events;
// import axios from 'axios';

export class CodeEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      currentProblem: {},
      output: [],
      eligibleQueue: [],
      problemNum: 0,
      logger: [],
      pass: false,
      error: false
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
    console.log('NP:', nP)

    if (nP.match && nP.match.id) {
      this.setState({match: nP.match})
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
    this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{
  //write your code here!
}`)
  }

  onSubmit(e) {

    e.preventDefault();
    let currMatch = this.state.match
    // console.log('currMATCH:', currMatch)
    console.log('this.props:', this.props)
    if (this.props.battleProps) {
      var myID = +this.props.battleProps.match.params.userId
      var player = myID && currMatch.playerHost === myID ? 'host' : 'guest'
      console.log('PLAYERTYPE', player, 'currMatch.playerHost:', typeof currMatch.playerHost, 'myID:', typeof myID)
    }

    currMatch && currMatch.id ?
      events.emit('battleSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs, player])
    :
      events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs]);

      console.log("SECOND EVENT", events)
      events.on('output', (output) => {
        console.log('LOGGER SHIET:', output[1])
        this.setState({output: output[0]})
        this.setState({logger: output[1]})
      })
      events.on('pass', (pass) => this.setState({pass}))
      console.log("THIRD EVENT", events)
      // events.on('output', (output) => {
      //   this.setState({output:output[0], logger:output[1]})})
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
                this.state.logger.length ? <div id="output-text"> {this.state.logger.slice(0, this.state.logger.length / 2).map(val => (<div key={val}>{val}</div>))} </div>  : <div>{this.state.output}</div>
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

const mapState = (state) => {
  console.log('STATE:', state)
  return {
    user: state.user,
  }
}

export default connect(mapState)(CodeEditor)
