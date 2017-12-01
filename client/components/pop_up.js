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
    // console.log('this.props:', this.props)
    let qName = this.props.quest.title
    if (!qName) return null;
    // console.log('qName:', qName)
    const style = { margin: '20px' };
  
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1>{`DO YOU WISH TO ACCEPT THIS MISSION?`}</h1>
            <h2>{`Mission: ${qName}`}</h2>
            {/* <MuiThemeProvider muiTheme={getMuiTheme()}> */}
              <div id="train-pop-btn">
                {/* <RaisedButton label="ACCEPT" primary={true} style={style} onClick={this.props.func} />
                <RaisedButton label="SKIP" secondary={true} style={style} onClick={this.props.skipFunc}/>
                <RaisedButton label="QUIT" disabled={true} style={style} onClick={this.props.quitFunc}/> */}
                  <button label="Primary" primary={true} style={style} className='pop-btn-yes btn btn-success' onClick={this.props.func}>ACCEPT</button>
                  <button label="Primary" primary={true} style={style} className='pop-btn-no btn' onClick={this.props.skipFunc}>SKIP</button>
                  <button label="Primary" primary={true} style={style} className='pop-btn-close btn' onClick={this.props.quitFunc}>QUIT</button>
              </div>
            {/* </MuiThemeProvider> */}

          </div>
        </div>
      )
    )
  }
}
