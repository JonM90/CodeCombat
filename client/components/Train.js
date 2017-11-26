import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {fetchAllProblems, fetchCompletedProblems} from '../store';
import { PopUp } from './pop_up';
import {CodeEditor} from './editor';


export class Train extends Component{
    constructor(){
        super();
        this.state = {
          eligibleQs: [],
          showPopup: false,
          currInd: 0,
          redirect: false
        }
        this.togglePopup = this.togglePopup.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        // this.handleQuit = this.handleQuit.bind(this);
    }
    togglePopup() {
      this.setState({
        showPopup: !this.state.showPopup,
        //currInd: (this.state.currInd + 1) 
      });
    }

    handleSkip(){
        this.setState({ currInd: this.state.currInd + 1 });
    }

    componentDidMount() {
      this.props.loadAllProblems();
      this.props.loadCompletedProblems(this.props.user.id);
      this.setState({showPopup: true})
    }

    componentWillReceiveProps(nextProps) {
      let allQs = nextProps.allQuestions.allProblems;
      let compQs = nextProps.allQuestions.completedProblems;
      let compIds = compQs.map(q => q.id)
      if (allQs.length && compQs.length) {
        let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
          return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
        })
        this.setState({eligibleQs})
      }
    }

    render() {
       if (this.state.eligibleQs) console.log('this.state.eligibleQs in Train: ', this.state.eligibleQs[0])

      return (
          <div id="train-main">

              {this.state.redirect ? <Redirect to="/" /> : null}
             
              <h1>TRAIN COMPONENT</h1>
              <button onClick={this.togglePopup}>show popup</button>

                  {this.state.eligibleQs && this.state.showPopup ?
                    <PopUp
                    func={this.togglePopup}
                    quest={this.state.eligibleQs[this.state.currInd]}
                    skipFunc={this.handleSkip}
                    quitFunc={() => this.setState({redirect: true}) }
                    /> : null}

              <div className="editor-div">
                {this.state.eligibleQs && <CodeEditor 
                questions={this.state.eligibleQs} 
                eligibleQueue = {this.state.eligibleQs}
                problemNum = {this.state.currInd}
                />}
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
    allQuestions: state.problems
  }
}

const mapDispatch = dispatch => {
  return {
    loadAllProblems: () => {
      dispatch(fetchAllProblems())
    },
    loadCompletedProblems: (userId) => {
      dispatch(fetchCompletedProblems(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Train)
