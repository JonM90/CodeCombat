// import {expect} from 'chai';
// import {createStore} from 'redux';

// import userReducer from '../client/store/user'

// describe("User Reducer", () => {
//     let testStore;
//     let user= {
//                     name:'Jon',
//                     email:'snow@email.com',
//                     password:'asdf'
//                 }
// 	beforeEach('make mock store', () => {
// 		testStore = createStore(userReducer)
// 	})

// 	it('has proper initial state', () => {
// 		expect(testStore.getState()).to.be.deep.equal({})
// 	})

// 	describe('Get User', () => {
// 		xit('gets the user', () => {
// 			testStore.dispatch({type : 'GET_USER', user})
// 			expect(testStore.getState()).to.be.deep.equal(user)
// 		})
//     })
    
//     describe('Remove User', () => {
// 		xit('removes the user', () => {
// 			testStore.dispatch({type : 'REMOVE_USER', user})
// 			expect(testStore.getState()).to.be.deep.equal({})
// 		})
// 	})
// })