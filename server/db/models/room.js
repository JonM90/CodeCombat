const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  roomId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 10 }
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open'
  },
  players: {
      type: Sequelize.ARRAY(Sequelize.INTEGER), 
      allowNull: false
  },
  winner: {
      type: Sequelize.INTEGER,
      default: null
  }
})

module.exports = Room
