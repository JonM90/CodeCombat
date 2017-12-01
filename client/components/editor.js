import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {EventEmitter} from 'events';
export const events = new EventEmitter();

export class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: '',
      currentProblem: {},
      output: '',
      logger: [],
      error: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.setSig = this.setSig.bind(this);
  }
  componentDidMount() {
    // console.log("WE IN DID MOUNT, this.props", this.props)
    this.setState({currentProblem: this.props.question})
  }

  componentWillReceiveProps(nP) {
    // console.log("IN RECEIVE PROPS:", nP)
    if (this.ace) {
      this.setState({ currentProblem: nP.question })
      // console.log("WILL RECEIVE FIRING SETSIG")
      if (nP.justCompleted && nP.justCompleted.userSolution && nP.question && nP.justCompleted.problemId === nP.question.id) this.setSig(nP.justCompleted.userSolution, true)
      else if (nP.question) this.setSig(nP.question.signature, false);
    }
  }

  setSig(currSig, isSolution) {
    // console.log('CURRRR SIG', currSig)
    if (isSolution) this.ace.editor.setValue(currSig)
    else this.ace.editor.setValue(`function ${currSig}{}`)
  }

  onChange(newValue, e) {
    // console.log('NEW VALUE change', newValue, 'EVENT', e)
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // console.log(editor.getValue()); // Outputs the value of the editor

    //USED TO GET ANNOTATIOINS FROM THE CODE EDITOR
    let error = false;
    editor.getSession().on('changeAnnotation', () => {
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
    e.preventDefault()
    this.props.nextQuestion(e)
    this.ace.editor.setValue(`function ${(this.state.currentProblem).signature}{}`)
    this.setState({output: ''})
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('onSUBMIT this.props:', this.props)

    events.emit('userSubmit', [this.state.attempt, this.state.currentProblem.testSpecs]);

    events.on('output', (output) => {
      // console.log('OUTPUT && LOGGER SHIET:', output[0], output[1])
      this.setState({output: output[0]})
      this.setState({logger: output[1]})
    })
  }

  // onPass(){
  //     this.props.updatePoints(2);
  // }

  render() {
    console.log("*****STATE at RENDER", this.state)
    let quest = this.state.currentProblem
    console.log('quest', quest)

    return (
      quest && quest.id ?
      (<div className="main-train-container" >

        <div className='question-div'>
          <h3 className='question-title-text'>Mission: {quest.title}</h3>
          <p className='question-description-text'>{quest.description}</p>
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

            <form
              id="train-submit"
              className="submit-btn"
              onSubmit={!this.state.error ? this.onSubmit : (e) => {
                e.preventDefault()
                this.setState({output: 'FIX YOUR ERRORS'})
              } }>
              <input id="train-submit-btn" type="submit" disabled={this.props.passed} />
              <button onClick={this.nextQuestion}> NEXT MISSION </button>
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">CONSOLE:</h4>
              {
                this.state.logger.length ? <div className="output-text"> {this.state.logger.slice(0, this.state.logger.length / 2).map(val => (<div className="output-text" key={val}>{val}</div>))} </div>  : null
              }
            </div>

            <div className="test-specs-div">
              <h4 className="right-container-headers">Test Specs:</h4>
              {this.props.passed? 
                (
                  <div className="question-passed">
                    YOU PASSED!
                  </div>  
                ): null}
              {
                this.state.output && this.state.output !== "FIX YOUR ERRORS" ?
                <div className="output-text">
                  {this.state.output.map(val => (
                    <div className="output-text" key={val}>{val}</div>))}
                </div>  : <div className="output-text">{this.state.output}</div>
              }
            </div>

          </div>
        </div>
      </div>) : <div><h2>CONGRATULATIONS!!!</h2></div>
    );
  }
}

const mapState = (state) => {
  console.log('****************MAPSTATE', state)
  return {
    user: state.user,
  }
}

// const mapDispatch = dispatch => {
//   return {
//     loadAllProblems: () => {
//       dispatch(fetchAllProblems())
//     },
//     loadCompletedProblems: (userId) => {
//       dispatch(fetchCompletedProblems(userId))
//     },
//     updatePoints: () => {
//       dispatch(getPoints(userId, points))
//     }
//   }
// }


export default connect(mapState)(CodeEditor)
