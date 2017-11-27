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
      currentMatch: {},
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
    this.setSig = this.setSig.bind(this);

  }
  componentDidMount() {
    console.log('MOUNTED this.PROPS', this.props)
    this.setState({eligibleQueue: this.props.questions})
    this.setState({currentProblem: this.props.questions[this.state.problemNum]})
    this.setSig()
    if (!this.ace) return null;
    this.setSig()
    this.editor = this.ace.editor
    // this.state.eligibleQueue.length && this.editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
  }

  componentWillReceiveProps(nP) {
    console.log('NP:', nP)
    if (nP.questions.length) {
      // this.setState({eligibleQueue: nP.questions})
      // this.setState({currentProblem: nP.questions[this.state.problemNum]})
      // if (this.ace) {
        // console.log("CURRENT PROBLEM", nP.questions[this.state.problemNum], 'this.ace:', this.ace)
        // this.ace.editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum]).signature}{}`)
        // this.ace.editor.setValue(`function ${(nP.questions[this.state.problemNum]).signature}{}`)
      // }
      this.setSig()
    }

    if (nP.match && nP.match.id) {
      this.setState({currentMatch: nP.match})
    }

    this.setSig()
  }

  setSig() {
    let currSig = this.state.currentProblem.signature
    // console.log('CURR SIG:', currSig, 'THIS.ACE:', this.ace)
    this.ace && this.ace.editor.setValue(`function ${currSig}{}`)
  }

  onChange(newValue, e) {
    // console.log("NEW VALUE", newValue, "EVENT", e);
    // console.log("in change", e)
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // console.log(editor.getValue()); // Outputs the value of the editor
    // console.log("ARE THERE ERRORS???? BEFORE", this.state.error)
    //USED TO GET ANNOTATIOINS FROM THE CODE EDITOR
    let error = false;
    editor.getSession().on('changeAnnotation', () => {

      let comments = editor.getSession().getAnnotations();
      //  console.log("COMMENTS: ", comments)
      comments.forEach(val => {

        if (val.type === 'error'){
          error = true
          this.setState({error})
          // return;
        }
      })
    })

    // console.log("ANNOTATIONS OVER HERE BEFORE:", comments)
    //LOOP THROUGH THE EDITOR SO THAT WE CAN SEE IF THERE IS AN ERROR


    this.setState({attempt, error})
    // console.log("ANNOTATIONS OVER HERE AFTER:", comments)
    // console.log("ARE THERE ERRORS???? AFTER", this.state.error)
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
    let currMatch = this.state.match
    // console.log('currMATCH:', currMatch)
    console.log('this.props:', this.props)
    if (this.props.battleProps) {
      var myID = +this.props.battleProps.match.params.userId
      var player = myID && currMatch.playerHost === myID ? 'host' : 'guest'
      // console.log('PLAYERTYPE', player, 'currMatch.playerHost:', typeof currMatch.playerHost, 'myID:', typeof myID)
    }

    currMatch && currMatch.id ?
      events.emit('battleSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs, player])
    :
      events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs]);

      // console.log("SECOND EVENT", events)
      events.on('output', (output) => {
        // console.log('LOGGER SHIET:', output[1])
        this.setState({output: output[0]})
        this.setState({logger: output[1]})
      })
      events.on('pass', (pass) => this.setState({pass}))
      // console.log("THIRD EVENT", events)
      // events.on('output', (output) => {
      //   this.setState({output:output[0], logger:output[1]})})
  }

  render() {
    let quest = this.state.eligibleQueue
    // let currSig = this.state.currentProblem.signature
    console.log('quest', quest)
    console.log('STATE', this.state)
    // this.ace && this.ace.editor.setValue(`function ${currSig}{}`)

    return (
      this.state.problemNum !== quest.length ?
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
              // value={currSig}
              enableBasicAutocompletion = {true}
              onChange={this.onChange}
              ref={instance => { this.ace = instance; }} // Let's put things into scope
            />

            <form
              id="train-submit"
              className="submit-btn"
              onSubmit={!this.state.error ? this.onSubmit : (e) => {
                e.preventDefault()
                this.setState({output: 'FIX YOUR ERRORS'})
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
              {//console.log("DON'T MIND ME IM JUST A LOGGER", this.state.logger)
              }
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
  // console.log('STATE:', state)
  return {
    user: state.user,
  }
}

export default connect(mapState)(CodeEditor)
