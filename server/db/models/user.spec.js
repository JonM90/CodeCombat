/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Problem = db.model('problem');
// const CompletedProblem = db.model('CompletedProblem')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          rank:5,
          points:80,
          isAdmin:false,
          battleWin:56,
          battleLoss:0
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')





//Problem Specs
// describe('Problem model', () => {
//    beforeEach(() => {
//      return db.sync({ force: true })
//    })

//    beforeEach(() => {
//      let title, description, challenge; 
     
//      return Problem.create({
//          title: 'Summ',
//          description: 'Find the sum',
//          solution: 'sol',
//          level: 2,
//          testSpecs: ['testSPecs'],
//          signature: 'signature'
//       })
//        .then(probelem => {
//             challenge = probelem
//        })
//    })

//    describe('Validation', () => {
//       it('errors without title', () => {
//           return Problem.build({}).validate()
//               .catch(err => {
//                 expect(err);
//               })
//       })

//       it('errors without description', () => {
//         return Problem.build({}).validate()
//             .catch(err => {
//               expect(err);
//             })
//     })

//     it('errors without solution', () => {
//       return Problem.build({}).validate()
//           .catch(err => {
//             expect(err);
//           })
//      })

//      it('errors without level', () => {
//       return Problem.build({}).validate()
//           .catch(err => {
//             expect(err);
//           })
//      })

//      it('errors without testpecs', () => {
//       return Problem.build({}).validate()
//           .catch(err => {
//             expect(err);
//           })
//      })

//      it('errors without signature', () => {
//       return Problem.build({}).validate()
//           .catch(err => {
//             expect(err);
//           })
//      })

//    })
   
// })


// describe('completed')


