const router = require('express').Router()
const { Room } = require('../db/models')
module.exports = router

// STARTS WITH :  '/api/room'
router.route('/matches')
    .post((req, res, next) => {
        Room.findOrCreate({
            where: {
                status: 'open',
                level: req.body.level
            }
        })
        .then(room => res.json(room))
        .catch(next)
    })
    .put((req,res,next) => {
        Room.findAll({
            where: {
                players: {
                    [Op.contains]: req.body.userId
                }
            }
        })
        .then(Room => {
            Room.update({
                status: req.body.status,
                winner: req.body.winner
            })
        })
    }



