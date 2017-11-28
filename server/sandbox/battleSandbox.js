const {VM} = require('vm2');

//*************ORIGINAL***********************************************
  function wrap(functionName, userCode) {
    return [userCode, `__test__(${functionName})`].join(';')
  }
  /**
   * @param {String} userFunc
   * @param {Array<String>} specs
   */
  var runnerONE = function(userFunc, specs){
    console.log('this is specs in beginning:', specs)
    console.log('IM VM ONE MOTHERFUCKERS');
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
    return [arr, log, pass]
      //.join('\n'),
      // error ? `${error.spec} failed with ${error.message}` : arr.join(","),
    //   log,
    //   //.join('\n'),
    //   pass
    // ]
    // return log
    // const wrappedCode = wrap('hello', userFunc)
    // console.log('*** wrappedCode:', wrappedCode)
    // console.log('tester vmThree is: ', vmThree.run(wrappedCode))
  }
  var runnerTWO = function(userFunc, specs){
    console.log('this is specs in beginning:', specs)
    console.log('IM ONLY VM TWO :(')
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
      return [arr, log, pass]
    // return log
    // const wrappedCode = wrap('hello', userFunc)
    // console.log('*** wrappedCode:', wrappedCode)
    // console.log('tester vmThree is: ', vmThree.run(wrappedCode))
  }

  module.exports = {
    runnerONE,
    runnerTWO
  };
