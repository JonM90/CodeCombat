const router = require('express').Router()
const {User, Problem, CompletedProblem} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.route('/:userId/profile')
.all ( (req, res, next) => {
  User.findById(req.params.userId)
  .then(user => {
    req.user = user;
    next()
  })
  .catch(next)
})
.get( (req, res, next) => {
  res.json(req.user)
  .catch(next)
})
.put((req, res, next) => {
  req.user.update(req.body)
  .then(updatedUser => res.json(updatedUser))
  .catch(next)
})


router.get('/:userId/problemHistory', (req, res, next) => {
  User.findById(+req.params.userId,
    {include:[{model: Problem}] })
  .then(completed => {
    res.json(completed.problems)
  })
  .catch(next)
})

router.get('/:userId/problemAuthored', (req, res, next) => {
  Problem.findAll({
    where:{
      authorId:req.params.userId
    }
  })
  .then(authoredProblems => res.json(authoredProblems))
  .catch(next)
})

router.get('/:userId/problemAuthored/:problemId', (req, res, next) => {
  Problem.findById(req.params.problemId)
  .then(prob => res.json(prob))
  .catch(next)
})

router.delete('/:userId/problemAuthored/:problemId/delete', (req, res, next) => {
  Problem.destroy({
    where:{
      authorId:req.params.userId,
      id:req.params.problemId
    }
  })
  .then(prob => console.log(prob))
  .catch(next)
})

router.post('/:userId/problemCreate', (req, res, next) => {
  Problem.create(req.body)
  .then(prob => res.json(prob))
  .catch(next)
})

