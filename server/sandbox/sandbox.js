// // import {VM} from 'vm2'
// // import {EventEmitter} from 'events'
// // const {EventEmitter} = require('events');
// // const socket = require('../client/socket')
// // const events = new EventEmitter()
// // export default events

// // module.exports = {
// //   events,
// //   mssg
// // }

// // function mssg(msg, shouldBroadcast = true) {
//   //   // If shouldBroadcast is truthy, we will emit an event to listeners w. msg
// //   shouldBroadcast &&
// //       events.emit('mssg', msg);
// // }
// //at: new Error().stack}
// // var log3 = [], err3 = [];

// //.run('console.log("hi")')
// // log
// // console.log(log3)
// // => [ [ 'hi' ],
// //     { args: [ 'hi' ],
// //       at: 'Error\n    at Object.log (repl:1:70)\n    at Object.apply (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/contextify.js:288:34)\n    at vm.js:1:9\n    at ContextifyScript.Script.runInContext (vm.js:59:29)\n    at VM.run (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/main.js:212:72)\n    at repl:1:134\n    at ContextifyScript.Script.runInThisContext (vm.js:50:33)\n    at REPLServer.defaultEval (repl.js:240:29)\n    at bound (domain.js:301:14)\n    at REPLServer.runBound [as eval] (domain.js:314:12)' } ]

// // var log4 = [], err4 = [];

// // var vmFour = new VM({
//   //   sandbox: {
//     //     log: [],
// //     console: {
//   //       log(...args) {
// //         log.push({args: args, at: new Error().stack})
// //       },
// //       error(...args) {
// //         err.push(args)
// //       }
// //     }
// //   }
// // })


// // var outPut = vmThree.run(`
// // let addCat = (str) => str + 'cat';
// // addCat("fat")
// // `)

// // console.log('TEST!');
// // console.log(outPut);
// // console.log('END!');
// // *************ORIGINAL***********************************************
// const {VM} = require('vm2');

//   // *************ORIGINAL***********************************************

//   // ************************************************************
//   // const {VM} = require('vm2')
//   // var v = new VM({
//     //   sandbox: {
//       //     __test__: require('./testSpecs')
//       //   }
//       // })

//       // *************ORIGINAL***********************************************

//       // var runner = function(usersFunc) {
//         //   console.log('USERFUNC in Runner', usersFunc)
//         //   console.log('***RIGHT BEFORE VM RUN', `
//         //   ${usersFunc}
//         //   `)

//         //   return vmThree.run(`${usersFunc}`)

//         // }

//         // module.exports = runner;
//         // *************ORIGINAL***********************************************

//       // let userSubmittedCode;

//       function wrap(functionName, userCode) {
//         return [userCode, `__test__(${functionName})`].join(';')
//       }
//       // function run(functionName, userCode) {
//       //   return userCode + `${functionName}(5)`
//       // }

//       /**
//        *
//        * @param {String} userFunc
//        * @param {Array<String>} specs
//        */
//       var runner = function(userFunc, specs){
//         console.log('this is specs in beginning:',specs)
//         const log = []
//         var vm = new VM({
//           timeout: 1000,
//           sandbox: {
//             assert: require('assert'),
//             console: {
//               log: function(...args) {
//                 log.push(args)
//               }//,
//               // error(...args) {
//                 //   // err3.push(args)
//                 // }
//               }
//             }
//           })
//         // Run the user's code in the VM. This should declare
//         // the functions they need to write.
//         let error = null
//         let spec
//         let arr = [];

//         vm.run(userFunc)

//             for (spec of specs){
//               console.log("LOOPING SPEC",spec)
//               let sliced = spec.slice(13,spec.length-1)

//               try {

//                 vm.run(spec)
//                 arr.push(`${sliced}: PASSED` )
//               }
//               catch(ex) {

//                 error = ex
//                 error.spec = spec

//                 arr.push(`${sliced}: FAILED` )
//                 console.log('error in catch',error)
//                 // vm.run(`console.log("TRY AGAIN, DON'T GIVE UP!")`)
//               }

//             }
//         // try {
//         //   for (spec of specs){
//         //     console.log("LOOPING SPEC",spec)
//         //     vm.run(spec)

//         //   }

//         // } catch(ex) {

//         //   error = ex
//         //   error.spec = spec
//         //   console.log('error in catch',error)
//         //   vm.run(`console.log("catch(ex): Did not pass specs")`)
//         // }
//         return [
//           arr.join("\n"),
//           // error ? `${error.spec} failed with ${error.message}` : arr.join(","),
//           log.join('\n')
//         ]
//         // return log
//         // const wrappedCode = wrap('hello', userFunc)

//         // console.log('*** wrappedCode:', wrappedCode)

//         // console.log('tester vmThree is: ', vmThree.run(wrappedCode))


//         // return vmThree.run(`${userFunc}`)
//         // return vmThree.run('hello', userFunc))


//       }
//       module.exports = runner;



//       // ************************************************************
//       // const vm = new VM({
//         //     timeout: 1000,
//         //     sandbox: {}
//         // });
// // var vm = new VM
// //VM PROPERTIES
// // => VM {
// //   domain:
// //    Domain {
// //      domain: null,
// //      _events: { error: [Function: debugDomainError] },
// //      _eventsCount: 1,
// //      _maxListeners: undefined,
// //      members: [] },
// //   _events: {},
// //   _eventsCount: 0,
// //   _maxListeners: undefined,
// //   options: { timeout: undefined, sandbox: null, compiler: 'javascript' },
// //   _context:
// //    { VMError: [Function: VMError],
// //      Buffer:
// //       { [Function: Buffer]
// //         poolSize: 8192,
// //         from: [Function],
// //         alloc: [Function],
// //         allocUnsafe: [Function],
// //         allocUnsafeSlow: [Function],
// //         isBuffer: [Function: isBuffer],
// //         compare: [Function: compare],
// //         isEncoding: [Function],
// //         concat: [Function],
// //         byteLength: [Function: byteLength],
// //         [Symbol(node.isEncoding)]: [Function] } } }

// // export function draw(start, end, strokeColor='black', shouldBroadcast=true) {
// //   // Draw the line between the start and end positions
// //   // that is colored with the given color.
// //   ctx.beginPath();
// //   ctx.strokeStyle = strokeColor;
// //   ctx.moveTo(...start);
// //   ctx.lineTo(...end);
// //   ctx.closePath();
// //   ctx.stroke();

// //   // If shouldBroadcast is truthy, we will emit a draw event to listeners
// //   // with the start, end and color data.
// //   shouldBroadcast &&
// //       events.emit('draw', start, end, strokeColor);

// // };

// import {VM} from 'vm2'
// import {EventEmitter} from 'events'
// const {EventEmitter} = require('events');

// const events = new EventEmitter()
// export default events

// module.exports = {
//   events,
//   mssg
// }

// function mssg(msg, shouldBroadcast = true) {
  //   // If shouldBroadcast is truthy, we will emit an event to listeners w. msg
//   shouldBroadcast &&
//       events.emit('mssg', msg);
// }
//at: new Error().stack}
// var log3 = [], err3 = [];

//.run('console.log("hi")')
// log
// console.log(log3)
// => [ [ 'hi' ],
//     { args: [ 'hi' ],
//       at: 'Error\n    at Object.log (repl:1:70)\n    at Object.apply (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/contextify.js:288:34)\n    at vm.js:1:9\n    at ContextifyScript.Script.runInContext (vm.js:59:29)\n    at VM.run (/Users/jonathanmartinez/Documents/Fullstack/Immersive/capStone/node_modules/vm2/lib/main.js:212:72)\n    at repl:1:134\n    at ContextifyScript.Script.runInThisContext (vm.js:50:33)\n    at REPLServer.defaultEval (repl.js:240:29)\n    at bound (domain.js:301:14)\n    at REPLServer.runBound [as eval] (domain.js:314:12)' } ]

// var log4 = [], err4 = [];

// var vmFour = new VM({
  //   sandbox: {
    //     log: [],
//     console: {
  //       log(...args) {
//         log.push({args: args, at: new Error().stack})
//       },
//       error(...args) {
//         err.push(args)
//       }
//     }
//   }
// })


// var outPut = vmThree.run(`
// let addCat = (str) => str + 'cat';
// addCat("fat")
// `)

// console.log('TEST!');
// console.log(outPut);
// console.log('END!');
// *************ORIGINAL***********************************************
const {VM} = require('vm2');

  // *************ORIGINAL***********************************************

  // ************************************************************
  // const {VM} = require('vm2')
  // var v = new VM({
    //   sandbox: {
      //     __test__: require('./testSpecs')
      //   }
      // })

      // *************ORIGINAL***********************************************

      // var runner = function(usersFunc) {
        //   console.log('USERFUNC in Runner', usersFunc)
        //   console.log('***RIGHT BEFORE VM RUN', `
        //   ${usersFunc}
        //   `)

        //   return vmThree.run(`${usersFunc}`)

        // }

        // module.exports = runner;
        // *************ORIGINAL***********************************************

      // let userSubmittedCode;

      function wrap(functionName, userCode) {
        return [userCode, `__test__(${functionName})`].join(';')
      }
      // function run(functionName, userCode) {
      //   return userCode + `${functionName}(5)`
      // }

      /**
       *
       * @param {String} userFunc
       * @param {Array<String>} specs
       */
      var runner = function(userFunc, specs){
        console.log('this is specs in beginning:', specs)
        const log = []
        var vm = new VM({
          timeout: 1000,
          sandbox: {
            assert: require('assert'),
            console: {
              log: function(...args) {
                log.push(args)
              }//,
              // error(...args) {
                //   // err3.push(args)
                // }
              }
            }
          })
        // Run the user's code in the VM. This should declare
        // the functions they need to write.
        let error = null
        let spec
        let arr = [];
        let pass = true
        vm.run(userFunc)

            for (spec of specs){
              console.log("LOOPING SPEC", spec)
              let sliced = spec.slice(13, spec.length - 1)

              try {

                vm.run(spec)
                arr.push(`${sliced}: PASSED` )
              }
              catch (ex) {
                pass = false
                error = ex
                error.spec = spec

                arr.push(`${sliced}: FAILED` )
                console.log('error in catch', error)
                // vm.run(`console.log("TRY AGAIN, DON'T GIVE UP!")`)
              }

            }

        return [
          arr.join('\n'),
          // error ? `${error.spec} failed with ${error.message}` : arr.join(","),
          log.join('\n'),
          pass
        ]
        // return log
        // const wrappedCode = wrap('hello', userFunc)

        // console.log('*** wrappedCode:', wrappedCode)

        // console.log('tester vmThree is: ', vmThree.run(wrappedCode))


        // return vmThree.run(`${userFunc}`)
        // return vmThree.run('hello', userFunc))


      }
      module.exports = runner;


// ************************************************************
//VM PROPERTIES
// => VM {
//   domain:
//    Domain {
//      domain: null,
//      _events: { error: [Function: debugDomainError] },
//      _eventsCount: 1,
//      _maxListeners: undefined,
//      members: [] },
//   _events: {},
//   _eventsCount: 0,
//   _maxListeners: undefined,
//   options: { timeout: undefined, sandbox: null, compiler: 'javascript' },
//   _context:
//    { VMError: [Function: VMError],
//      Buffer:
//       { [Function: Buffer]
//         poolSize: 8192,
//         from: [Function],
//         alloc: [Function],
//         allocUnsafe: [Function],
//         allocUnsafeSlow: [Function],
//         isBuffer: [Function: isBuffer],
//         compare: [Function: compare],
//         isEncoding: [Function],
//         concat: [Function],
//         byteLength: [Function: byteLength],
//         [Symbol(node.isEncoding)]: [Function] } } }
