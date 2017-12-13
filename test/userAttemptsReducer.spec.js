import {expect} from 'chai';
import {createStore} from 'redux';
//mocha --compilers js:babel-core/register
import userAttemptReducer from '../client/store/userAttempts'

describe("User Attempts Reducer", () => {
    let testStore;
    let user= {
                    name:'Jon',
                    email:'snow@email.com',
                    password:'asdf'
                }
    let submission = 'I Tried'
	beforeEach('make mock store', () => {
		testStore = createStore(userAttemptReducer)
	})

	it('has proper initial state', () => {
		expect(testStore.getState()).to.be.deep.equal("")
	})

	describe('storeAttempt', () => {
		it('store the attempt', () => {
			testStore.dispatch({type : 'STORE_ATTEMPT', submission:user})
			expect(testStore.getState()).to.be.deep.equal("")
		})
    })
    
    describe('storeSubmission', () => {
		it('stores the submission', () => {
			testStore.dispatch({type : 'STORE_SUBMISSION', submission})
			expect(testStore.getState()).to.be.deep.equal(submission)
		})
	})
})