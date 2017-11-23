const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  level: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 10 }
  },
  solution: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  testSpecs: {
      type: Sequelize.ARRAY(Sequelize.TEXT), //change later
      allowNull: false
  },
  signature: {
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports = Problem
