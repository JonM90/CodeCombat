/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Problem = db.model('problem');
const Room = db.model('room')
const CompletedProblem = require('./CompletedProblem')

//Problem Specs
describe('CompletedProblem model', () => {
   beforeEach(() => {
     return db.sync({ force: true })
   })

   it('errors if rating is out of range', () => {
    CompletedProblem.build({
           rating:11,
           userSolution:'HI'
       })
       .validate()
       .catch(err => {
        expect(err);
      })
   })

   it('errors if no user solution', () => {
    CompletedProblem.build({
           rating:1
       })
       .validate()
       .catch(err => {
        expect(err);
      })
   })
})



