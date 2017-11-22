import React, { Component } from 'react';
import Popup from 'react-popup';

export class PopUp extends Component{
   constructor(){
    super();
   }

  componentDidMount(){
    Popup.create({
      title: null,
      content: 'This popup uses the create method directly to get more control. This popup demonstrates custom buttons.',
      buttons: {
          left: [{
              text: 'Cancel',
              className: 'danger',
              key: 'esc',
              action: function () {
                  Popup.alert('You pressed the Cancel btn');
  
                  /** Close this popup. Close will always close the current visible one, if one is visible */
                  Popup.close();
              }
          }],
          right: [{
              text: 'Alt',
              key: '⌘+enter',
              action: function () {
                  // Passing true as the second argument to the create method
                  // displays it directly, without interupting the queue.
                  Popup.create({
                      title: null,
                      content: 'I was configured to display right away, without affecting the queue. Closing this will display the previously visible popup.',
                      buttons: {
                          left: ['cancel'],
                          right: []
                      }
                  }, true);
              }
          }, {
              text: 'Save',
              className: 'success',
              action: function () {
                  Popup.alert('You pressed the Save btn');
  
                  /** Close this popup. Close will always close the current visible one, if one is visible */
                  Popup.close();
              }
          }]
      }
  });
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
