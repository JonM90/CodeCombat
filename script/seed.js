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
<<<<<<< HEAD
    User.create({email: 'Jack@email.com', password: '123', name: 'Samurai Jack', isAdmin: false, rank: 1, points: 5}),
    User.create({email: 'Jonathan@email.com', password: '123', name: 'Jonathan', isAdmin: false, rank: 1, points: 0})
=======
    User.create({name: 'Samurai Jack', email: 'Jack@email.com', password: '123', rank: 1, score: 0, isAdmin: false}),
    User.create({name: 'Jonathan', email: 'Jonathan@email.com', password: '123', rank: 2, score: 0, isAdmin: false})
>>>>>>> master
  ])
//CHANGE REST OF TESTSPECS TO MATCH BOTTOM ONES
  const problems = await Promise.all([
    Problem.create({title: 'Sum', level: 1, description: 'Return the sum of two numbers', solution: '(a,b)=> a+b', testSpecs: ['sum(1,2) === 3', 'sum(2,2) === 4'], authorId: 1}),
    Problem.create({title: 'Diff', level: 1, description: 'Return the difference of two numbers', solution: '(a,b)=> a-b', testSpecs: ['diff(1,2) === -1', 'diff(2,1) === 1'], authorId: 2}),
<<<<<<< HEAD
    Problem.create({title: 'FizzBuzz', level: 1, description: 'Write a function that accepts a single number as an argument. Return “Fizz” for any numbers that are divisible by 3, “Buzz” for any numbers that are divisible by 5, and “FizzBuzz” for any numbers divisible by both 3 and 5. Else, return false', solution: `function fizzBuzz(num){
        if (num%15 === 0) {
          return “FizzBuzz”;
        } else if (num%5 === 0) {
          return “Buzz”;
        } else if (num%3 === 0) {
          return “Fizz”;
=======
    Problem.create({title: 'FizzBuzz', level: 2, description: 'Write a function that accepts a single number as an argument. Return "Fizz" for any numbers that are divisible by 3, "Buzz" for any numbers that are divisible by 5, and "FizzBuzz" for any numbers divisible by both 3 and 5. Else, return false', solution: `function fizzBuzz(num){
        if (num%15 === 0) {
          return "FizzBuzz";
        } else if (num%5 === 0) {
          return "Buzz";
        } else if (num%3 === 0) {
          return "Fizz";
>>>>>>> master
        } else {
          return false;
        }
      }
    `, testSpecs: ['FizzBuzz(15) === "FizzBuzz"', 'FizzBuzz(3) === "Buzz"', 'FizzBuzz(5) === "Fizz"','FizzBuzz(12) === "Fizz"' ], authorId: 1}),
<<<<<<< HEAD
    Problem.create({title: 'bactrianCase', level: 1, description: 'write a function bactrianCase that accepts a single string as an argument. The function should log out that string with every other letter capitalized.', solution: `function bactrianCase(str) {
      var newString = '';
    
=======
    Problem.create({title: 'bactrianCase', level: 3, description: 'write a function bactrianCase that accepts a single string as an argument. The function should log out that string with every other letter capitalized.', solution: `function bactrianCase(str) {
      var newString = '';

>>>>>>> master
      for(var i=0; i<str.length; i++) {
        if (i%2 === 0) {
          newString += str[i].toUpperCase();
        } else {
          newString += str[i];
        }
      }
<<<<<<< HEAD
    
      return newString;
    }`, testSpecs: ['bactrianCase("hello") === "HeLlO"', 'bactrianCase("stephanie") === "StEpHaNiE"', 'bactrianCase("fullstack") === "FuLlStAcK"'], authorId: 2}),
    Problem.create({title: 'exponentiate', level: 1, description: 'Write a function exponentiate that accepts a number and a power to raise that number to. For the present, assume the power argument will always be a positive integer value.', solution: `function exponentiate(base, power) {
      var expResult = 1;
    
     for (var i=0; i<power; i++) {
        expResult *= base;
      }
    
     return expResult;
    }`, testSpecs: ['assert.equal(exponentiate(1,1), 1)', 'assert.equal(exponentiate(3,3), 27)', 'assert.equal(exponentiate(6,7), 279936)' ], authorId: 2}),
    Problem.create({title: 'mostVowels', level: 1, description: 'Write a function that accepts a string and returns the word from that string with the most vowels. If there are no words with strings, return the empty string.', solution: `function mostVowels(str) {
      var vowels = “aeiou”;
      var wordsArr = str.split(” “);
      var leadWord = “”;
      var mostVowels = 0;
    
=======

      return newString;
    }`, testSpecs: ['bactrianCase("hello") === "HeLlO"', 'bactrianCase("stephanie") === "StEpHaNiE"', 'bactrianCase("fullstack") === "FuLlStAcK"'], authorId: 2}),
    Problem.create({title: 'exponentiate', level: 4, description: 'Write a function exponentiate that accepts a number and a power to raise that number to. For the present, assume the power argument will always be a positive integer value.', solution: `function exponentiate(base, power) {
      var expResult = 1;

     for (var i=0; i<power; i++) {
        expResult *= base;
      }

     return expResult;
    }`, testSpecs: ['assert.equal(exponentiate(1,1), 1)', 'assert.equal(exponentiate(3,3), 27)', 'assert.equal(exponentiate(6,7), 279936)' ], authorId: 2}),
    Problem.create({title: 'mostVowels', level: 4, description: 'Write a function that accepts a string and returns the word from that string with the most vowels. If there are no words with strings, return the empty string.', solution: `function mostVowels(str) {
      var vowels = "aeiou";
      var wordsArr = str.split(" ");
      var leadWord = "";
      var mostVowels = 0;

>>>>>>> master
     for (var i=0; i<wordsArr.length; i++) {
        var word = wordsArr[i];
        var vowelCount = 0;
        for (var j=0; j<word.length; j++) {
          if (vowels.indexOf(word[j]) !== -1) {
            vowelCount += 1;
          }
        }
        if (vowelCount > mostVowels) {
          mostVowels = vowelCount;
          leadWord = word;
        }
      }
<<<<<<< HEAD
    
     return leadWord;
    }`, testSpecs: ['assert.equal(mostVowels("I am a keeper with some real rhythms"), "keeper")', 'assert.equal(mostVowels("Tenacious Tony Trains Today, Tomorrow Till The Time Ticks"), "Tenacious")'], authorId: 1})
    
    ])
=======

     return leadWord;
    }`, testSpecs: ['assert.equal(mostVowels("I am a keeper with some real rhythms"), "keeper")', 'assert.equal(mostVowels("Tenacious Tony Trains Today, Tomorrow Till The Time Ticks"), "Tenacious")'], authorId: 1})
  ])
>>>>>>> master

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
