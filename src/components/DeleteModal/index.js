import './index.css'

import {AiOutlineDelete} from 'react-icons/ai'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

const DeleteModal = props => {
  const {deleteUserCard, userId} = props

  const onClickDeleteBtn = () => {
    deleteUserCard(userId)
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="user-card-btn">
          <AiOutlineDelete className="user-card-icons" />
          <p>Delete</p>
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
          <div className="modal-header"> Delete User? </div>
          <div className="delete-modal-btn-container">
            <button
              type="button"
              className="delete-modal-delete-btn"
              onClick={onClickDeleteBtn}
            >
              Delete
            </button>
            <button
              type="button"
              className="delete-modal-cancel-btn"
              onClick={close}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default DeleteModal
