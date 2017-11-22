import React, { Component } from 'react';
import Popup from 'react-popup';

export class PopUp extends Component{
   constructor(){
    super();
   }

  componentDidMount(){
    Popup.alert('Hello, look at me')
  }

  render(){
    return (
      <div id="pop-up-main">

        <Popup
          className="mm-popup"
          btnClass="mm-popup__btn"
          closeBtn={true}
          closeHtml={null}
          defaultOk="Ok"
          defaultCancel="Cancel"
          wildClasses={false}
          closeOnOutsideClick={true} />

      </div>
    )
  }
}
