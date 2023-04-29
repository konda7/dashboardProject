import './App.css'

import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/" component={Home} />
  </Switch>
)
export default App
