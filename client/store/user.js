import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const UPDATE_USER_POINTS = 'UPDATE_USER_POINTS'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const updatePoints = userPoints => ({type: UPDATE_USER_POINTS, userPoints})

/**
 * THUNK CREATORS
 */
export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.error(err))

export const auth = (email, password, method, name, userName, userId) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password, name, userName })
      .then(res => {
        dispatch(getUser(res.data))
        // console.log('RES.DATA***********:', res.data)
        history.push(`/users/${res.data.id}/profile`)
        //  history.push('/profile')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

// export const updateUserPoints = (userId,point) =>
//   dispatch =>
//     axios.put(`/api/users/${userId}/profile`, {points: point})

//   .then(res => {

//     console.log("***UPDATE USER POINTS RES.DATA:", res.data.points)
//     dispatch(updatePoints(res.data.points))
//   })
//   .catch(err => console.error(err))

// export const getPoints = (userId) =>
//      dispatch =>
//            axios.put(`/api/${userId}/profile`, {points: 1000})
//                .then(res => res.data)
//                .then(updatedPts => {
//                 console.log("THIS IS HE USER UPDTATED POINT", updatedPts)
//                  dispatch(updateUserPoint(userPoint))
//               })
//                .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case UPDATE_USER_POINTS:
    //   return Object.assign({},state,{points: action.userPoints})
    default:
      return state
  }
}
