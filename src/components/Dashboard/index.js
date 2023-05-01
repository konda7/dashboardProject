import './index.css'

import {Component} from 'react'

import TopBar from '../TopBar'
import LeftPanel from '../leftPanel'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <div className="left-panel-container">
          <h1 className="dashboard-heading">Dashboard</h1>
          <LeftPanel />
        </div>
        <div className="dashboard-container">
          <TopBar />
        </div>
      </div>
    )
  }
}

export default Dashboard
