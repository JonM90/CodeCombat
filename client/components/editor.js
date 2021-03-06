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
    this.setState({currentProblem: this.props.question})
  }

  componentWillReceiveProps(nP) {
    if (this.ace) {
      this.setState({ currentProblem: nP.question })
      if (nP.justCompleted && nP.justCompleted.userSolution && nP.question && nP.justCompleted.problemId === nP.question.id) this.setSig(nP.justCompleted.userSolution, true)
      else if (nP.question) this.setSig(nP.question.signature, false);
    }
  }

  setSig(currSig, isSolution) {
    if (isSolution) this.ace.editor.setValue(currSig)
    else this.ace.editor.setValue(`function ${currSig}{}`)
  }

  onChange(newValue, e) {
    let attempt = newValue;
    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);

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
    events.emit('userSubmit', [this.state.attempt, this.state.currentProblem.testSpecs]);

    events.on('output', (output) => {
      this.setState({output: output[0]})
      this.setState({logger: output[1]})
    })
  }

  render() {
    let quest = this.state.currentProblem

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

              style={{ height: '50vh', fontSize: 19}}
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
              <button className="editor-submit" type="submit" disabled={this.props.passed}>SUBMIT</button>
              <button className="editor-next-btn" onClick={this.nextQuestion}> NEXT MISSION </button>
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
              <h4 className="right-container-headers">Test Specs: {this.props.passed?
                (<span className="question-passed">YOU PASSED!</span>) : null}</h4>
             
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
  return {
    user: state.user,
  }
}

export default connect(mapState)(CodeEditor)
