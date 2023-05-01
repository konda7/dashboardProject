import './index.css'

import {FiUserPlus} from 'react-icons/fi'

const LeftPanel = () => (
  <div>
    <button type="button" className="add-user-btn">
      <div className="add-user-btn-container">
        <FiUserPlus className="add-user-icon" />
        <p className="add-user">Add User</p>
      </div>
    </button>
  </div>
)

export default LeftPanel
