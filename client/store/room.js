import axios from 'axios'
//import history from '../history'

/**
 * ACTION TYPES
 */
export const GET_ROOM = 'GET_ROOM'
export const CREATE_ROOM = 'CREATE_ROOM'
export const UPDATE_ROOM = 'UPDATE_ROOM'

/**
 * INITIAL STATE
 */
const defaultRoom = {};

/**
 * ACTION CREATORS
 */
export const getRoom = room => ({type: GET_ROOM, room})
export const createRoom = room => ({type: CREATE_ROOM, room})
export const updateRoom = room => ({type: UPDATE_ROOM, room})

// const removeProblem = () => ({type: REMOVE_PROBLEM})

/**
 * THUNK CREATORS
 */
export const fetchRoom = (level) =>
  dispatch =>
    axios.get('/api/room/matches', {level})
      .then(res =>
        dispatch(getRoom(res.data || defaultRoom)))
      .catch(err => console.error(err))

export const makeRoom = (roomId, level, player1, questId) =>
  dispatch =>
    axios.post('/api/room/matches', {
        roomId,
        level,
        player1,
        questId
    })
      .then(res =>
        dispatch(createRoom(res.data || defaultRoom)))
      .catch(err => console.error(err))

export const putRoom = (roomId, playerJoin, status) =>
    dispatch =>
    axios.put('/api/room/matches', {roomId, playerJoin, status})
        .then(res =>
            dispatch(updateRoom(res.data || defaultRoom)))
        .catch(err => console.error(err))


//REDUCER
export default function (state = defaultRoom, action) {
  switch (action.type) {
    case GET_ROOM:
      // return [...state, action.problem]
      return Object.assign({}, state, {activeRoom: action.room})
    case CREATE_ROOM:
      return Object.assign({}, state, {createdRoom: action.room})
    case UPDATE_ROOM:
      return Object.assign({}, state, {updatedRoom: action.room})
    default:
      return state
  }
}
