import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, fetchRoom, makeRoom, putRoom} from '../store';
import {BattleEditor} from './BattleEditor';
import socket from '../socket';
// import { setTimeout } from 'timers';
import { PopUp } from './pop_up';
import Loading from './Loading'
// import {Train} from './Train';
// const {EventEmitter} = require('events');
// export const events = new EventEmitter()
// import axios from 'axios';

export class Battle extends Component{
  constructor(){
    super();
    this.state = {
      eligibleQs: [],
      showPopup: false,
      activeMatch: {},
      show: false
    }
    // socket.on('mssg', (payload) => {
    //   console.log("YA HIT ME!!!!!")
    //   let loadGif = document.getElementById('loadingGif');
    //   loadGif.classList.toggle('loading')
    //   this.setState({show : true})
    // })
    this.togglePopup = this.togglePopup.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
  }
  togglePopup() {
    // var start = new Date();
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
    socket.on('mssg', (payload) => {
      console.log("YA HIT ME!!!!!")
      let loadGif = document.getElementById('loadingGif');
      loadGif.classList.toggle('loading')
      this.setState({show : true})
    })
    // this.setState({showPopup: true})
  }

  componentWillUnmount() {
    socket.off('mssg')
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
      this.setState({showPopup: true})
    }
  this.setState({activeMatch: active})
  // console.log('SET STATE W:', active)

  }

  handleMatch(e) {
    // e.preventDefault();
    // events.emit('findOrCreateMatch', socket.id)// =>
    // this.props.findRoom(this.props.user.rank)
    // console.log('this.state.activeMatch!', this.state.activeMatch)
    let loadGif = document.getElementById('loadingGif');
    console.log('TOGGLE ONE')


    if (this.state.activeMatch.id && this.state.activeMatch.roomId !== socket.id) {
      console.log('SOCKET ID TYPE', typeof socket.id, typeof this.state.activeMatch.roomId)
      console.log("THE ACTUAL VALUES", this.state.activeMatch.roomId, socket.id)
      console.log('Updating ROOM:', this.state.activeMatch)
      this.props.updatingRoom(this.state.activeMatch.id, this.props.user.id, 'closed')
      console.log('TOGGLE TWO')
      loadGif.classList.toggle('loading')
      socket.emit('joinRoom', this.state.activeMatch.roomId)
      setTimeout(() => {
        this.setState({show: true})
      }, 1000)
      // socket.broadcast.emit('joinRoom', this.state.activeMatch.roomId)
      // socket.emit('joinRoom', 'room404')
      // socket.emit('createRoom', this.state.activeMatch.roomId)
      // console.log('STATE: ', this.state)

      // socket.on('mssg', (msg) => {
      //   console.log(`${msg} READY IS RUNINNG BRUNCH FOR LIFE`)
      //   // this.setState({show: true})
      // })
    } else {
      loadGif.classList.toggle('loading')
      this.props.createRoom(socket.id, this.props.user.rank, this.props.user.id)
    }
    // console.log('socketID:', socket.id)

  }

  render() {
    console.log("THE BATTLE STATE *********", this.state)
    // if (this.state.eligibleQs) console.log('this.state.eligibleQs', this.state.eligibleQs)
    //<Train />
    console.log('this.state.activeMatch', this.state.activeMatch)
    if (this.props.updateRoom && this.props.updateRoom.status){
      console.log('RENDERING', this.props.updateRoom.status, this.state.show)
    }
    return (
        <div id="battle-main">

            <h1>BATTLE COMPONENT</h1>

            <button onClick={this.handleMatch}>Find Match</button>
            <Loading />

            <div className="editor-div">
             {/*this.state.eligibleQs && this.state.activeMatch && this.state.activeMatch.id && this.props.updateRoom && (this.props.updateRoom.status === 'closed') && <BattleEditor
            questions={this.state.eligibleQs}
            match={this.state.activeMatch}
            battleProps={this.props}
            />*/}

            {/*
              TODO: MAKE SURE YOU HAVE NECESSARY LOGIC FOR INSTANTIATING PROPER BATTLE
            */}

            {
              this.state.eligibleQs && this.state.show && this.state.activeMatch ? <BattleEditor
              questions={this.state.eligibleQs}
              match={this.state.activeMatch}
              battleProps={this.props}
              /> : <h3> No code baby!</h3>
            }
            </div>

            {this.state.eligibleQs && this.state.showPopup && (this.props.updateRoom || this.state.show) ?
              <PopUp
              func={this.togglePopup}
              quest={this.state.eligibleQs[0]}
              /> : null}

      </div>
    )
  }
}

const mapState = (state) => {
  // console.log('STATE:', state)
  return {
    email: state.user.email,
    user: state.user,
    // show : state.show,
    allQuestions: state.problems,
    activeRoom: state.room.activeRoom,
    updateRoom: state.room.updatedRoom
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
    updatingRoom: (roomId, playerJoin, status) => {
      dispatch(putRoom(roomId, playerJoin, status))
    }
  }
}

export default connect(mapState, mapDispatch)(Battle)
