import React, { Component } from 'react';

export class Dialog extends Component{
   constructor(props){
    super(props);
   }

  componentDidMount(){}

  render(){
    // let quest = this.props.quest
    // if (!quest) return null;
    // // console.log('this.props:', this.props)
    // let qName = this.props.quest.title
    // if (!qName) return null;
    // console.log('qName:', qName)
  
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1>{`CONGRATS! YOU DID AN AMAZING JOB. YOU HAVE RANKED UP RANK 9`}</h1>
              <h3>{`We are need you use JavaScript to change the world.`}</h3>

          <div id="train-pop-btn">
             {/* <button className='pop-btn-yes btn btn-success' onClick={this.props.func}>ACCEPT</button> */}
              {/* <button className='pop-btn-no btn' onClick={this.props.congratFunc}>NEXT QUESTION</button> */}
              <button className='pop-btn-close btn' onClick={this.props.quitFunc}>BACK TO LOBBY</button>
          </div>

          </div>
        </div>
      )
    )
  }
}
