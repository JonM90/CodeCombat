const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  roomId: {
    type: Sequelize.STRING,
  },
  level: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 10 }
  },
  questId: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    defaultValue: 'open'
  },
  playerHost: {
    type: Sequelize.INTEGER
  },
  playerJoin: {
    type: Sequelize.INTEGER
  },
  winner: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Room
