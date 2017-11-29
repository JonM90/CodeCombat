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
            rank:{}
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
        let questions = this.props.allQuestions.allProblems
        let completedQuestions = this.props.allQuestions.completedProblems

        let wins = this.props.user.battleWin
        let losses = this.props.user.battleLoss
        console.log("WINS AND LOSSES", wins, losses)
        let rankObj = {}
        if(completedQuestions.length){
            completedQuestions.forEach(val => {
                rankObj[val.level+''] = rankObj[val.level+''] + 1 || 1
            })
        }
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
                colorScale={['#90A4AE'/*BLUE GREY*/, '#7986CB'/*INDIGO*/, '#F06292'/*PINK*/, '#FFF176'/*YELLOW*/, '#FF8A65'/*DEEP ORANGE*/]} 
                animate={{duration: 3000}}
                data={[
                    { x: "1", y: (rankObj[1] || 0) },
                    { x: "2", y: (rankObj[2] || 0) },
                    { x: "3", y: (rankObj[3] || 0) },
                    { x: "4", y: (rankObj[4] || 0) },
                    { x: "5", y: (rankObj[5] || 0) }
                ]}/>
            </div>
            <div>
                <VictoryPie
                colorScale={['#2196F3', '#F44336']} 
                animate={{duration: 3000}}
                data={[
                    { x: "WINS", y: (this.props && wins) },
                    { x: "LOSSES", y: (this.props && losses) }
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