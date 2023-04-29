import './index.css'

import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    email: '',
    password: '',
    emailRequired: '',
    passwordRequired: '',
    errorMsg: '',
  }

  onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  validatingFormDetails = () => {
    const {email, password} = this.state

    if (email === '') {
      this.setState({emailRequired: 'Required'})
    }
    if (password === '') {
      this.setState({passwordRequired: 'Required'})
    }
    if (email === '' || password === '') {
      return false
    }
    this.setState({emailRequired: '', passwordRequired: ''})
    return true
  }

  submitForm = async event => {
    event.preventDefault()

    if (this.validatingFormDetails()) {
      const {email, password} = this.state
      const userDetails = {email, password}

      const apiUrl = `https://reqres.in/api/login`

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        const jwtToken = data.token
        this.onSuccessfulLogin(jwtToken)
      } else {
        //   console.log(data.error)
        this.setState({errorMsg: data.error})
      }
    }
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderEmailDetails = () => {
    const {email} = this.state

    return (
      <input
        type="text"
        className="input-box"
        placeholder="Email"
        value={email}
        onChange={this.onChangeEmail}
      />
    )
  }

  renderPasswordDetails = () => {
    const {password} = this.state

    return (
      <input
        type="password"
        className="input-box"
        placeholder="Password"
        value={password}
        onChange={this.onChangePassword}
      />
    )
  }

  render() {
    const {errorMsg, emailRequired, passwordRequired} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <p className="login-heading">Welcome Back!</p>
          {this.renderEmailDetails()}
          {emailRequired && (
            <p className="required-msg">{`${emailRequired}*`}</p>
          )}
          {this.renderPasswordDetails()}
          {emailRequired && (
            <p className="required-msg">{`${passwordRequired}*`}</p>
          )}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Log in
          </button>
          <p className="register-para">
            Don’t have an account?
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Login
