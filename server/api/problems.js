const router = require('express').Router()
const {Problem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Problem.findAll({
    attributes: {
        exclude: ['solution', 'testSpecs']
    }
  })
    .then(problems => res.json(problems))
    .catch(next)
})

router.get('/:problemId', (req, res, next) => {
    Problem.findById(req.params.problemId,
        {attributes: {
            exclude: ['solution']
        }})
    .then(prob => res.json(prob))
    .catch(next)
})

router.get('/:problemId/solution', (req, res, next) => {
    Problem.findById(req.params.problemId,
        {attributes: {
            exclude: ['title', 'description', 'level']
        }})
    .then(prob => res.json(prob))
    .catch(next)
})

router.get('/level/:level', (req, res, next) => {
    Problem.findAll({
        where: {
            level: req.params.level
        }
    })
    .then(problems => res.json(problems))
    .catch(next)
})

