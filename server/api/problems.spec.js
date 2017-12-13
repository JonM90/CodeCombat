/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Problem = db.model('problem')
// const agent = supertest.agent(app);


describe('Problem routes', () => {

  describe('/api/problems/', () => {

    const sig = 'converter(temp)'
    it('GET /api/problems', () => {
      return request(app)
        .get('/api/problems')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].signature).to.be.equal(sig)
        })
    })
  }) // end describe('/api/problems')

  describe('/api/problems/problemId', () => {

    it('GET /api/problems/:problemId', () => {
        return request(app)
            .get(`/api/problems/${1}`)
            .expect(200)
            .then(res => {
                expect(res.body.signature).to.be.equal('converter(temp)')
            })
    })
  })

  describe('/api/problems/:problemId/solution', () => {

    it('GET /api/problems/problemId/solution', () => {
        return request(app)
            .get(`/api/problems/${1}/solution`)
            .expect(200)
            .then(res => {
                expect(res.body.solution).to.be.equal(
  `function converter(temp) {
      return (temp - 32) * 5/9;
    }`
                )
            })
    })
  })

  describe('/api/problems/level/:level', () => {

    it('GET /api/problems/level/:level', () => {
        return request(app)
            .get(`/api/problems/level/${1}`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body[0].level).to.be.equal(1)
            })
    })
  })
}) // end describe('User routes')



