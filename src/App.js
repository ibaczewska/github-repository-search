import React, { Component } from 'react'
import axios from 'axios'
import Results from './components/Results'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Details from './components/Details'
import logo from '../src/assets/GitHub-icon.png'
import { Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  state = {
    query: ''
  }
  handleInputChange = event => {
    this.setState({
      query: event.target.value
    })
  }
  handleClickChange = () => {
    this.setState({
      query: this.state.query
    })
  }
  keyPress = event => {
    if (event.key === 'Enter') {
      this.handleClickChange()
      window.location.href = `/results/${this.state.query}`
    }
  }
  render() {
    return (
      <div className='App'>
        <Router>
          <div>
            <img src={logo} alt='logo' />
            <p>Repository Search</p>
            <input
              onChange={event => this.handleInputChange(event)}
              onKeyPress={event => this.keyPress(event)}
            />
            <Link to={'/results/' + this.state.query}>
              <button onClick={this.handleClickChange}>
                Search repository
              </button>
            </Link>

            <Switch>
              <Route exact path='/results' component={Results} />
              <Route exact path='/details/:id' component={Details} />
              <Route exact path='/results/:query' component={Results} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
