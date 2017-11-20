import io from 'socket.io-client'
// import {mssg} from './components/editor'
import events from './components/editor'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
events.on('mssg', (pLoad) => {
  console.log('pLoad!:', pLoad)
  socket.emit('mssg', pLoad);
})
socket.on('console',(outPut)=> {
  console.log("SOCKET CONNECTED MOTHERFUCKERS!!!",outPut)
  events.emit("output", outPut);
})

export default socket
