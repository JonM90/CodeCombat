import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export const Footer = (props) => {
  const {isLoggedIn} = props
  return (
    <div>
      <hr />
      <footer>
        <div id="footer-btns">
          { isLoggedIn ?
            <Link to={`/users/${props.userId}/problems`}>Past Problems</Link>
            : null }
          {/* The footer will show these links before you log in */}
            <Link to="/help">Help</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  )
}

/*
 * CONTAINER
*/
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Footer)

Footer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
