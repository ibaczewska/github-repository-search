import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row } from 'react-bootstrap'
import Home from './views/Home/Home'

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Home />
        </Row>
      </Container>
    )
  }
}

export default App
