// import io from 'socket.io-client'
// // import {mssg} from './components/editor'
// import events from './components/editor'
// const socket = io(window.location.origin)

// socket.on('connect', () => {
//   console.log('Connected!')
// })
// events.on('userSubmit', (userFunc) => {
//   console.log('user submitted userFunc is:', userFunc)
//   socket.emit('userSubmit', userFunc);
// })
// socket.on('result',(outPut)=> {
//   console.log("SOCKET CONNECTED ",outPut)
//   events.emit("output", outPut);
// })

// export default socket


import io from 'socket.io-client'
// import {mssg} from './components/editor'
import events from './components/editor'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
events.on('userSubmit', (userFunc) => {
  console.log('user submitted userFunc is:', userFunc)
  socket.emit('userSubmit', userFunc);
})
socket.on('result',(outPut)=> {
  console.log("SOCKET CONNECTED ",outPut)
  events.emit("output", outPut);
})
socket.on('pass', (value) => {
  events.emit('pass', value)
})

export default socket
