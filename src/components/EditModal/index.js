import './index.css'

import {AiOutlineEdit} from 'react-icons/ai'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const EditModal = props => {
  const {triggerEditUserDetails, userDetails, modifiedUserValidation} = props

  let firstNameInput = userDetails.firstName
  let lastNameInput = userDetails.lastName
  let emailInput = userDetails.email
  let avatarUrl = userDetails.avatar

  const onChangeFirstName = event => {
    firstNameInput = event.target.value
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
        defaultValue={firstNameInput}
        onChange={onChangeFirstName}
      />
    </div>
  )

  const onChangeLastName = event => {
    lastNameInput = event.target.value
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
        defaultValue={lastNameInput}
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
        defaultValue={emailInput}
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
        defaultValue={avatarUrl}
        onChange={onChangeAvatar}
      />
    </div>
  )

  const onSubmitForm = event => {
    event.preventDefault()

    if (
      emailInput === '' ||
      firstNameInput === '' ||
      lastNameInput === '' ||
      avatarUrl === ''
    ) {
      triggerEditUserDetails(undefined)
    } else {
      const modifiedUserDetails = {
        id: userDetails.id,
        email: emailInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        avatar: avatarUrl,
      }

      triggerEditUserDetails(modifiedUserDetails)
    }
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="user-card-btn">
          <AiOutlineEdit className="user-card-icons" />
          <p>Edit</p>
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
          <div className="modal-header"> Edit User Details </div>
          <form className="user-form" onSubmit={onSubmitForm}>
            {renderFirstNameInput()}
            {renderLastNameInput()}
            {renderEmailInput()}
            {renderAvatarUrlInput()}
            <p className="add-user-validations">{modifiedUserValidation}</p>
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

export default EditModal
