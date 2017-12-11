/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'
import { spy } from 'sinon';
import ReactAce from 'react-ace-editor';

//import { Train } from './Train';
import { CodeEditor } from './editor';
import { Lobby } from './Lobby';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome;
  let user = {
      name: 'cody'
  }

  beforeEach(() => {
    userHome = shallow(<UserHome user = { user }  email={'cody@email.com'}/>)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody')
  })
})
//   it('renders the email in an div', () => {
//     expect(userHome.find('div.name').text()).to.contain('Name: cody')
//   })

//   it('renders the email in an div', () => {
//     expect(userHome.find('div.email').text()).to.contain('Email: cody@email.com')
//   })



//Editor specs
//--------------------------------------------------------------------------------------------------------------------------
spy(CodeEditor.prototype, 'componentDidMount');

describe('<Editor /> Component', () => {
  
    // let currentProblem = {title: 'Diff', level: 1, description: 'Return the difference of two numbers', solution: 'function diff(a,b){ return a-b} ', testSpecs: ['assert.equal(diff(1,2), -1)', 'assert.equal(diff(5,2), 3)'], authorId: 2, signature:'diff(a, b)'}
    let editor;
     
        beforeEach('Create Component and event spy', () => {
         editor = shallow(<CodeEditor  />)
        })
  
        it('calls componentDidMount', () => {
           expect(CodeEditor.prototype.componentDidMount.calledOnce).to.equal(true);
        })

        it('should have props for attempt, currentProblem, output,logger, error, redirect', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.props().attempt).to.be.defined;
            expect(editor.props().currentProblem).to.be.defined;
            expect(editor.props().output).to.be.defined;
            expect(editor.props().logger).to.be.defined;
            expect(editor.props().error).to.be.defined;
            expect(editor.props().redirect).to.be.defined;
       });

       it('should have props for onChange, onSubmit, nextQuestion, setSig', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.props().onChange).to.be.defined;
            expect(editor.props().onSubmit).to.be.defined;
            expect(editor.props().nextQuestion).to.be.defined;
            expect(editor.props().setSig).to.be.defined;
       });

       it('should have an form', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.find('form')).to.exist;
       });

       it('should have a buttton on form for submitting', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.find('button')).to.exist;
       });

       it('should have a inital state for attempt', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.state().attempt).to.equal('')
       });

       it('should have a inital state for output', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.state().output).to.equal('')
       });

       it('should have a inital state for logger', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.state().logger).to.deep.equal([])
       });

       it('should have a inital state for error', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.state().error).to.equal(false)
       });

       it('should have a inital state for error', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.state().redirect).to.equal(false)
       });

       it('should have a inital state for error', function () {
            editor = shallow(<CodeEditor  />)
            expect(editor.find(ReactAce)).to.exist
       });


    })

//--------------------------------------------------------------------------------------------------------------------------


 describe('<Lobby /> Component', () => {
     
        beforeEach('Create Component and event spy', () => {
         lobby = shallow(<Lobby  />)
        })
  
        // it('calls componentDidMount', () => {
        //    expect(lobby.prototype.render().calledOnce).to.equal(true);
        // })
 });



