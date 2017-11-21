import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Lobby extends Component{
    constructor(){
        super();

    }
    render(){
        return (
            <div id="lobby-main">

                    <div id="train-div">
                        <Link to="/train">
                            <div className="train-body card-body">
                                <img className="card-body-img" src="http://ray-bansunglasses.us/wp-content/uploads/2017/08/games-1.png"/>
                            </div>
                            <div className="train-header card-header">
                                <h1>Train</h1>
                                <p>Training through Missions</p>
                            </div>

                        </Link>
                    </div>


                    <div id="battle-div">
                        <Link to="/battle">
                            <div className="battle-body card-body">
                                <img className="card-body-img" src="http://ray-bansunglasses.us/wp-content/uploads/2017/08/games-1.png"/>
                            </div>
                            <div className="battle-header card-header">
                                <h1>Battle</h1>
                                <p>Battle Opponents For Glory!</p>
                            </div>
                        </Link>
                    </div>

                    <div id="sandbox-div">
                        <Link to="/editor">
                            <div className="sandbox-body card-body">
                                <img className="card-body-img" src="http://ray-bansunglasses.us/wp-content/uploads/2017/08/games-1.png"/>
                            </div>
                            <div className="sandbox-header card-header">
                                <h1>Sandbox</h1>
                                <p>Your Personal Code Editor</p>
                            </div>

                        </Link>
                    </div>
            </div>
        )
    }
}
