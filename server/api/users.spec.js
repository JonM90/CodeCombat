/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

// const agent = supertest.agent(app);


describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')

    describe('/api/users/userId/profile', () => {
        
      beforeEach(() => {
          //const userId = 1;
      })

      it('GET /api/users/:userId/profile', () => {
        const userId = 1;
        return request(app)
            .get(`/api/users/${userId}/profile`)
            .expect(200)
      })
    })

    describe('/api/users/userId/problemHistory', () => {
      
        beforeEach(() => {
            //const userId = 1;
        })

        // it('GET /api/users/:userId/problemHistory', () => {
        //    const userId = 1;
        //   return request(app)
        //       .get(`/api/users/${userId}/problemHistory`) 
        //       .expect(200)
        //       .then(res => {
        //         expect(res.body).to.be.an('array')
        //       }) 
       // })
  })


  describe('/api/users/userId/problemAuthored', () => {
    
      beforeEach(() => {
          //const userId = 1;
      })

      it('GET /api/users/:userId/problemAuthored', () => {
        const userId = 1;
        return request(app)
            .get(`/api/users/${userId}/problemAuthored`)  
            .expect(200)
      })
   })

   describe('/api/users/userId/problemAuthored/problemId', () => {
    
      beforeEach(() => {
          //const userId = 1;
      })

      it('GET /api/users/:userId/problemAuthored/:problemId', () => {
        const userId = 1;
        const problemId = 2;
        return request(app)
            .get(`/api/users/${userId}/problemAuthored/${problemId}`)  
            .expect(200)
      })
   })

   describe('/api/users/userId/problemAuthored/problemId/delete', () => {
    
      beforeEach(() => {
          //const userId = 1;
      })

      // it('DELETE problem with userId AND problemId', () => {
      //   const userId = 1;
      //   return request(app)
      //       .get(`/api/users/${userId}/problemAuthored/${1}/delete`)  
      //       .expect(404)
      // })
   })

   describe('/api/users/userId/problemCreate', () => {
    
      beforeEach(() => {
          //const userId = 1;
      })

      // it('POST problem to /api/users/userId/problemCreate', () => {
      //   const userId = 1;
      //   return request(app)
      //       .get(`/api/users/${userId}/problemCreate`)  
      //       .expect(404)
      // })
   })


}) // end describe('User routes')



