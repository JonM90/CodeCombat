import React, { Component } from 'react';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems, fetchRoom, makeRoom, putRoom} from '../store';
import {BattleEditor} from './BattleEditor';
import socket from '../socket';
import BattlePopup from './BattlePopup';
import Loading from './Loading'

export class Battle extends Component{
  constructor(){
    super();
    this.state = {
      // eligibleQs: [],
      questions: [],
      quest: {},
      activeMatch: {},
      showPopup: false,
      showEditor: false,
      matchBtn: false
    }

    this.removePopup = this.removePopup.bind(this);
    this.handleMatch = this.handleMatch.bind(this);
  }

  removePopup() {
    this.setState({
      showPopup: false
    });
  }

  componentDidMount() {
    if (this.props.loadAllProblems && this.props.loadCompletedProblems) {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
      this.props.findRoom(this.props.user.rank);
    }
    socket.on('mssg', (payload) => {
      let loadGif = document.getElementById('loadingGif');
      loadGif.classList.toggle('hidden')
      this.setState({showEditor: true, showPopup: true})
    })
  }

  componentWillUnmount() {
    socket.off('mssg')
  }

  componentWillReceiveProps(nextProps) {
    let active = nextProps.activeRoom;
    let allQs = nextProps.allQuestions.allProblems;
    // let compQs = nextProps.allQuestions.completedProblems;
    // let compIds = compQs.map(q => q.id)
    // if (allQs.length && compQs.length) {
    //   let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
    //     return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
    //   })
    //   this.setState({eligibleQs})
    //   this.setState({showPopup: true})
    // }
  this.setState({activeMatch: active, questions: allQs})
  }

  handleMatch(e) {
    this.setState({matchBtn: true})
    let loadGif = document.getElementById('loadingGif');

    if (this.state.activeMatch && this.state.activeMatch.id && this.state.activeMatch.roomId !== socket.id) {
    let getQuest = this.state.questions.filter(q => q.id === this.state.activeMatch.questId)
    this.setState({quest: getQuest[0]})

      this.props.updatingRoom(this.state.activeMatch.id, this.props.user.id, 'closed')
      loadGif.classList.toggle('hidden')
      socket.emit('joinRoom', this.state.activeMatch.roomId)
      setTimeout(() => {
        this.setState({showEditor: true})
      }, 1000)
    } else {
      let rndInd = Math.floor(Math.random() * this.state.questions.length)
      let rndQ = this.state.questions[rndInd]
      this.setState({quest: rndQ})

      loadGif.classList.toggle('hidden')
      console.log('creating room with questid:', rndQ.id)
      this.props.createRoom(socket.id, this.props.user.rank, this.props.user.id, rndQ.id)
    }

  }

  render() {
    console.log('BATTLE STATE:', this.state)

    return (
        <div id="battle-main">

          <h4 className="component-title-h4">Battle Mode</h4>
          {!this.state.matchBtn ? (
            <div id="battle-lobby">
              <h1>Battle Opponents</h1>
              <h3>Win and Take Points From Your Opponents</h3>
              <button onClick={this.handleMatch}>Find Match</button>
            </div>
            ) : null


          }
            <Loading />

            <div className="editor-div">
            {
              this.state.questions && this.state.showEditor && this.state.activeMatch ? <BattleEditor
              questions={this.state.quest}
              match={this.state.activeMatch}
              battleProps={this.props}
              /> : null
            }
            </div>

            {this.state.questions && this.state.showPopup && (this.props.updateRoom || this.state.showEditor) ?
              <BattlePopup
                func={this.removePopup}
              /> : null}

      </div>
    )
  }
}

const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user,
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
    createRoom: (roomId, level, player1, questId) => {
      dispatch(makeRoom(roomId, level, player1, questId))
    },
    updatingRoom: (roomId, playerJoin, status) => {
      dispatch(putRoom(roomId, playerJoin, status))
    }
  }
}

export default connect(mapState, mapDispatch)(Battle)
