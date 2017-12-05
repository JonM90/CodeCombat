import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // this.props.loadAllProblems();
    // this.props.loadCompletedProblems(this.props.user.id);
  }

  render() {

    return (
      <div>
        <h3>Welcome, {this.props.name}</h3>
        <div>
          <div className="name">
          Name: {this.props.name}
          </div>
          <br />
          <div className="email">
          Email: {this.props.email}
          </div>
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
