import React, { Component } from 'react';

export class PopUp extends Component{
   constructor(props){
    super(props);
   }

  componentDidMount(){}

  render(){
    return (
      (
        <div className='popup-div' style={{zIndex:'10'}}>
          <div className='popup-inner-div'>
            <h1 className='popup-header-text'>This should be a dynamic Heading</h1>
            <p className='popup-p-text'>...and this a dynamic paragraph</p>
            <button className='pop-btn-yes'onClick={this.props.func}>close me</button>
            <button className='pop-btn-no'onClick={this.props.func}>close me</button>
            <button className='pop-btn-close'onClick={this.props.func}>close me</button>
          </div>
        </div>
      )
    )
  }
}
