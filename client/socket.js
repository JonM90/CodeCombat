import io from 'socket.io-client'
// import {mssg} from './components/editor'
import {events} from './components/editor'
const socket = io(window.location.origin)

// console.log('WTF IS WRONG???', events)

socket.on('connect', () => {
  console.log('Connected!')
  console.log(`A socket connection has been made: ${socket.id}`)
})
events.on('userSubmit', (userFunc) => {
  console.log('user submitted userFunc is:', userFunc)
  socket.emit('userSubmit', userFunc);
})
events.on('battleSubmit', (userFunc) => {
  console.log('player1 submitted userFunc is:', userFunc)
  socket.emit('battleSubmit', userFunc);
})
// socket.on('userSolution', (userSolution) => {
//   console.log('SOCKET CONNECTED userSolution:', userSolution)
//   events.emit('userSolution', userSolution);
// })
socket.on('result', (outPut) => {
  console.log('SOCKET ON RESULT', outPut)
  events.emit('output', outPut);
})
// socket.on('pass', bool => {
//   console.log('SOCKET ON PASS', bool)
//   // events.emit('pass', bool)
//   socket.emit('passVal', bool)
// })
socket.on('mssg', (msg) => {
  console.log(`${msg} READY IS RUNINNG BRUNCH FOR LIFE`)
  socket.emit("imStarting", true)
  // this.setState({show: true})
})
socket.on('findOrJoinRoom', socketID => {
  console.log('Joining room in FRONT:', socketID)
  socket.join(socketID)
});
// events.on('findOrCreateMatch', (ID) => {
//   console.log('user room ID is:', ID)
//   // socket.emit('findOrCreateMatch', ID);
//   socket.emit('JoinRoom', ID);
// })

export default socket
