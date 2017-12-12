import {expect} from 'chai';
//Command to run to get tests to run
//mocha --compilers js:babel-core/register
import {GET_PROBLEM, GET_PROBLEMS, GET_COMPLETED_PROBLEMS, SET_PROBLEM_COMPLETE, getProblem, getAllProblems, getCompletedProblems, setProblemToComplete} from '../client/store/problem'

describe('Problem Actions', () => {

    describe('getProblem', () => {

        it('returns proper action', () => {
            let problem= {
                title:'Jon',
                testSpecs:['snow@email.com'],
                signature:'yo()',
                solution:'asdf'
            }

            expect(getProblem(problem)).to.be.deep.equal({
                type:GET_PROBLEM,
                problem
            })
        })
    })

    describe('getAllProblems', () => {
        
        it('returns proper action', () => {
            let problems= [{
                title:'Jon',
                testSpecs:['snow@email.com'],
                signature:'yo()',
                solution:'asdf'
            }]
        
            expect(getAllProblems(problems)).to.be.deep.equal({
                type:GET_PROBLEMS,
                problems
            })
        })
    })

    describe('getCompletedProblems', () => {
        
        it('returns proper action', () => {
            let completedProblems= [{
                title:'Jon',
                testSpecs:['snow@email.com'],
                signature:'yo()',
                solution:'asdf'
            }]
        
            expect(getCompletedProblems(completedProblems)).to.be.deep.equal({
                type:GET_COMPLETED_PROBLEMS,
                completedProblems
            })
        })
    })

    describe('setProblemComplete', () => {
        
        it('returns proper action', () => {
            let problem= {
                title:'Jon',
                testSpecs:['snow@email.com'],
                signature:'yo()',
                solution:'asdf'
            }
        
            expect(setProblemToComplete(problem)).to.be.deep.equal({
                type:SET_PROBLEM_COMPLETE,
                problem
            })
        })
    })
})