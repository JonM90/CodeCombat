const RUN = require('../sandbox/sandbox');
const {User} = require('../db/models');
const {runnerONE, runnerTWO} = require('../sandbox/battleSandbox');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('userSubmit', (usersFunc) => {
      var outPut = RUN(usersFunc[0], usersFunc[1])

      console.log('********this is outPut in socket/index.js:', outPut);
      socket.emit('result', outPut.slice(0, 2))
      socket.emit('pass', outPut[2], usersFunc[0])
    })

    socket.on('joinRoom', roomId => {
      socket.join(roomId)
      setTimeout(() => {
        console.log(`joined room: ${roomId}`)
        let myRoom = socket.rooms
        console.log('SOCKET SERVER MY ROOM', myRoom)
      }, 3000)

      io.in(roomId).emit('mssg', 'Hyaa!');
    });

    socket.on('battleSubmit', (usersFunc) => {
      if (usersFunc[2] === 'host') {
        var outPutOne = runnerONE(usersFunc[0], usersFunc[1])
        socket.emit('battleResult', outPutOne.slice(0, 2))
        socket.emit('battlePass', outPutOne[2])
        console.log('********this is outPutONE in socket/index.js:', outPutOne);
      } else if (usersFunc[2] === 'guest') {
        var outPutTwo = runnerTWO(usersFunc[0], usersFunc[1])
        socket.emit('battleResult', outPutTwo.slice(0, 2))
        socket.emit('battlePass', outPutTwo[2])
        console.log('********this is outPutTWO in socket/index.js:', outPutTwo);
      }
      console.log('playerTYPE:', usersFunc[2])
    })

    socket.on('p2PendingSetup', (msg, p1Total, p1Socket) => {
      socket.broadcast.emit('p1SubmitFinish', msg, p1Total, p1Socket)
    })

    socket.on('determineWinner', (winner, roomId) => {
      console.log('BACKEND WINNER', winner)
      // socket.to(roomId).emit('foundWinner', winner)
      io.in(roomId).emit('foundWinner', winner);
    })

    socket.on('updateWin', (userId, points) => {
      User.findById(+userId)
      .then(user => {
        let newPoints = user.points + points
        console.log('USERID', userId, 'points:', points, 'newPts:', newPoints)
        let newC = user.battleWin + 1
        user.update({battleWin: newC, points: newPoints})
      })
    })

    socket.on('updateLoss', (userId, points) => {
      User.findById(+userId)
      .then(user => {
        let newPoints = user.points - points
        console.log('USERID', userId, 'points:', points, 'newPts:', newPoints)
        let newC = user.battleLoss + 1
        user.update({battleLoss: newC, points: newPoints})
      })
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
