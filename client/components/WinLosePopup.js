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
            <div>
              <p className="win-lose-mssg">{`YOU WIN ${this.props.pointNet} POINTS!`}</p>
              {
                //<img src="/assets/battleWin.gif" alt="you win gif" />
              }
            </div>
            :
            <div>
               <p className="win-lose-mssg">{`YOU LOSE ${this.props.pointNet} POINTS!`}</p>
               {
                 //<img src="/assets/fireDeath.gif" alt="you lose gif" />
               }
            </div>
            }
            <button onClick={() => history.push('/')}>Return To Lobby</button>
          </div>

          </div>
        </div>
      )
    )
  }
}
