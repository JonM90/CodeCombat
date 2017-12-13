import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

export class Lobby extends Component{
  constructor(){
      super();
  }

  render(){
    return (
      <div id="lobby-main">
        <div id="lobby-main-cards">
          <div id="train-div" className="card">
            <Link to="/train">
              <div className="card-header">
                  <h1>TRAIN</h1>
                  <p>Build your skills through Missions</p>
              </div>
              <div className="card-body">
                  <img className="card-body-img" src="/assets/training-icon.png"/>
              </div>
            </Link>
          </div>

          <div id="battle-div" className="card">
            <Link to={`/users/${this.props.userId}/battle`}>
                <div className="card-header">
                  <h1>BATTLE</h1>
                  <p>Battle Opponents For Glory!</p>
                </div>
                <div className="card-body">
                  <img className="card-body-img" src="/assets/battle-icon.png"/>
                </div>
              </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    userId: state.user.id,
  }
}

export default connect(mapState)(Lobby)
