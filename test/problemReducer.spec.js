import {expect} from 'chai';
import {createStore} from 'redux';

import problemReducer from '../client/store/problem'

describe("Problem Reducer", () => {
    let testStore;
    let problem= {
        title: 'Sum',
        description: 'Find the sum',
        solution: 'sol',
        level: 2,
        testSpecs: ['testSPecs'],
        signature: 'signature'
     }

    let problems= [{
        title: 'Sum',
        description: 'Find the sum',
        solution: 'sol',
        level: 2,
        testSpecs: ['testSPecs'],
        signature: 'signature'
     }]

	beforeEach('make mock store', () => {
		testStore = createStore(problemReducer)
	})

	it('has proper initial state', () => {
		expect(testStore.getState()).to.be.deep.equal({
            singleProblem: {},
            allProblems: [],
            completedProblems: [],
            justCompleted: {}
          })
	})

	describe('getProblem', () => {
		it('gets the problem', () => {
			testStore.dispatch({type : 'GET_PROBLEM', problem})
			expect(testStore.getState()).to.be.deep.equal({
                allProblems: [],
                completedProblems: [],
                justCompleted: {},
                singleProblem:problem})
		})
    })
    
    describe('getAllProblems', () => {
		it('get all the problems', () => {
			testStore.dispatch({type : 'GET_PROBLEMS', problems})
			expect(testStore.getState()).to.be.deep.equal({
                completedProblems: [],
                justCompleted: {},
                singleProblem:{},
                allProblems:problems})
		})
    })
    
    describe('getCompletedProblems', () => {
		it('get all completed problems', () => {
			testStore.dispatch({type : 'GET_COMPLETED_PROBLEMS', completedProblems:problems})
			expect(testStore.getState()).to.be.deep.equal({
                justCompleted: {},
                singleProblem:{},
                allProblems:[],
                completedProblems:problems})
		})
    })

    describe('setProblemToComplete', () => {
		it('sets problem to complete', () => {
			testStore.dispatch({type : 'SET_PROBLEM_COMPLETE', problem})
			expect(testStore.getState()).to.be.deep.equal({
                singleProblem:{},
                allProblems:[],
                completedProblems:[],
                justCompleted:problem})
		})
    })
})