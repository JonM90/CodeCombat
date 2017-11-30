import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'
import {List, ListItem} from 'material-ui/List';

class UserInfo extends Component {
    
    render(props) {
        const {email} = this.props;
        const {user} = this.props;
        return (<div id="userProfile">
                    <div id="userProfile-image">
                        <img src={user.profileImage} id="profileImage" />
                    </div>
                    <div id="userProfile-info">
                    <List>
                        <ListItem disabled={true} primaryText={`NAME:   ${user.name}`} className="userProfile-info-field" />
                        <ListItem disabled={true} primaryText={`E-MAIL: ${email}`} className="userProfile-info-field" />
                        <ListItem disabled={true} primaryText={`RANK:   ${user.rank}`} className="userProfile-info-field" />
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