const RUN = require('../sandbox/sandbox');
const {runnerONE, runnerTWO} = require('../sandbox/battleSandbox');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('userSubmit', (usersFunc) => {
      var outPut = RUN(usersFunc[0], usersFunc[1])

      console.log('********this is outPut in socket/index.js:', outPut);
      console.log('END!');
      socket.emit('result', outPut.slice(0, 2))
      socket.emit('pass', outPut[2], usersFunc[0])
    })
    socket.on('battleSubmit', (usersFunc) => {
      if (usersFunc[2] === 'host') {
        var outPutOne = runnerONE(usersFunc[0], usersFunc[1])
        socket.emit('result', outPutOne.slice(0, 2))
        socket.emit('pass', outPutOne[2])
        console.log('********this is outPutONE in socket/index.js:', outPutOne);
      } else if (usersFunc[2] === 'guest') {
        var outPutTwo = runnerTWO(usersFunc[0], usersFunc[1])
        socket.emit('result', outPutTwo.slice(0, 2))
        socket.emit('pass', outPutTwo[2])
        console.log('********this is outPutTWO in socket/index.js:', outPutTwo);
      }
      console.log('playerTYPE:', usersFunc[2])
    })

    socket.on('joinRoom', roomId => {
      console.log('In joinRoom:', roomId)
      socket.join(roomId)
      setTimeout(() => {
        console.log(`joined room: ${roomId}`)
        let myRoom = socket.rooms
        console.log('SOCKET SERVER MY ROOM', myRoom)
      }, 3000)

      io.in(roomId).emit('mssg', 'Hyaa!');
    });

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })

}

//OLD Vs

// console.log('MESSAGE!!!', message)
// var outPut = vmThree.run(`
// let addCat = (str) => str + 'cat';
// addCat("fat")
// `)
// var outPut = vmThree.run(`${message}`)
// console.log('TEST!');
// console.log(outPut);
// console.log('END!');

// io.on('connection', socket => {
// 	console.log(`Welcome new socket: ${socket.id}`);
// 	console.log("im the io", io)
// 	if(inMemoryDrawHistory.length) {
// 		console.log("gonna load", inMemoryDrawHistory)
// 		socket.emit('load', inMemoryDrawHistory)
// 	}

// 	socket.on('draw', (start, end, color) => {
// 		inMemoryDrawHistory.push({start, end, color});
// 		socket.broadcast.emit('draw', start, end, color)
// 	})

// 	socket.on('disconnect', () => {
// 		console.log(`Goodbye old friend: ${socket.id}`);
// 	})
// });

// // const {VM} = require('vm2');
// // var log3 = [], err3 = [];
// // var vmThree = new VM({
// //   sandbox: {
// //     console: {
// //       log(...args) {
// //         log3.push({args: args, at: new Error().stack})
// //       },
// //       error(...args) {
// //         err3.push(args)
// //       }
// //     }
// //   }
// // })
// // let message;
// const run = require('../sandbox/sandbox');

// module.exports = (io) => {
//   io.on('connection', (socket) => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)

//     socket.on('userSubmit', (usersFunc) => {

//       var outPut = run(usersFunc[0], usersFunc[1])

//       console.log("********this is outPut in socket/index.js:",outPut);
//       console.log('END!');
//       socket.emit('result', outPut)
//     })

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })


//   })
// }

// // console.log('MESSAGE!!!', message)
// // var outPut = vmThree.run(`
// // let addCat = (str) => str + 'cat';
// // addCat("fat")
// // `)
// // var outPut = vmThree.run(`${message}`)
// // console.log('TEST!');
// // console.log(outPut);
// // console.log('END!');

// // io.on('connection', socket => {
// // 	console.log(`Welcome new socket: ${socket.id}`);
// // 	console.log("im the io", io)
// // 	if(inMemoryDrawHistory.length) {
// // 		console.log("gonna load", inMemoryDrawHistory)
// // 		socket.emit('load', inMemoryDrawHistory)
// // 	}

// // 	socket.on('draw', (start, end, color) => {
// // 		inMemoryDrawHistory.push({start, end, color});
// // 		socket.broadcast.emit('draw', start, end, color)
// // 	})

// // 	socket.on('disconnect', () => {
// // 		console.log(`Goodbye old friend: ${socket.id}`);
// // 	})
// // });
