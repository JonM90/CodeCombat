const {VM} = require('vm2');

/*************ORIGINAL***********************************************
      // var runner = function(usersFunc) {
        //   console.log('USERFUNC in Runner', usersFunc)
        //   console.log('***RIGHT BEFORE VM RUN', `
        //   ${usersFunc}
        //   `)
        //   return vmThree.run(`${usersFunc}`) }
        // module.exports = runner;
/*************ORIGINAL*********************************************
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
        console.log("NEW VM INSTANCE")
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
                arr.push(`${sliced}: PASSED `)
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
          arr,
          // error ? `${error.spec} failed with ${error.message}` : arr.join(","),
          log,
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
