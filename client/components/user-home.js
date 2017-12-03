import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserGraph from './UserGraph';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import UserInfo from './UserInfo'
import UserHistory from './UserHistory'
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionInfoOutline from 'material-ui/svg-icons/action/info';
import EditorPieChartOutlined from 'material-ui/svg-icons/editor/pie-chart';

/**
 * COMPONENT
 */
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

const tabStyles = {
  backgroundColor: 'black',
  fontFamily: 'Press Start 2P',
  color: '#c98304' //ORANGE
}

export class UserHome extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    // this.props.loadAllProblems();
    // this.props.loadCompletedProblems(this.props.user.id);
  }

  render(props) {
    const {email} = this.props;
    const {user} = this.props;

    return (
      <div>
        <h3 id="welcome">Welcome, {user.name}</h3>

        <div id="user-home-container">
          <MuiThemeProvider muiTheme={getMuiTheme()} >
            <Tabs style={{backgroundColor:'#2d2d2d', height:'60em'}}>

              <Tab label="INFO" className="tabs" icon={<ActionInfoOutline />} style={tabStyles}>
                <UserInfo />
              </Tab>

              <Tab label="STATS" className="tabs" icon={<EditorPieChartOutlined />} style={tabStyles}>
                <UserGraph />
              </Tab>

              <Tab label="History" className="tabs" icon={<ActionDoneAll />} style={tabStyles}>
                <UserHistory />
              </Tab>
            </Tabs>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}


/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    email: state.user.email,
    user: state.user
  }
}
// const mapDispatch = dispatch => ({ loadAllProblems: () => dispatch(fetchAllProblems()) })

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
