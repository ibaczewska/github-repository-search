import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Results from '../Results/Results'
import Details from '../Details/Details'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
class Home extends Component {
  state = {
    query: '',
    loading: false
  }
  render() {
    return (
      <Router>
        <Col xs={12} className='navbar__custom__col'>
          <Navbar />
          <Container>
            <Row>
              <Switch>
                <Route exact path='/results' component={Results} />
                <Route exact path='/details/:id' component={Details} />
                <Route exact path='/results/:query' component={Results} />
              </Switch>
            </Row>
          </Container>
        </Col>
      </Router>
    )
  }
}

export default Home
