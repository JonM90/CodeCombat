import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'


export const Navbar = (props) => {
  const {handleClick, isLoggedIn} = props

  return (
    <div>
      <nav>
        <div id="main-game-title">
          <h1>CODE COMBAT</h1>
          <p>put your javascript skills to the test</p>
        </div> 
        <div id="nav-links">
          {
            isLoggedIn
              ? <div>
                  {/* The navbar will show these links after you log in */}
                  <Link to="/">Home</Link>
                  <Link to={`/users/${props.userId}/profile`}>Profile</Link>
                  <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
              </div>
          }
        </div>
      </nav>
      
    </div>
  )
}


/**
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

export default (connect(mapState, mapDispatch)(Navbar))


Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
