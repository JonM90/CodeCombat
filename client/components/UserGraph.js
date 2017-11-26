import React, { Component } from 'react';
import { render } from 'react-dom';
import {connect} from 'react-redux'
import {fetchAllProblems, fetchCompletedProblems} from '../store';
import { VictoryPie } from 'victory';

class PieChart extends Component {
    constructor(props){
        super(props)
        this.state={
            allProblems:[],
            comlpetedProblems:[],
            
        }
    }

    componentDidMount() {
        this.props.loadAllProblems();
        this.props.loadCompletedProblems(this.props.user.id);
        
      }

    render(props) {
        var styles = {
            display:'flex',
            direction:'row'
        }
        console.log("ITS YOUR FRIEND MR.PROPS: ", this.props)
        let questions = this.props.allQuestions.allProblems
        let completedQuestions = this.props.allQuestions.completedProblems
        console.log("STATE", this.state)
        return (
        <div style={styles}>
            <div>
                <VictoryPie
                colorScale={['#FFC107'/*Orange*/, '#4CAF50'/*Green*/]} 
                animate={{duration: 3000}}
                data={[
                    { x: "Incomplete", y: (questions && questions.length) },
                    { x: "Completed", y: (completedQuestions && completedQuestions.length) }
                ]}/>
            </div>
            <div>
                <VictoryPie
                colorScale={['#FFC107'/*Orange*/, '#4CAF50'/*Green*/]} 
                animate={{duration: 3000}}
                data={[
                    { x: "Incomplete", y: (questions && questions.length) },
                    { x: "Completed", y: (completedQuestions && completedQuestions.length) }
                ]}/>
            </div>
        </div>
        );
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
  
  export default connect(mapState, mapDispatch)(PieChart)