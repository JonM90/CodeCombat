import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
// const socket = require('../client/socket')
const {EventEmitter} = require('events');
const events = new EventEmitter()

export default events;

// export function mssg(msg, shouldBroadcast = true) {
//   // If shouldBroadcast is truthy, we will emit an event to listeners w. msg
//   shouldBroadcast &&
//       events.emit('mssg', msg);
// }

export class CodeEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      output: '',
      test: [
        {input: 2, output: 4},
        {input: 4, output: 8},
        {input: 8, output: 16}
      ]
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.tester = this.tester.bind(this);

  }
  onChange(newValue, e) {
    console.log(newValue, e);

    let attempt = newValue;

    const editor = this.ace.editor; // The editor object is from Ace's API
    editor.getSession().setUseWrapMode(true);
    // editor.getSession.setBehaviorEnabled(true)
    console.log(editor.getValue()); // Outputs the value of the editor

    this.setState({attempt})
  }

  tester(num){
    return num*2;
  }

  onSubmit(e) {
    e.preventDefault();
    // console.log('SUBMIT!', socket)
    events.emit('userSubmit', this.state.attempt)

    events.on('output', (output) => {this.setState({output})})
  }
  render() {
    console.log('OUTPUT!', this.state)

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
                      {
                          // this.state.output ? <div id="output-text"> {this.state.output} </div>  : <div><p>OUTPUT FAILED</p> </div>
                      }
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

