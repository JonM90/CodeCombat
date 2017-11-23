import React, { Component } from 'react';
import {connect} from 'react-redux'
// import {fetchAllProblems, fetchCompletedProblems} from '../store';
import {CodeEditor} from './editor'

export class Train extends Component{
    constructor(){
        super();
        this.state = {
          // eligibleQs: []
        }
    }

    // componentDidMount() {
    //   // this.props.loadAllProblems();
    //   // this.props.loadCompletedProblems(this.props.user.id);
    // }

    // componentWillReceiveProps(nextProps) {
    //   // let allQs = nextProps.allQuestions.allProblems;
    //   // let compQs = nextProps.allQuestions.completedProblems;
    //   // let compIds = compQs.map(q => q.id)
    //   // let eligibleQs = allQs.filter( q => !compIds.includes(q.id)).filter( q => {
    //   //   return (this.props.user.rank === q.level || this.props.user.rank === q.level - 1 || this.props.user.rank === q.level + 1)
    //   // })
    //   // this.setState({eligibleQs})
    //   // console.log('ELIGIBLE!', eligibleQs)
    // }

    render() {
      // if (!this.state.eligibleQs.length) return null;
      return (
          <div id="train-main">
              <h1>TRAIN COMPONENT</h1>
              <CodeEditor /> 
              {//questions={this.state.eligibleQs}/>
              }
          </div>
      )
    }
}

const mapState = (state) => {
  // console.log('STATE:', state)
  return {
    email: state.user.email,
    user: state.user
  }
}

// const mapDispatch = dispatch => {
//   return {
//     loadAllProblems: () => {
//       dispatch(fetchAllProblems())
//     },
//     loadCompletedProblems: (userId) => {
//       dispatch(fetchCompletedProblems(userId))
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Train)
export default connect(mapState)(Train)
