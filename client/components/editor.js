import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
const {EventEmitter} = require('events');
export const events = new EventEmitter();
// import axios from 'axios';

export class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: '',
      currentProblem: {},
      output: '',
      logger: [],
      error: false,
      // output: [],
      // eligibleQueue: [],
      // problemNum: 0,
      // pass: false,
      // points: 0
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setSig = this.setSig.bind(this);
    // this.onPassTrue = this.onPassTrue.bind(this);
    // this.props.addPoints = this.props.addPoints.bind(this);

  }
  componentDidMount() {

    this.setState({
      currentProblem: this.props.question
      // points: this.props.userPoints,
      // eligibleQueue : this.props.questions,
      // currentProblem : this.props.questions[this.state.problemNum]
    })
    if (this.ace) {
      this.editor = this.ace.editor
      //console.log("GONNA FIRE SETSIG")
      this.setSig();
    }

    console.log("WE IN DID MOUNT", this.state)
    // this.state.eligibleQueue.length && this.editor.setValue(`function ${(this.props.allQuestions[this.state.problemNum]).signature}{}`)
  }

  componentWillReceiveProps(nP) {
    console.log("IN RECEIVE PROPS")
    if (this.ace) {
      this.editor = this.ace.editor
      console.log("GONNA FIRE SETSIG")
      this.setSig();
    }
    // console.log('NP:', nP)
    // if (nP.questions.length) {

    //   this.setState({eligibleQueue: nP.questions})
    //   this.setState({currentProblem: nP.questions[this.state.problemNum]})
    //   console.log("STATE - WILLRECEIVE 1:", this.state)

    //   // if (this.ace) {
    //     console.log("CURRENT PROBLEM", nP.questions[this.state.problemNum], 'this.ace:', this.ace)
    //     // this.ace.editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum]).signature}{}`)
    //     // this.ace.editor.setValue(`function ${(nP.questions[this.state.problemNum]).signature}{}`)
    //   // }
    //   this.setSig()
    // }
    // if (nP.match && nP.match.id) {
    //   this.setState({match: nP.match})
    // }
    // // this.setSig()
    // console.log("STATE - WILLRECEIVE 2:", this.state)
  }

  setSig() {
    let currSig = this.state.currentProblem.signature
    console.log("CURRRR SIGGG", currSig)
    // console.log('CURR SIG:', currSig, 'THIS.ACE:', this.ace)
    this.ace && this.ace.editor.setValue(`function ${currSig}{}`)
    console.log("STATE - SETSIG FUNC:", this.state)

  }

  onChange(newValue,e ) {
    // console.log("NEW VALUE", newValue, "EVENT", e);
    console.log("in change", e)
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // console.log(editor.getValue()); // Outputs the value of the editor
    // console.log("ARE THERE ERRORS???? BEFORE", this.state.error)
    //USED TO GET ANNOTATIOINS FROM THE CODE EDITOR
    let error = false;
    editor.getSession().on("changeAnnotation", () => {

      let comments = editor.getSession().getAnnotations();

      comments.forEach(val => {

        if (val.type === 'error'){
          error = true
          this.setState({error})
          return;
        }
      })
    })
    this.setState({attempt, error})
  }

  nextQuestion(e){
    this.props.nextQuestion(e)
    this.setState({output: ''})
    // e.preventDefault();
    // console.log("NEXT IS FIRED", this.state.problemNum)
    // let currProblem = this.state.problemNum + 1;
    // this.setState({
    //   problemNum : currProblem,
    //   currentProblem : this.props.questions[currProblem],
    //   output : ''
    // })
    // const editor = this.ace.editor
    // ///this.state.eligibleQueue && editor.setValue(`function ${(this.state.eligibleQueue[this.state.problemNum + 1]).signature}{}`)
    // editor.setValue(`function ${(this.state.eligibleQueue[currProblem]).signature}{}`)
    // this.onPassTrue();
    // console.log("STATE - NEXTQUESTION FUNC:", this.state)
  }

  onSubmit(e) {
    e.preventDefault();

    console.log('this.props:', this.props)

    // events.emit('userSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs]);
    events.emit('userSubmit', [this.state.attempt, this.state.currentProblem.testSpecs]);

    //console.log("SECOND EVENT", events)
    events.on('output', (output) => {
      // console.log('LOGGER SHIET:', output[1])
      this.setState({output: output[0]})
      this.setState({logger: output[1]})
    })
    // events.on('pass', (pass) => {
    //   pass ? alert('YOU PASSED!') : null
    //   this.setState({pass})
    // })
    console.log("STATE - ON SUBMIT:", this.state)

    // let isPassing = this.onPassTrue;

    // isPassing();
  }

  // onPassTrue(){
  //   // console.log("ON PASS TRUE STATE:",this.state)
  //   // console.log("ON PASS TRUE PROPS:",this.props)
  //   if (this.state.pass){
  //     let questPoints = this.state.currentProblem.level * 5;
  //     let newPoints = this.state.points + questPoints;
  //     console.log("YOU NOW HAVE ", newPoints, " POINTS!")
  //     // console.log("STATE - ONPASSTRUE FUNC:", this.state)
  //     this.props.addPoints(this.props.userId, this.newPoints);
  //     this.props.setProbToComplete(this.props.userId, this.state.currentProblem.id);
  //   }
  //   //
  //   //1. update user's points based on question rank >>> this.props.userId

  //   //2. save user submitted code to user's history >>> this.props.userId

  //   //3. update completed problems to include user's id >>> this.state.eligibleQueue[this.state.problemNum].id
  // }

  render() {
    console.log("IS THIS RERENDERINGGGGGGGGGGG?")
    console.log("********************this is state at re-render",this.state)
    // let quest = this.state.eligibleQueue
    let quest = this.state.currentProblem
    // let currSig = this.state.currentProblem.signatu
    console.log('quest', quest)
    // this.ace && this.ace.editor.setValue(`function ${currSig}{}`)

    return (
      // this.state.problemNum !== this.state.eligibleQueue.length ?
      this.state.currentProblem &&  this.state.currentProblem.id ?
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
  console.log('****************STATE', state)
  return {
    user: state.user,
  }
}

export default connect(mapState)(CodeEditor)
