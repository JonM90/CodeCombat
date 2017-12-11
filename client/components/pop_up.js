import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export class PopUp extends Component{
   constructor(props){
    super(props);
   }

  componentDidMount(){}

  render(){
    let quest = this.props.quest
    if (!quest) return null;
    let qName = this.props.quest.title
    if (!qName) return null;
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1>{`DO YOU WISH TO ACCEPT THIS MISSION?`}</h1>
            <h2>{`Mission: ${qName}`}</h2>

          <div className="train-pop-btn">
              <button className='pop-btn-yes btn btn-success' onClick={this.props.func}>ACCEPT</button>
              <button className='pop-btn-no btn' onClick={this.props.skipFunc}>SKIP</button>
              <button className='pop-btn-close btn' onClick={this.props.quitFunc}>QUIT</button>
          </div>

          </div>
        </div>
      )
    )
  }
}
