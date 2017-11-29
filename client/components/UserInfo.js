import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';

class UserInfo extends Component {
    
    render(props) {
        let listItemStyles={
            
                }
        const {email} = this.props;
        const {user} = this.props;
        return (<div id="userProfile">
                    <div id="userProfile-image">
                        <img src={user.profileImage} id="profileImage" />
                    </div>
                    <div id="userProfile-info">
                    <List>
                        <ListItem primaryText="Inbox" style={listItemStyles}/>
                        <ListItem primaryText="Starred" />
                        <ListItem primaryText="Sent mail" />
                        <ListItem primaryText="Drafts" />
                        <ListItem primaryText="Inbox" />
                    </List>
                    </div>
                </div>)
    }
}

const mapState = (state) => {
    // console.log('STATE:', state)
    return {
      email: state.user.email,
      user: state.user
    }
  }
  
  const mapDispatch = dispatch => {
    return {}
  }
  
  export default connect(mapState, mapDispatch)(UserInfo)