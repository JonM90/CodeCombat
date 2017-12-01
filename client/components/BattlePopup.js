import React, { Component } from 'react';

export default class BattlePopup extends Component{
   constructor(props){
    super(props);

    this.state = {
      time: 5
    }

    this.battleCountdown = this.battleCountdown.bind(this)
   }

  componentDidMount(){
    this.battleCountdown()
  }

  battleCountdown() {
    let popInt = setInterval( () => {
      if (!this.state.time) {
        this.props.func()
        clearInterval(popInt)
        return;
      }
      console.log('STATE.TIME:', this.state.time)
      this.setState({time: this.state.time - 1})
    }, 1000)
  }

  render(){

    return (
      (
        <div className='popup-div' style={{zIndex: '10'}}>
          <div className='popup-inner-div'>

          <div className="train-pop-btn">
            <p id="battle-timer">{this.state.time || 'GO!'}</p>
          </div>

          </div>
        </div>
      )
    )
  }
}
