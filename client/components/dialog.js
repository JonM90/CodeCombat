import React, { Component } from 'react';

export class Dialog extends Component{
   constructor(props){
    super(props);
   }

  componentDidMount(){}

  render(){
  
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1>{`CONGRATS! YOU DID AN AMAZING JOB. YOU HAVE LEVELLED UP TO RANK ${this.props.rank}`}</h1>

          <div id="train-pop-btn">
              <button className='pop-btn-close btn' onClick={this.props.viewStatsFunc}>VIEW MY STATS</button>
              <button className='pop-btn-close btn' onClick={this.props.quitFunc}>BACK TO LOBBY</button>
          </div>

          </div>
        </div>
      )
    )
  }
}
