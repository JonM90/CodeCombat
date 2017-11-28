import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import {EventEmitter} from 'events';

export const battleEvents = new EventEmitter()

export class BattleEditor extends Component {
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
      error: false,
      opponentTotal:0,
      opponent:'',
      player2:true
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setSig = this.setSig.bind(this);
  }

  componentDidMount() {
    
    this.setState({eligibleQueue: this.props.questions})
    this.setState({currentProblem: this.props.questions[this.state.problemNum]})
    if (!this.ace) return null;

    battleEvents.on('determineWinner', (winner) => {
      if(winner[0] === this.state.opponent){
        console.log("YOU LOST LOSER!!!!")
      }else{
        console.log("OMG YOU WON!!!")
      }
    })
    // this.editor = this.ace.editor
  }

  componentWillReceiveProps(nP) {
    this.startTime = new Date();
    if (nP.questions.length) { this.setSig() }
    if (nP.match && nP.match.id) {
      this.setState({currentMatch: nP.match})
    }
  }

  setSig() {
    let currSig = this.state.currentProblem.signature
    this.ace && this.ace.editor.setValue(`function ${currSig}{}`)
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
        }
      })
    })
    //LOOP THROUGH THE EDITOR SO THAT WE CAN SEE IF THERE IS AN ERROR
    this.setState({attempt, error})
  }

  onSubmit(e) {
    e.preventDefault();
    var total = new Date() - this.startTime;
    console.log('TIMESTAMP ', total)
    let currMatch = this.state.currentMatch
    let currProb = this.state.currentProblem
    // console.log('currMATCH:', currMatch, 'currPROB:', currProb)
    var player = 'host'
    if (Object.keys(currMatch).length) { player = 'guest' }
    console.log('playerSTATUS:', player, 'this.props:', this.props)

    // currMatch && currMatch.id ?
    currProb && currProb.id ?
      battleEvents.emit('battleSubmit', [this.state.attempt, this.state.eligibleQueue[this.state.problemNum].testSpecs, player])
    : null

    if(this.state.player2){
      battleEvents.on('p2Pending', function p2Pending(msg,p1Total, p1Socket){
        console.log('OBTAINED p1Submit Emitter', p1Socket)
        this.setState({opponentTotal:p1Total, opponent:p1Socket})
      })
    }

      // console.log("SECOND EVENT", battleEvents)
      battleEvents.on('battleOutput', (output) => {
        // console.log('LOGGER SHIET:', output)
        this.setState({output: output[0]})
        this.setState({logger: output[1]})
      })

      battleEvents.on('battlePass', (pass) => {
        // console.log('PASS SHIET:', pass)
        if(pass){
          if(this.state.opponentTotal){
            console.log("P2Submit is about to Fire")
            battleEvents.emit('p2Submit', this.state.opponentTotal, total, this.state.opponent)
          }else{
            console.log("P1 SUBMIT STATE: ", this.state)
            this.setState({player2:false})
            battleEvents.removeListener('p2Pending', p2Pending)
            battleEvents.emit('p1Submit', total)
          }
        }
        this.setState({pass})
      })
      // console.log("THIRD EVENT", battleEvents)
  }

  render() {
    let quest = this.state.eligibleQueue
    console.log('STATE', this.state)

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
            </form>
          </div>

          <div className="right-train-container">
            <div className="output-div" >
              <h4 className="right-container-headers">CONSOLE:</h4>
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
  return {
    user: state.user,
  }
}

export default connect(mapState)(BattleEditor)
