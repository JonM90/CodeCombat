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

  describe('Validations', () => {

    it('errors without password', () => {
      User.build({
        email:'hi@email.com',
        name:'Hi Bye'
      })
      .validate()
      .catch(err => {
				expect(err).to.exist;
			})
    })

    it('errors without email', () => {
      User.build({
        password:'hiCommma',
        name:'Hi Bye'
      })
      .validate()
      .catch(err => {
				expect(err).to.exist;
			})
    })
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
