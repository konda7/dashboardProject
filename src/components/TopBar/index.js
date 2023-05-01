import './index.css'

import {MdLogout} from 'react-icons/md'
import {FcHome} from 'react-icons/fc'

import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const TopBar = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="top-navbar">
      <FcHome className="home-icon" />
      <button type="button" className="logout-btn" onClick={onClickLogoutBtn}>
        <div className="logout-btn-container">
          <MdLogout className="logout-icon" />
          <p className="logout-word">Logout</p>
        </div>
      </button>
    </nav>
  )
}

export default withRouter(TopBar)
