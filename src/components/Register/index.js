import './index.css'

import {Component} from 'react'

import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

class Register extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    emailRequired: '',
    passwordRequired: '',
    confirmPasswordRequired: '',
    errorMsg: '',
  }

  onSuccessfulLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  validatingFormDetails = () => {
    const {email, password, confirmPassword} = this.state

    if (email === '' || password === '' || confirmPassword === '') {
      if (email === '' && password === '' && confirmPassword === '') {
        this.setState({
          emailRequired: 'Required',
          passwordRequired: 'Required',
          confirmPasswordRequired: 'Required',
        })
      } else if (email === '' && password === '') {
        this.setState({
          emailRequired: 'Required',
          passwordRequired: 'Required',
          confirmPasswordRequired: '',
        })
      } else if (email === '' && confirmPassword === '') {
        this.setState({
          emailRequired: 'Required',
          confirmPasswordRequired: 'Required',
          passwordRequired: '',
        })
      } else if (password === '' && confirmPassword === '') {
        this.setState({
          passwordRequired: 'Required',
          confirmPasswordRequired: 'Required',
          emailRequired: '',
        })
      } else if (email === '') {
        this.setState({
          emailRequired: 'Required',
          passwordRequired: '',
          confirmPasswordRequired: '',
        })
      } else if (password === '') {
        this.setState({
          passwordRequired: 'Required',
          emailRequired: '',
          confirmPasswordRequired: '',
        })
      } else if (confirmPassword === '') {
        this.setState({
          confirmPasswordRequired: 'Required',
          passwordRequired: '',
          emailRequired: '',
        })
      }

      return false
    }

    this.setState({
      emailRequired: '',
      passwordRequired: '',
      confirmPasswordRequired: '',
    })

    if (password !== confirmPassword) {
      this.setState({errorMsg: 'Passwords must be same'})
      return false
    }

    return true
  }

  submitForm = async event => {
    event.preventDefault()

    if (this.validatingFormDetails()) {
      const {email, password} = this.state
      const userDetails = {email, password}

      const apiUrl = `https://reqres.in/api/register`

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
        console.log(jwtToken)
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

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
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

  renderConfirmPassword = () => {
    const {confirmPassword} = this.state

    return (
      <input
        type="password"
        className="input-box"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={this.onChangeConfirmPassword}
      />
    )
  }

  render() {
    const {
      errorMsg,
      emailRequired,
      passwordRequired,
      confirmPasswordRequired,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <form className="login-form" onSubmit={this.submitForm}>
          <p className="login-heading">Welcome!</p>
          {this.renderEmailDetails()}
          {emailRequired && (
            <p className="required-msg">{`${emailRequired}*`}</p>
          )}
          {this.renderPasswordDetails()}
          {passwordRequired && (
            <p className="required-msg">{`${passwordRequired}*`}</p>
          )}
          {this.renderConfirmPassword()}
          {confirmPasswordRequired && (
            <p className="required-msg">{`${confirmPasswordRequired}*`}</p>
          )}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
          <button type="submit" className="login-btn">
            Register
          </button>
          <p className="register-para">
            Already have an account?
            <Link to="/login" className="register-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    )
  }
}

export default Register
