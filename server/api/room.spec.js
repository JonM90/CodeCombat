/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Problem = db.model('problem')
const Room = db.model('room')
// const agent = supertest.agent(app);


describe('Room routes', () => {

  describe('/api/room/matches/', () => {
    //NEED TO CHANGE ROOM ROUTE TO REQ.BODY.USER.RANK
    xit('GET /api/room/matches', () => {
      return request(app)
        .get('/api/room/matches')
        .send({
            'user':{
                'rank':1
            }
        })
        .expect(200)
        .then(res => {
          expect(res.body.status).to.be.equal('open')
        })
    })

    it('POST /api/room/matches', () => {
        return request(app)
            .post('/api/room/matches')
            .send({
                roomId:1000,
                playerHost:{name:'HI'},
                level:1
            })
            .expect(200)
    })

    it('PUT /api/room/matches', () => {
        return request(app)
            .put('/api/room/matches')
            .send({
                roomId:1
            })
            .expect(200)
    })
  }) // end describe('/api/room')
}) // end describe('User routes')



