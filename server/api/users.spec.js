/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Problem = db.model('problem')
// const agent = supertest.agent(app);


describe('User routes', () => {
  beforeEach(() => {
    //return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const AryaEmail = 'Arya@email.com'

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(AryaEmail)
        })
    })
  }) // end describe('/api/users')

  describe('/api/users/userId/profile', () => {

      it('GET /api/users/userId/profile', () => {
        return request(app)
            .get(`/api/users/${1}/profile`)
            .expect(200)
      })

      it('PUT /api/users/userId/profile', () => {
        request(app)
        .put(`/api/users/${1}/profile`)
        .send({
          name:'Sterling'
        })
        .then(() => {
          User.findOne({
            where:{
              name:'Sterling'
            }
          })
          .then(foundUser => {
            expect(foundUser).to.exist
          })
          .catch(e => console.log(e))
        })
      })
    })

  describe('/api/users/userId/problemHistory', () => {

        it('GET /api/users/userId/problemHistory', () => {
          return request(app)
              .get(`/api/users/${1}/problemHistory`)  //check this
              .expect(200)
        })
  })

  describe('/api/users/userId/problemAuthored', () => {
    
        it('GET /api/users/userId/problemAuthored', () => {
          return request(app)
              .get(`/api/users/${1}/problemAuthored`)  //check this
              .expect(200)
        })
  })

  describe('/api/users/userId/problemAuthored/problemId', () => {
    
        it('GET /api/users/userId/problemAuthored/problemId', () => {
          return request(app)
              .get(`/api/users/${1}/problemAuthored/${1}`)  //check this
              .expect(200)
        })
  })

  // describe('/api/users/userId/problemAuthored/problemId/delete', () => {
    
  //       it('DELETE /api/users/userId/problemAuthored/problemId/delete', () => {
  //         return request(app)
  //             .delete(`/api/users/${1}/problemAuthored/${1}/delete`)  //check this
  //             .then(() => {
  //               Problem.findOne({
  //                 where:{
  //                   id:1
  //                 }
  //               })
  //               .then(deletedProb => {
  //                 expect(deletedProb).to.not.exist
  //               })
  //               .then(() => {done()})
  //             })
  //       })
  // })

  describe('/api/users/userId/problemCreate', () => {
    
        xit('POST /api/users/userId/problemCreate', () => {
          request(app)
              .post(`/api/users/${1}/problemCreate`)
              .send({
                title:'TESTING',
                solution:'AGAIN',
                description:'MORE TESTING',
                level:3,
                testSpecs:['TESTSPECS'],
                signature:'SIG'
              })
              .then(() => {
                Problem.findOne({
                  where:{
                    title:'TESTING'
                  }
                })
              })
              .then(problem => {
                expect(problem).to.exist
              })
              .catch(e => console.log(e))  //check this
        })
  })

  describe('/api/users/setComplete', () => {
    
        xit('POST /api/users/setComplete', () => {
          request(app)
              .post(`/api/users/setComplete`)
              .send({
                userId:1,
                problemId:11,
                userSolution:'WORST SOLUTION EVER',
                points:1000
              })
              .then(() => {
                User.findOne({
                  where:{
                    points:1000
                  }
                })
              })
              .then(foundUser => {
                expect(foundUser).to.exist
              })
              .catch(e => console.log(e))  //check this
        })
  })
}) // end describe('User routes')



