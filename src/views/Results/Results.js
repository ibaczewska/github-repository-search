import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Results.css'
import { Col, Button, Card, Figure, Badge } from 'react-bootstrap'
import Octicon, { markGithub, person, star, code } from 'octicons-react'

class Results extends Component {
  state = {
    repositories: [],
    query: ''
  }
  render() {
    var repositoryName = this.props.match.params.query
    if (repositoryName !== this.state.query) {
      this.setState({
        query: repositoryName
      })
      const API_URL = 'https://api.github.com/search/repositories'
      axios
        .get(`${API_URL}?q=${repositoryName}`)
        .then(response => response.data)
        .then(data => {
          let filtered = data.items.filter(repository =>
            repository.name.toLowerCase().includes(repositoryName)
          )

          console.log('filtered: ' + filtered)

          this.setState({
            repositories: filtered
          })
        })
        .catch(error => console.log(error))
    }
    return this.state.repositories.map(repository => (
      <Col key={repository.id} xs='12' sm='6' md='4' lg='3'>
        <Card className='results__card'>
          <Card.Header className='results__header'>
            <Badge>
              <Octicon icon={markGithub} />
              <a href={`${repository.html_url}`}> {`${repository.name}`}</a>
            </Badge>
          </Card.Header>
          <Card.Body>
            <Figure>
              <Figure.Image
                className='results__img'
                alt='avatar'
                src={`${repository.owner.avatar_url}`}
              />
            </Figure>
            {/* <Card.Img
                variant='top'
                src={`${repository.owner.avatar_url}`}
                title='avatar'
                alt=''
                style={{ width: '10%' }}
              /> */}
            <Card.Title>
              <Badge variant='light'>
                <Octicon icon={person} /> {`${repository.owner.login}`}
              </Badge>
            </Card.Title>
            <Card.Text>
              <Badge variant='warning'>
                {' '}
                <Octicon icon={star} />
                {`${repository.stargazers_count}`}
              </Badge>
              <Badge variant='danger' className='results__badge'>
                <Octicon icon={code} /> {`${repository.language}`}
              </Badge>
            </Card.Text>
            <Link to={`/details/${repository.id}`}>
              <Button className='results__button'>SHOW DETAILS</Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    ))
  }
}

export default Results
