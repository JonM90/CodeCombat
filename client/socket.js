import io from 'socket.io-client'
import {events} from './components/editor'
import {battleEvents} from './components/BattleEditor'
const socket = io(window.location.origin)

socket.on('connect', () => {
  // console.log(`A socket connection has been made: ${socket.id}`)
})

events.on('userSubmit', (userFunc) => {
  socket.emit('userSubmit', userFunc)
})
socket.on('result', (outPut) => {
  events.emit('output', outPut)
})
socket.on('pass', (value) => {
  events.emit('pass', value)
})

socket.on('mssg', (msg) => {
  // console.log(`${msg} I'M READY!`)
})
battleEvents.on('battleSubmit', (userFunc) => {
  socket.emit('battleSubmit', userFunc);
})
socket.on('battleResult', (outPut) => {
  battleEvents.emit('battleOutput', outPut);
})
socket.on('battlePass', (value) => {
  battleEvents.emit('battlePass', value)
})
battleEvents.on('p1Submit', (total)=> {
  // battleEvents.emit('p2Pending', 'AWAITING PLAYER TWO SUBMISSION', total, socket.id)
  socket.emit('p2PendingSetup', 'AWAITING PLAYER TWO SUBMISSION', total, socket.id)
})
battleEvents.on('p2Submit', (opponentTotal, p2Total, p1Socket, roomId) => {
  // console.log(`OPPONENT: ${p1Socket}, TIME: ${opponentTotal} vs PLAYER2: ${socket.id} TIME: ${p2Total}`)
  let winner = opponentTotal < p2Total ? [p1Socket, opponentTotal] : [socket.id, p2Total]
  socket.emit('determineWinner', winner, roomId)
})
socket.on('p1SubmitFinish', (msg, p1Total, p1Socket) => {
  battleEvents.emit('p2Pending', msg, p1Total, p1Socket)
})
socket.on('foundWinner', (winner) => {
  // console.log('FOUND WINNER*********', winner)
  battleEvents.emit('determineWinner', winner)
})
battleEvents.on('updateWin', (userId, points) => {
  socket.emit('updateWin', userId, points)
})
battleEvents.on('updateLoss', (userId, points) => {
  socket.emit('updateLoss', userId, points)
})

export default socket
