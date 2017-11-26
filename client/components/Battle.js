import React, { Component } from 'react';
// import {Train} from './Train';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, fetchRoom, makeRoom, putRoom} from '../store';
// import { PopUp } from './pop_up';
import {CodeEditor} from './editor';
const {EventEmitter} = require('events');
export const events = new EventEmitter()
//import axios from 'axios';
import socket from '../socket';

export class Battle extends Component{
  constructor(){
    super();
    this.state = {
      eligibleQs: [],
      showPopup: false,
      activeMatch: {}
    }
    this.togglePopup = this.togglePopup.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount() {
    if (this.props.loadAllProblems && this.props.loadCompletedProblems) {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
      this.props.findRoom(this.props.user.rank);
    }
    this.setState({showPopup: true})
  }

  componentWillReceiveProps(nextProps) {
    let allQs = nextProps.allQuestions.allProblems;
    let compQs = nextProps.allQuestions.completedProblems;
    let active = nextProps.activeRoom;
    let compIds = compQs.map(q => q.id)
    if (allQs.length && compQs.length) {
      let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
        return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
      })
      this.setState({eligibleQs})
    }
  this.setState({activeMatch: active})
  console.log('SET STATE W:', active)
  }

  handleMatch(e) {
    e.preventDefault();
    // events.emit('findOrCreateMatch', socket.id)// =>
    socket.emit('findOrJoinRoom', socket.id)
    // this.props.findRoom(this.props.user.rank)
    console.log('this.state.activeMatch!', this.state.activeMatch)

    if (this.state.activeMatch.id) {
      console.log('sending ROOM:', this.state.activeMatch)
      this.props.updateRoom(this.state.activeMatch, this.props.user.id, 'closed')
    } else {
     this.props.createRoom(socket.id, this.props.user.rank, this.props.user.id)
    }
    console.log('socketID:', socket.id)
  }

  render() {
    // if (this.state.eligibleQs) console.log('this.state.eligibleQs', this.state.eligibleQs)
    //<Train />

    return (
        <div id="battle-main">

            <h1>BATTLE COMPONENT</h1>
            <button onClick={this.togglePopup}>show popup</button>
            <button onClick={this.handleMatch}>Find Match</button>


            <div className="editor-div">
              {this.state.eligibleQs && <CodeEditor questions={this.state.eligibleQs} />}
            </div>


      </div>
    )
  }
}

const mapState = (state) => {
  // console.log('STATE:', state)
  return {
    email: state.user.email,
    user: state.user,
    allQuestions: state.problems,
    activeRoom: state.room.activeRoom
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllProblems: () => {
      dispatch(fetchAllProblems())
    },
    loadCompletedProblems: (userId) => {
      dispatch(fetchCompletedProblems(userId))
    },
    findRoom: (level) => {
      dispatch(fetchRoom(level))
    },
    createRoom: (roomId, level, player1) => {
      dispatch(makeRoom(roomId, level, player1))
    },
    updateRoom: (room, playerJoin, status) => {
      dispatch(putRoom(room, playerJoin, status))
    }
  }
}

export default connect(mapState, mapDispatch)(Battle)
