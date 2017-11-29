import io from 'socket.io-client'
import {events} from './components/editor'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  console.log(`A socket connection has been made: ${socket.id}`)
})
events.on('userSubmit', (userFunc) => {
  console.log('user submitted userFunc is:', userFunc)
  socket.emit('userSubmit', userFunc);
})
socket.on('result', (outPut) => {
  console.log('SOCKET ON RESULT', outPut)
  events.emit('output', outPut);
})
socket.on('mssg', (msg) => {
  console.log(`${msg} READY IS RUNINNG BRUNCH FOR LIFE`)
  socket.emit('imStarting', true)
})

socket.on('findOrJoinRoom', socketID => {
  console.log('Joining room in FRONT:', socketID)
  socket.join(socketID)
});
events.on('battleSubmit', (userFunc) => {
  console.log('player1 submitted userFunc is:', userFunc)
  socket.emit('battleSubmit', userFunc);
})
export default socket

// socket.on('userSolution', (userSolution) => {
//   console.log('SOCKET CONNECTED userSolution:', userSolution)
//   events.emit('userSolution', userSolution);
// })
// socket.on('pass', bool => {
//   console.log('SOCKET ON PASS', bool)
//   // events.emit('pass', bool)
//   socket.emit('passVal', bool)
// })
