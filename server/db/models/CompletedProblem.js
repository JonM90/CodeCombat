const Sequelize = require('sequelize')
const db = require('../db')

const CompletedProblem = db.define('completed_problem', {
  rating: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 10 }
  }
})

module.exports = CompletedProblem
