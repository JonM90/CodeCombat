import {expect} from 'chai';
//Command to run to get tests to run
//mocha --compilers js:babel-core/register
import {STORE_ATTEMPT, STORE_SUBMISSION, storeAttempt, storeSubmission} from '../client/store/userAttempts'

describe('userAttempts Actions', () => {

    describe('storeAttempt', () => {

        xit('returns proper action', () => {
            let user= {
                name:'Jon',
                email:'snow@email.com',
                password:'asdf'
            }

            expect(storeAttempt(user)).to.be.deep.equal({
                type:STORE_ATTEMPT,
                attempt
            })
        })
    })

    describe('storeSubmission', () => {
        
        xit('returns proper action', () => {
            expect(storeSubmission()).to.be.deep.equal({
                type:STORE_SUBMISSION,
                submission
            })
        })
    })



})