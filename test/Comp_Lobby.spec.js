import React from 'react';
import {expect} from 'chai';
import Enzyme from 'enzyme'
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15'
Enzyme.configure({ adapter: new Adapter() })
import Lobby from '../client/components/Lobby'

describe('Lobby', () => {
	let lobby;
	beforeEach('create component', () => {
		lobby = shallow(<Lobby />);
	})

	it('should be a <div> with expected bgrd', () => {
		expect(lobby.is('div')).to.be.equal(true);
		
	})
})