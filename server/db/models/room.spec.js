/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Problem = db.model('problem');
const Room = db.model('room')
// const CompletedProblem = db.model('CompletedProblem')

describe('Room model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Validations', () => {

    it('errors if level is not between 1-10', () => {
      Room.build({
        roomId:123,
        level:11,
        status:'open',
        playerHost:2
      })
      .validate()
      .catch(err => {
				expect(err).to.exist;
			})
    })

    it('errors without playerHost', () => {
        Room.build({
            roomId:123,
            level:1,
            status:'open'
        })
      .validate()
      .catch(err => {
				expect(err).to.exist;
			})
    })
  })
})

