/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Problem, CompletedProblem} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'Jack@email.com', password: '123', name: 'Samurai Jack', isAdmin: false}),
    User.create({email: 'Jonathan@email.com', password: '123', name: 'Jonathan', isAdmin: false})
  ])

  const problems = await Promise.all([
    Problem.create({title: 'Sum', level: 1, description: 'Find sum', solution: '(a,b)=> a+b', testSpecs: ['sum(1,2) === 3', 'sum(2,2) === 4'], authorId: 1}),
    Problem.create({title: 'Diff', level: 1, description: 'Find difference', solution: '(a,b)=> a-b', testSpecs: ['diff(1,2) === -1', 'diff(2,1) === 1'], authorId: 2})
  ])

  const complete = await Promise.all([
    CompletedProblem.create({rating: 4, userId: 1, problemId: 2}),
    CompletedProblem.create({rating: 3, userId: 2, problemId: 1})
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${complete.length} completed problems`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
