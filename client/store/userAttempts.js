import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const STORE_ATTEMPT = 'STORE_ATTEMPT'
const STORE_SUBMISSION = 'STORE_SUBMISSION'

/**
 * INITIAL STATE
 */
const defaultAnswer = ""

/**
 * ACTION CREATORS
 */
const storeAttempt = user => ({type: STORE_ATTEMPT, attempt})
const storeSubmission = () => ({type: STORE_SUBMISSION, submission})

/**
 * THUNK CREATORS
 */
export const submitAttempt = (question, answer) => 
  dispatch => {
    //PLACEHOLDER
    axios.post('/api/submission', {question, answer})
    .then(res => {
      dispatch(storeSubmission(res.data))
    })
    .catch(e => console.log(e))
  }


/**
 * REDUCER
 */
export default function (state = defaultAnswer, action) {
  switch (action.type) {
    case STORE_SUBMISSION:
      return action.submission
    default:
      return state
  }
}
