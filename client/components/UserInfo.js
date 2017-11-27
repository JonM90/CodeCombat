import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'

class UserInfo extends Component {

    render(props) {
        const {email} = this.props;
        const {user} = this.props;
        return (<div>
            Name: {user.name}
            <br />
            Email: {email}
            <br />
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