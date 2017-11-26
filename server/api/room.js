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
        // Room.findOne({
        //   where: {
        //     status: 'open',
        //     level: req.user.rank
        //     players: {
        //       [Op.contains]: req.body.userId
        //     }
        //   }
        // })
        console.log('REQ.BODY.ROOM', req.body.room)
        let room = req.body.room
        room.update(req.body)
        .then(rm => {
          res.json(rm)
        })
    })

