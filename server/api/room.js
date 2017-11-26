const router = require('express').Router()
const { Room } = require('../db/models')
module.exports = router

// STARTS WITH :  '/api/room'
router.route('/matches')
    .get( (req, res, next) => {
      Room.findOne({
        where: {
          status: 'open',
          level: req.user.rank
        }
      })
      .then(room => res.json(room))
    })
    .post((req, res, next) => {
      Room.create({
          roomId: req.body.roomId,
          playerHost: req.body.player1,
          level: req.body.level
      })
      .then(room => res.json(room))
      .catch(next)
    })
    .put((req, res, next) => {
        Room.findOne({
          where: {
            id: req.body.roomId
          }
        })
        .then(room => {
          console.log('ROOM TO UPDATE', room)
          return room.update({
            status: req.body.status,
            playerJoin: req.body.playerJoin
          })
        })
        .then(updatedRoom => res.json(updatedRoom))

        // let room = req.body.room
        // room.update({status: 'closed'})
        // .then(rm => {
        //   res.json(rm)
        // })
    })

