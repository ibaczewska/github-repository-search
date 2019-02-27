import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import logo from '../../assets/GitHub-icon.png'
import Button from 'react-bootstrap/Button'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, FormControl } from 'react-bootstrap'

class MyNavbar extends Component {
  state = {
    query: '',
    loading: false
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
      <>
        <Navbar sticky='top' bg='light' className='navbar__custom' expand='lg'>
          <img src={logo} alt='logo' title='logo' className='navbar__logo' />
          <Navbar.Brand href='https://ibaczewska.github.io/github-repository-search/'>
            {' '}
            <h1>{this.props.title}</h1>
          </Navbar.Brand>
          <FormControl
            type='text'
            placeholder='Search repository'
            className='mr-sm-2'
            onChange={event => this.handleInputChange(event)}
            onKeyPress={event => this.keyPress(event)}
          />
          <Link to={'/results/' + this.state.query}>
            <Button variant='primary' onClick={this.handleClickChange}>
              {this.props.btnName}
            </Button>
          </Link>
        </Navbar>
      </>
    )
  }
}
MyNavbar.propTypes = {
  title: PropTypes.string,
  btnName: PropTypes.string
}

export default MyNavbar
