import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {fetchAllProblems} from '../store';

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.loadAllProblems()
  }

  render() {
    const {email} = this.props;
    const {user} = this.props;

    return (
      <div>
        <h3>Welcome, {user.name}</h3>
        <div>
          Name: {user.name}
          <br />
          Email: {email}
          <br />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}

// const mapDispatch = dispatch => ({ loadAllProblems: () => dispatch(fetchAllProblems()) })


export default connect(mapState)(UserHome)
// export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
