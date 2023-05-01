import './index.css'

import {FiUserPlus} from 'react-icons/fi'

import {v4 as uuidv4} from 'uuid'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

let firstName = ''
let lastName = ''
let emailInput = ''
let avatarUrl = ''

const AddUserModal = props => {
  const {triggerAddUserModal, addUserValidation} = props

  const onChangeFirstName = event => {
    firstName = event.target.value
  }

  const renderFirstNameInput = () => (
    <div className="input-container">
      <label className="label" htmlFor="first-name-input">
        First Name
      </label>
      <input
        type="text"
        className="users-input"
        id="first-name-input"
        onChange={onChangeFirstName}
      />
    </div>
  )

  const onChangeLastName = event => {
    lastName = event.target.value
  }

  const renderLastNameInput = () => (
    <div className="input-container">
      <label className="label" htmlFor="last-name-input">
        Last Name
      </label>
      <input
        type="text"
        className="users-input"
        id="last-name-input"
        onChange={onChangeLastName}
      />
    </div>
  )

  const onChangeEmail = event => {
    emailInput = event.target.value
  }

  const renderEmailInput = () => (
    <div className="input-container">
      <label className="label" htmlFor="email-input">
        Email
      </label>
      <input
        type="text"
        className="users-input"
        id="email-input"
        onChange={onChangeEmail}
      />
    </div>
  )

  const onChangeAvatar = event => {
    avatarUrl = event.target.value
  }

  const renderAvatarUrlInput = () => (
    <div className="input-container">
      <label className="label" htmlFor="avatar-input">
        Avatar URL
      </label>
      <input
        type="text"
        className="users-input"
        id="avatar-input"
        onChange={onChangeAvatar}
      />
    </div>
  )

  const onSubmitForm = event => {
    event.preventDefault()

    if (
      emailInput === '' ||
      firstName === '' ||
      lastName === '' ||
      avatarUrl === ''
    ) {
      triggerAddUserModal(undefined)
    } else {
      const newUserDetails = {
        id: uuidv4(),
        email: emailInput,
        firstName,
        lastName,
        avatar: avatarUrl,
      }

      triggerAddUserModal(newUserDetails)
    }
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="add-user-btn">
          <FiUserPlus className="add-user-icon" />
          <p className="add-user">Add User</p>
        </button>
      }
    >
      {close => (
        <div className="modal">
          <button
            type="button"
            className="modal-auto-close-btn"
            onClick={close}
          >
            &times;
          </button>
          <div className="modal-header"> Enter User Details </div>
          <form className="user-form" onSubmit={onSubmitForm}>
            {renderFirstNameInput()}
            {renderLastNameInput()}
            {renderEmailInput()}
            {renderAvatarUrlInput()}
            <p className="add-user-validations">{addUserValidation}</p>
            <div className="user-submit-btn-container">
              <button type="submit" className="user-submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  )
}

export default AddUserModal
