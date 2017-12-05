/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

import { Train } from './Train';
import { CodeEditor } from './editor';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome name={'cody'}  email={'cody@email.com'}/>)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody')
  })

  it('renders the email in an div', () => {
    expect(userHome.find('div.name').text()).to.contain('Name: cody')
  })

  it('renders the email in an div', () => {
    expect(userHome.find('div.email').text()).to.contain('Email: cody@email.com')
  })

//Editor specs
describe('<Editor /> Component', () => {
  
    let currentProblem = {title: 'Diff', level: 1, description: 'Return the difference of two numbers', solution: 'function diff(a,b){ return a-b} ', testSpecs: ['assert.equal(diff(1,2), -1)', 'assert.equal(diff(5,2), 3)'], authorId: 2, signature:'diff(a, b)'}
    let editor;
     
        beforeEach('Create Component and event spy', () => {
         editor = shallow(<CodeEditor  {...props} />)
        })
  
        // it('It has an initial state for currentProblem', () => {
        //     expect(editor.props().currentProblem.title).to.equal({currentProblem})
        // })
    })
});



