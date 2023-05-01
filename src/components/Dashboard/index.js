import './index.css'

import {Component} from 'react'

import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import {FiUserPlus} from 'react-icons/fi'

import TopBar from '../TopBar'

class Dashboard extends Component {
  state = {
    usersList: [],
  }

  componentDidMount() {
    this.getUsersList()
  }

  getUsersList = async () => {
    const response = await fetch('https://reqres.in/api/users?page=2')
    const dataList = await response.json()
    if (response.ok) {
      const modifiedData = dataList.data.map(eachUser => ({
        id: eachUser.id,
        email: eachUser.email,
        avatar: eachUser.avatar,
        firstName: eachUser.first_name,
        lastName: eachUser.last_name,
      }))
      this.setState({usersList: modifiedData})
    }
  }

  renderUsersList = () => {
    const {usersList} = this.state

    return (
      <ui className="users-list">
        {usersList.map(eachUser => {
          const {avatar, firstName, lastName, email} = eachUser

          const fullName = `${firstName} ${lastName}`

          return (
            <li className="user-card">
              <div className="user-content-container">
                <img src={avatar} alt={fullName} className="user-img" />
                <div className="user-description-container">
                  <p className="user-name">
                    <span className="user-span">Name: </span> {fullName}
                  </p>
                  <p className="user-name">
                    <span className="user-span">Email: </span> {email}
                  </p>
                </div>
              </div>
              <hr />
              <div className="user-card-btn-container">
                <button type="button" className="user-card-btn">
                  <AiOutlineEdit className="user-card-icons" />
                  <p>Edit</p>
                </button>
                <button type="button" className="user-card-btn">
                  <AiOutlineDelete className="user-card-icons" />
                  <p>Delete</p>
                </button>
              </div>
            </li>
          )
        })}
      </ui>
    )
  }

  render() {
    return (
      <div className="dashboard-page">
        <div className="left-panel-container">
          <h1 className="dashboard-heading">Dashboard</h1>
          <button type="button" className="add-user-btn">
            <div className="add-user-btn-container">
              <FiUserPlus className="add-user-icon" />
              <p className="add-user">Add User</p>
            </div>
          </button>
        </div>
        <div className="dashboard-container">
          <TopBar />
          {this.renderUsersList()}
        </div>
      </div>
    )
  }
}

export default Dashboard
