import React, { Component } from 'react';
import history from '../history'

export default class WinLosePopup extends Component{
   constructor(props){
    super(props);

    this.state = {
      time: 5
    }
    // this.battleCountdown = this.battleCountdown.bind(this)
   }

  componentDidMount(){
  }

  render(){
    return (
      (
        <div className='popup-div' style={{zIndex: '10'}}>
          <div className='popup-inner-div'>

            <div className="train-pop-btn">
              { !this.props.winLoseStatus ?
              <div className="win-lose-div">
                <p className="win-lose-mssg">YOU WIN!</p>
                {
                  <img src="/assets/win-gif.gif" alt="you win gif" />
                }
              </div>
              :
              <div className="win-lose-div">
                <p className="win-lose-mssg">YOU LOSE!</p>
                {
                  <img src="/assets/fireDeath.gif" alt="you lose gif" />
                }
              </div>
              }
              <button id="battle-pop-return-lobby" onClick={() => history.push('/')}>Return To Lobby</button>
            </div>
          </div>
        </div>
      )
    )
  }
}
