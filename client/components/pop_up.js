import React, { Component } from 'react';

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
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1>{`Do you wish to accept this mission?`}</h1>
            <h2>{`Mission: ${qName}`}</h2>
            <button className='pop-btn-yes btn btn-success'onClick={this.props.func}>YES</button>
            <button className='pop-btn-no'onClick={this.props.func}>NO</button>
            <button className='pop-btn-close'onClick={this.props.func}>close me</button>
          </div>
        </div>
      )
    )
  }
}
