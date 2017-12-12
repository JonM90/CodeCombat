/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Problem = db.model('problem');
const Room = db.model('room')
// const CompletedProblem = db.model('CompletedProblem')

//Problem Specs
describe('Problem model', () => {
   beforeEach(() => {
     return db.sync({ force: true })
   })

   beforeEach(() => {
     let title, description, challenge; 
     
     return Problem.create({
         title: 'Sum',
         description: 'Find the sum',
         solution: 'sol',
         level: 2,
         testSpecs: ['testSPecs'],
         signature: 'signature'
      })
       .then(probelem => {
            challenge = probelem
       })
   })

   describe('Validation', () => {
      it('errors without title', () => {
          return Problem.build({
            description: 'Find the sum',
            solution: 'sol',
            level: 2,
            testSpecs: ['testSPecs'],
            signature: 'signature'
          }).validate()
              .catch(err => {
                expect(err);
              })
      })

      it('errors without description', () => {
        return Problem.build({
            title: 'Sum',
            solution: 'sol',
            level: 2,
            testSpecs: ['testSPecs'],
            signature: 'signature'
        }).validate()
            .catch(err => {
              expect(err);
            })
    })

    it('errors without solution', () => {
      return Problem.build({
        title: 'Sum',
        description: 'Find the sum',
        level: 2,
        testSpecs: ['testSPecs'],
        signature: 'signature'
      }).validate()
          .catch(err => {
            expect(err);
          })
     })

     it('errors without level', () => {
      return Problem.build({
        title: 'Sum',
        description: 'Find the sum',
        solution: 'sol',
        testSpecs: ['testSPecs'],
        signature: 'signature'
      }).validate()
          .catch(err => {
            expect(err);
          })
     })

     it('errors without testpecs', () => {
      return Problem.build({
        title: 'Sum',
        description: 'Find the sum',
        solution: 'sol',
        level: 2,
        signature: 'signature'
      }).validate()
          .catch(err => {
            expect(err);
          })
     })

     it('errors without signature', () => {
      return Problem.build({
        title: 'Sum',
        description: 'Find the sum',
        solution: 'sol',
        level: 2,
        testSpecs: ['testSPecs'],
      }).validate()
          .catch(err => {
            expect(err);
          })
     })

   })
   
})



