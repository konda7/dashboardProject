import './index.css'

import {Component} from 'react'

import {Oval} from 'react-loader-spinner'

import TopBar from '../TopBar'
import AddUserModal from '../AddUserModal'
import EditModal from '../EditModal'
import DeleteModal from '../DeleteModal'

class Dashboard extends Component {
  state = {
    usersList: [],
    addUserValidation: '',
    modifiedUserValidation: '',
    isLoading: false,
  }

  componentDidMount() {
    this.getUsersList()
  }

  getUsersList = async () => {
    this.setState({isLoading: true})

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
      this.setState({usersList: modifiedData, isLoading: false})
    }
  }

  triggerAddUserModal = newUserDetails => {
    if (newUserDetails === undefined) {
      this.setState({addUserValidation: 'Please fill all the details'})
    } else {
      this.setState(prevState => ({
        usersList: [...prevState.usersList, newUserDetails],
        addUserValidation: '',
      }))
    }
  }

  triggerEditUserDetails = modifiedUserDetails => {
    console.log(modifiedUserDetails)
    if (modifiedUserDetails === undefined) {
      this.setState({modifiedUserValidation: 'Please fill all the details'})
    } else {
      this.setState(prevState => ({
        usersList: prevState.usersList.map(eachUser =>
          eachUser.id === modifiedUserDetails.id
            ? {...eachUser, ...modifiedUserDetails}
            : eachUser,
        ),
      }))
    }
  }

  deleteUserCard = userId => {
    this.setState(prevState => ({
      usersList: prevState.usersList.filter(eachUser => eachUser.id !== userId),
    }))
  }

  renderUsersList = () => {
    const {usersList, modifiedUserValidation} = this.state

    return (
      <ul className="users-list">
        {usersList.map(eachUser => {
          const {id, avatar, firstName, lastName, email} = eachUser

          const fullName = `${firstName} ${lastName}`

          return (
            <li className="user-card" key={id}>
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
                <EditModal
                  userDetails={eachUser}
                  modifiedUserValidation={modifiedUserValidation}
                  triggerEditUserDetails={this.triggerEditUserDetails}
                />
                <DeleteModal
                  userId={eachUser.id}
                  deleteUserCard={this.deleteUserCard}
                />
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Oval color="#000" height={50} width={50} secondaryColor="#000" />
    </div>
  )

  render() {
    const {addUserValidation, isLoading} = this.state

    return (
      <div className="dashboard-page">
        <div className="left-panel-container">
          <h1 className="dashboard-heading">Dashboard</h1>
          <AddUserModal
            triggerAddUserModal={this.triggerAddUserModal}
            addUserValidation={addUserValidation}
          />
        </div>
        <div className="dashboard-container">
          <TopBar />
          {isLoading ? this.renderLoadingView() : this.renderUsersList()}
        </div>
      </div>
    )
  }
}

export default Dashboard
