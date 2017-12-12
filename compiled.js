'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putRoom = exports.makeRoom = exports.fetchRoom = exports.updateRoom = exports.createRoom = exports.getRoom = exports.UPDATE_ROOM = exports.CREATE_ROOM = exports.GET_ROOM = undefined;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRoom;
  var action = arguments[1];

  switch (action.type) {
    case GET_ROOM:
      // return [...state, action.problem]
      return Object.assign({}, state, { activeRoom: action.room });
    case CREATE_ROOM:
      return Object.assign({}, state, { createdRoom: action.room });
    case UPDATE_ROOM:
      return Object.assign({}, state, { updatedRoom: action.room });
    default:
      return state;
  }
};

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _history = require('../history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ACTION TYPES
 */
var GET_ROOM = exports.GET_ROOM = 'GET_ROOM';
var CREATE_ROOM = exports.CREATE_ROOM = 'CREATE_ROOM';
var UPDATE_ROOM = exports.UPDATE_ROOM = 'UPDATE_ROOM';

/**
 * INITIAL STATE
 */
var defaultRoom = {};

/**
 * ACTION CREATORS
 */
var getRoom = exports.getRoom = function getRoom(room) {
  return { type: GET_ROOM, room: room };
};
var createRoom = exports.createRoom = function createRoom(room) {
  return { type: CREATE_ROOM, room: room };
};
var updateRoom = exports.updateRoom = function updateRoom(room) {
  return { type: UPDATE_ROOM, room: room };
};

// const removeProblem = () => ({type: REMOVE_PROBLEM})

/**
 * THUNK CREATORS
 */
var fetchRoom = exports.fetchRoom = function fetchRoom(level) {
  return function (dispatch) {
    return _axios2.default.get('/api/room/matches', { level: level }).then(function (res) {
      return dispatch(getRoom(res.data || defaultRoom));
    }).catch(function (err) {
      return console.error(err);
    });
  };
};

var makeRoom = exports.makeRoom = function makeRoom(roomId, level, player1) {
  return function (dispatch) {
    return _axios2.default.post('/api/room/matches', {
      roomId: roomId,
      level: level,
      player1: player1
    }).then(function (res) {
      return dispatch(createRoom(res.data || defaultRoom));
    }).catch(function (err) {
      return console.error(err);
    });
  };
};

var putRoom = exports.putRoom = function putRoom(roomId, playerJoin, status) {
  return function (dispatch) {
    return _axios2.default.put('/api/room/matches', { roomId: roomId, playerJoin: playerJoin, status: status }).then(function (res) {
      return dispatch(updateRoom(res.data || defaultRoom));
    }).catch(function (err) {
      return console.error(err);
    });
  };
};

//REDUCER
