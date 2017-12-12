import {expect} from 'chai';
//Command to run to get tests to run
//mocha --compilers js:babel-core/register
import {GET_ROOM, CREATE_ROOM, UPDATE_ROOM, getRoom, createRoom, updateRoom} from '../client/store/room'

describe('Room Actions', () => {

    describe('getRoom', () => {
        it('returns proper action', () => {
            let room = {
                roomId:21,
                playerHost:1,
                status:'open'
            }

            expect(getRoom(room)).to.be.deep.equal({
                type:GET_ROOM,
                room
            })
        })
    })

    describe('createRoom', () => {
        it('returns proper action', () => {
            let room = {
                roomId:21,
                playerHost:1,
                status:'open'
            }

            expect(createRoom(room)).to.be.deep.equal({
                type:CREATE_ROOM,
                room
            })
        })
    })

    describe('updateRoom', () => {
        it('returns proper action', () => {
            let room = {
                roomId:22,
                playerHost:1,
                status:'open'
            }

            expect(updateRoom(room)).to.be.deep.equal({
                type:UPDATE_ROOM,
                room
            })
        })
    })
})