import {expect} from 'chai';
import {createStore} from 'redux';

import roomReducer from '../client/store/room'

describe("Room Reducer", () => {
    let testStore;
    let room= {
                    roomId:1234,
                    level:2,
                    status:'open'
                }

	beforeEach('make mock store', () => {
		testStore = createStore(roomReducer)
	})

	it('has proper initial state', () => {
		expect(testStore.getState()).to.be.deep.equal({})
	})

	describe('getRoom', () => {
		it('gets the room', () => {
			testStore.dispatch({type : 'GET_ROOM', room})
			expect(testStore.getState()).to.be.deep.equal({activeRoom:room})
		})
    })
    
    describe('createRoom', () => {
		it('creates the room', () => {
			testStore.dispatch({type : 'CREATE_ROOM', room})
			expect(testStore.getState()).to.be.deep.equal({createdRoom:room})
		})
    })
    
    describe('updateRoom', () => {
		it('updates the room', () => {
			testStore.dispatch({type : 'UPDATE_ROOM', room})
			expect(testStore.getState()).to.be.deep.equal({updatedRoom:room})
		})
	})
})