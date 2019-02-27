import React, { Component } from 'react'
import axios from 'axios'
import './Details.css'
import { Col, Button, Card, Badge } from 'react-bootstrap'
import Octicon, {
  repoForked,
  eye,
  book,
  thumbsup,
  markGithub
} from 'octicons-react'

class Details extends Component {
  state = {
    repository: '',
    query: ''
  }
  componentDidMount() {
    this.loadRepositoryDetails()
  }

  loadRepositoryDetails = () => {
    var repositoryId = this.props.match.params.id
    this.setState({
      query: repositoryId
    })
    const API_URL = 'https://api.github.com/repositories'
    axios
      .get(`${API_URL}/${repositoryId}`)
      .then(response => response.data)
      .then(data => {
        this.setState({
          repository: data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <Col md='12' lg='12'>
        <Card className='details__card'>
          <Card.Header>
            <Badge>
              <Octicon icon={markGithub} />
              <a href={`${this.state.repository.html_url}`}>
                {' '}
                {`${this.state.repository.name}`}
              </a>
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Card.Title>Description</Card.Title>
              <Octicon icon={book} />{' '}
              {this.state.repository.description || 'No description'}
            </Card.Text>
            <Card.Text>
              <Badge className='badge__details' variant='secondary'>
                <Octicon icon={repoForked} />{' '}
                {this.state.repository.forks_count || '0'}
              </Badge>
              <Badge className='badge__details' variant='info'>
                <Octicon icon={eye} />{' '}
                {this.state.repository.watchers_count || '0'}
              </Badge>
              <Badge className='badge__details' variant='success'>
                <Octicon icon={thumbsup} />{' '}
                {this.state.repository.subscribers_count || '0'}
              </Badge>
            </Card.Text>
            <Button onClick={this.props.history.goBack}>BACK</Button>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default Details
