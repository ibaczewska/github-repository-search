import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Results from './components/Results'
import Details from './components/Details'
import logo from '../src/assets/GitHub-icon.png'
import Button from 'react-bootstrap/Button'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Navbar, Form, FormControl } from 'react-bootstrap'

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
      <Container fluid={true}>
        <Router>
          <div>
            <Navbar bg='light' expand='lg'>
              <img src={logo} alt='logo' title='logo' />
              <Navbar.Brand href='/'>
                {' '}
                <h6>Repository Search</h6>
              </Navbar.Brand>
              <Form inline>
                <FormControl
                  type='text'
                  placeholder='Search'
                  className='mr-sm-2'
                  onChange={event => this.handleInputChange(event)}
                  onKeyPress={event => this.keyPress(event)}
                />
                <Link to={'/results/' + this.state.query}>
                  <Button
                    variant='outline-success'
                    onClick={this.handleClickChange}
                  >
                    Search repository
                  </Button>
                </Link>
              </Form>
            </Navbar>
            <Switch>
              <Route exact path='/results' component={Results} />
              <Route exact path='/details/:id' component={Details} />
              <Route exact path='/results/:query' component={Results} />
            </Switch>
          </div>
        </Router>
      </Container>
    )
  }
}

export default App
