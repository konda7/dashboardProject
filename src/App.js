import './App.css'

import {Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <ProtectedRoute exact path="/" component={Dashboard} />
  </Switch>
)
export default App
