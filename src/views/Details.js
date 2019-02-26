import React, { Component } from 'react'
import axios from 'axios'
import {
  Col,
  Button,
  Card
} from 'react-bootstrap'

class Details extends Component {
  state = {
    repository: '',
    query: ''
  }
  componentDidMount() {
    var repositoryId = this.props.match
      .params.id
    this.setState({
      query: repositoryId
    })
    const API_URL =
      'https://api.github.com/repositories'
    axios
      .get(`${API_URL}/${repositoryId}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          repository: data
        })
      })
      .catch(error =>
        console.log(error)
      )
  }

  render() {
    return (
      <div>
        <Col md='6' lg='12'>
          <Card
            style={{ width: '80%' }}>
            <Card.Header>
              <a
                href={
                  this.state.repository
                    .html_url
                }>
                {' '}
                {
                  this.state.repository
                    .name
                }
              </a>
            </Card.Header>
            <Card.Body>
              {/* <Card.Img
                variant='top'
                src={this.state.repository.owner.avatar_url}
                title='avatar'
                alt=''
                style={{ width: '10%' }}
              /> */}
              {/* <Card.Title>{this.state.repository.owner.login}</Card.Title> */}
              <Card.Text>
                Description:{' '}
                {this.state.repository
                  .description ||
                  'No description'}
                Number of forks:
                {this.state.repository
                  .forks_count ||
                  'No one forks this repository'}
              </Card.Text>
              <Button
                onClick={
                  this.props.history
                    .goBack
                }>
                BACK
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </div>
    )
  }
}

export default Details
