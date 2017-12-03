import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {

  const {name, displayName, handleSignupSubmit, error, handleLoginSubmit} = props;

  return name === 'signup' ? (
    <div className="signup-div">

      <form onSubmit={handleSignupSubmit} name={name}>

      <div>
          <label htmlFor="userName"><small> User Name</small></label>
          <input name="userName" type="text" placeholder="User Name" />
        </div>
          <br />
        <div>
          <label htmlFor="fullName"><small> Full Name </small></label>
          <input name="fullName" type="text" placeholder="Your Name" />
        </div>
           <br />
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text"  placeholder="Email@email.com" />
        </div>
           <br />
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" placeholder="Password" />
        </div>
           <br />
        <div>
          <button className="sub-btn" type="submit">{displayName}</button>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a className="google-login" href="/auth/google">{displayName} with Google</a>
    </div>
  )
    :
  (
    <div className="signup-div">

      <form onSubmit={handleLoginSubmit} name={name}>

        <div className="login-email">
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text"  placeholder="Email@email.com" />
        </div>
           <br />
        <div className="login-password">
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" placeholder="Password" />
        </div>
           <br />
        <div>
          <button className="sub-btn" type="submit">{displayName}</button>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
      {/* <a className="google-login" href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
    console.log('STATE IN AUTH-FROM:', state)
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    userId: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSignupSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const userName = evt.target.userName.value
      const fullName = evt.target.fullName.value
      dispatch(auth(email, password, formName, userName, fullName))
         // console.log("USER", userName)
    },

    handleLoginSubmit (evt) {
      evt.preventDefault()
      // const userId = this.props.userId
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
         // console.log("USER", userName)
        // console.log('STATE IN AUTH-FROM:', this.props)
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
