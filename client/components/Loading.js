import React, { Component } from 'react';

export default class Loading extends Component{
   constructor(props){
    super(props);
    this.state = {
        load:[
            "/assets/bemoLoad.gif",
            "/assets/pokeBikeLoad.gif",
            "/assets/pokeMatchLoad.gif",
            "/assets/slapEarthLoad.gif"
        ]
    }
   }

  componentDidMount(){}

  render(){
      let rnd = Math.floor(this.state.load.length * Math.random());
    return (
      (
        <div className="hidden" id='loadingGif'>
            <img src={this.state.load[rnd]} />
        </div>
      )
    )
  }
}
