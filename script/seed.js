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
    User.create({name: 'Samurai Jack', email: 'Jack@email.com', password: '123', rank: 2, score: 0, isAdmin: false, profileImage:'http://img.sharetv.com/shows/characters/thumbnails/samurai_jack.samurai_jack.jpg'}),
    User.create({name: 'Jonathan', email: 'Jonathan@email.com', password: '123', rank: 2, score: 0, isAdmin: false})
  ])
//CHANGE REST OF TESTSPECS TO MATCH BOTTOM ONES
  const problems = await Promise.all([
    Problem.create({title: 'Sum', level: 1, description: 'Return the sum of two numbers', solution: 'function sum(a,b){ return a+b }', testSpecs: ['assert.equal(sum(1,2), 3)', 'assert.equal(sum(4,2), 6)'], authorId: 1, signature:'sum(a, b)'}),
    Problem.create({title: 'Difference', level: 1, description: 'Return the difference of two numbers', solution: 'function diff(a,b){ return a-b} ', testSpecs: ['assert.equal(diff(1,2), -1)', 'assert.equal(diff(5,2), 3)'], authorId: 2, signature:'diff(a, b)'}),
    Problem.create({title: 'Fizz Buzz', level: 2, description: 'Write a function that accepts a single number as an argument. Return "Fizz" for any numbers that are divisible by 3, "Buzz" for any numbers that are divisible by 5, and "FizzBuzz" for any numbers divisible by both 3 and 5. Else, return false', solution: `function fizzBuzz(num){
        if (num%15 === 0) {
          return "FizzBuzz";
        } else if (num%5 === 0) {
          return "Buzz";
        } else if (num%3 === 0) {
          return "Fizz";
        } else {
          return false;
        }
      }
    `, testSpecs: ['assert.equal(FizzBuzz(15), "FizzBuzz")', 'assert.equal(FizzBuzz(3), "Buzz")', 'assert.equal(FizzBuzz(5),"Fizz")','assert.equal(FizzBuzz(12), "Fizz")' ], authorId: 1, signature:'FizzBuzz(num)'}),
    Problem.create({title: 'Bactrian Case', level: 3, description: 'write a function bactrianCase that accepts a single string as an argument. The function should log out that string with every other letter capitalized.', solution: `function bactrianCase(str) {
      var newString = '';

    for(var i=0; i<str.length; i++) {
      if (i%2 === 0) {
        newString += str[i].toUpperCase();
      } else {
        newString += str[i];
      }
    }

      return newString;
    }`, testSpecs: ['assert.equal(bactrianCase("hello"),"HeLlO")', 'assert.equal(bactrianCase("stephanie"),"StEpHaNiE")', 'assert.equal(bactrianCase("fullstack"), "FuLlStAcK")'], authorId: 2, signature:'bactrianCase(str)'}),
    Problem.create({title: 'Exponentiate', level: 4, description: 'Write a function exponentiate that accepts a number and a power to raise that number to. For the present, assume the power argument will always be a positive integer value.', solution: `function exponentiate(base, power) {
      var expResult = 1;

   for (var i=0; i<power; i++) {
      expResult *= base;
    }

   return expResult;
  }`, testSpecs: ['assert.equal(exponentiate(1,1), 1)', 'assert.equal(exponentiate(3,3), 27)', 'assert.equal(exponentiate(6,7), 279936)' ], authorId: 2, signature:'exponentiate(base, power)'}),

  Problem.create({title: 'mostVowels', level: 5, description: 'Write a function that accepts a string and returns the word from that string with the most vowels. If there are no words with strings, return the empty string.', solution: `function mostVowels(str) {
    var vowels = "aeiou";
    var wordsArr = str.split(" ");
    var leadWord = "";
    var mostVowels = 0;

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

   return leadWord;
  }`, testSpecs: ['assert.equal(mostVowels("I am a keeper with some real rhythms"), "keeper")', 'assert.equal(mostVowels("Tenacious Tony Trains Today, Tomorrow Till The Time Ticks"), "Tenacious")'], authorId: 1, signature:'mostVowels(str)'}),
  Problem.create(
    {
    title: 'Temperature Converter',
    level: 4,
  description: 'Write a converter function that accepts a temperature in Fahrenheit and returns the temperature in Celsius. For your reference, here is the equation for converting Fahrenheit to Celsius: T(°C) = (T(°F) - 32) × 5/9',
    solution: `function converter(temp) {
                  return (temp - 32) * 5/9;
               }`,
    signature: 'converter(temp)',
    testSpecs: [
                'assert.equal(converter(77), 25)',
                'assert.equal(converter(-5), -20.555555555555557)',
                'assert.equal(converter(32), 0)'
               ],
    authorId: 1
   }
),

Problem.create(
  {
    title: 'Frequency Analysis',
    level: 5,
    description: 'Write a function that takes a string of text and returns an object containing the count for each character in the string.Note: The input string  will only contain lowercase letters. There will not be any whitespace, capital letters, numbers, or special characters.',
    solution: `function frequencyAnalysis(str) {
                  var countObj = {};

                  for (var i=0; i<str.length; i++) {
                    if (countObj[str[i]]) {
                      countObj[str[i]]++;
                    } else {
                      countObj[str[i]] = 1;
                    }
                  }

                   return countObj;
                }`,
    signature: 'frequencyAnalysis(str)',
    testSpecs: [
               'assert.deepEqual(frequencyAnalysis("abca"), {a: 2, b: 1, c: 1})',
               'assert.deepEqual(frequencyAnalysis(""), {})',
               'assert.deepEqual(frequencyAnalysis("xxyyyz"), { x: 2, y: 3, z: 1 })'
               ],
    authorId: 1
  }
),

Problem.create(
  {
    title: 'isPrime',
    level: 3,
    description: 'Create the function isPrime(num) which will take the num parameter being passed and return true if the parameter is a prime number, otherwise return false. Note: A prime number is any number that can only be evenly divided by 1 or itself',
    solution: `function isPrime(num){
                  for(var i=2; i < num; i++){
                     if(num%i === 0){
                         return false;
                     }
                  }
                    return num > 1;
                }`,
    signature: 'isPrime(num)',
    testSpecs: [
               'assert.equal(isPrime(5), true)',
               'assert.equal(isPrime(10), false)',
               'assert.equal(isPrime(17), true)'
               ],
    authorId: 1
  }
),

Problem.create(
  {
    title: 'Flatten Arrays',
    level: 6,
    description: 'Write a function, flatten, that accepts a two-dimensional array as its argument and returns a flattened one-dimensional copy of the array.The argument array will never be more than 2 levels deep. Remember to return a copy, meaning you should not modify the original 2D array passed in!',
    solution: `function flatten(arr) {
                 var flatArray = [];
                  for (var i=0; i<arr.length; i++) {
                    if (typeof arr[i] === 'object') {
                      for (var j=0; j<arr[i].length; j++) {
                        flatArray.push(arr[i][j]);
                      }
                    } else {
                      flatArray.push(arr[i]);
                    }
                   }
                    return flatArray;
                }
            // USING Array.isArray():
              function flatten(arr) {
                  var flatArray = [];
                  for (var i=0; i<arr.length; i++) {
                    if (Array.isArray(arr[i])) {
                      for (var j=0; j<arr[i].length; j++) {
                        flatArray.push(arr[i][j]);
                      }
                    } else {
                      flatArray.push(arr[i]);
                    }
                  }
                      return flatArray;
                }`,
    signature: 'flatten(arr)',
    testSpecs: [
               'assert.deepEqual(flatten([1,[2,3],4]), [1,2,3,4])',
               'assert.deepEqual(flatten([2, [3, 4, 11, 13]]), [ 2, 3, 4, 11, 13 ])',
               'assert.deepEqual(flatten([11, [0], 19, 7]), [ 11, 0, 19, 7 ])'
               ],
    authorId: 1
 }
),

Problem.create(
  {
    title: 'Proper Noun Filter',
    level: 6,
    description: "Write a function, properNounFilter, that determines whether the string argument is a proper noun. A word is considered a proper noun if only the first letter is capitalized. If the argument is a proper noun, properNounFilter should return true. It should return false if the word isn't a proper noun, if the word is mixed case, or if it is all caps.",
    solution: `function properNounFilter(word) {
                  var charCode;

                  if(word.charCodeAt(0) > 90) return false;

                  for(var i = 1; i < word.length; i++){
                    charCode = word.charCodeAt(i);
                    if(charCode >= 65 && charCode < 90) return false;
                  }
                     return true;
                }`,
    signature: 'properNounFilter(word)',
    testSpecs: [
                'assert.equal(properNounFilter("coffee"), false)',
                'assert.equal(properNounFilter("Einstein"), true)',
                'assert.equal(properNounFilter("ApoLLo"), false)'
               ],
    authorId: 1
  }
),

Problem.create(
  {
    title: 'Underscore to CamelCase',
    level: 3,
  description: 'Write a function to convert a variable name from under_score format to camelCase.Make sure you support an unlimited number of underscores in the input! You will not have to worry about white space in your input, only alphanumeric characters and underscore',
    solution: `function underToCamel(underName) {
                  var camelCaseOutput = '';
                  var foundUnder = false;
                  for(var i = 0; i<underName.length; i++) {
                      if (underName[i] === '_') {
                          foundUnder = true;
                      } else {
                          if (foundUnder) {
                              camelCaseOutput += underName[i].toUpperCase();
                              foundUnder = false;
                          } else {
                              camelCaseOutput += underName[i];
                          }
                      }
                  }
                     return camelCaseOutput;
               }`,
    signature: 'underToCamel(underName)',
    testSpecs: [
                'assert.equal(underToCamel("first_name"), "firstName")',
                'assert.equal(underToCamel("my_income_tax_from_2015"), "myIncomeTaxFrom2015")',
                'assert.equal(underToCamel("i_love_javascript"), "iLoveJavascript")'
               ],
    authorId: 1})
])

const complete = await Promise.all([
  CompletedProblem.create({userId: 1, problemId: 2, rating: 4, userSolution: 'function diff(a,b){ return a-b}'}),
  CompletedProblem.create({userId: 2, problemId: 1, rating: 3, userSolution: 'function sum(a,b){ return a+b}'})
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
