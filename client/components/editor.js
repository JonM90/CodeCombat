import ReactAce from 'react-ace-editor';
import React, { Component } from 'react';
// const socket = require('../client/socket')
const {EventEmitter} = require('events');
const events = new EventEmitter()

export default events;

export function mssg(msg, shouldBroadcast = true) {
  // If shouldBroadcast is truthy, we will emit an event to listeners w. msg
  shouldBroadcast &&
      events.emit('mssg', msg);
}

export class CodeEditor extends Component {
  constructor() {
    super();

    this.state = {
      attempt: '',
      output: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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

  onSubmit(e) {
    e.preventDefault();
    // console.log('SUBMIT!', socket)
    events.emit('mssg', this.state.attempt)
    console.log('attempt:', this.state.attempt)
    events.on('output',(output)=> {this.setState({output})})

  }
  render() {
    return (
      <div style={{display: 'inline'}}>
        <ReactAce
          mode="javascript"
          theme="monokai"
          enableBasicAutocompletion = {true}
          //setReadOnly="false"
          onChange={this.onChange}
          style={{ height: '400px', width: '45%', float: 'left'}}
          ref={instance => { this.ace = instance; }} // Let's put things into scope
        />
        <div style={{ backgroundColor: 'grey', width: '45%', float: 'right'}}>
        { this.state.output? (
          <div>{this.state.output}
          </div>
        ): <div><p>OUTPUT FAILED</p></div>}
        </div>


      <form onSubmit={this.onSubmit}>
        <input type="submit" />
      </form>
      </div>
    );
  }
}

// style={{ height: '400px', width: '50%', display: 'inline', backgroundColor: 'light-grey' }}
