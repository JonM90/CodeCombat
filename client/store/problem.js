import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PROBLEM = 'GET_PROBLEM'
const GET_PROBLEMS = 'GET_PROBLEMS'
// const REMOVE_PROBLEM = 'REMOVE_PROBLEM'

/**
 * INITIAL STATE
 */
const defaultProblem = {}

/**
 * ACTION CREATORS
 */
const getProblem = problem => ({type: GET_PROBLEM, problem})
const getAllProblems = problems => ({type: GET_PROBLEMS, problems})
// const removeProblem = () => ({type: REMOVE_PROBLEM})

/**
 * THUNK CREATORS
 */
export const fetchProblem = () =>
  dispatch =>
    axios.get('/api/problems/:problemId')
      .then(res =>
        dispatch(getProblem(res.data || defaultProblem)))
      .catch(err => console.log(err))

export const fetchAllProblems = () =>
  dispatch =>
    axios.get('/api/problems')
      .then(res => {
        dispatch(getAllProblems(res.data))
      })
      .catch(err => console.error(err))


//REDUCER
export default function (state = defaultProblem, action) {
  switch (action.type) {
    case GET_PROBLEM:
      return action.problem
    case GET_PROBLEMS:
      return action.problems
    default:
      return state
  }
}
