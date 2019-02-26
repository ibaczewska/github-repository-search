import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  Col,
  Button,
  Card,
  Figure
} from 'react-bootstrap'
class Results extends Component {
  state = {
    repositories: [],
    query: ''
  }
  render() {
    var repositoryName = this.props
      .match.params.query
    if (
      repositoryName !==
      this.state.query
    ) {
      this.setState({
        query: repositoryName
      })
      const API_URL =
        'https://api.github.com/search/repositories'
      axios
        .get(
          `${API_URL}?q=${repositoryName}`
        )
        .then(response => response.data)
        .then(data => {
          let filtered = data.items.filter(
            repository =>
              repository.name
                .toLowerCase()
                .includes(
                  repositoryName
                )
          )

          console.log(
            'filtered: ' + filtered
          )

          this.setState({
            repositories: filtered
          })
        })
        .catch(error =>
          console.log(error)
        )
    }
    return this.state.repositories.map(
      repository => (
        <Col
          key={repository.id}
          xs='12'
          sm='6'
          md='4'
          lg='3'>
          <Card
            style={{
              minHeight: 495,
              margin: '30px 8px 10px'
            }}>
            <Card.Header>
              <a
                href={`${
                  repository.html_url
                }`}>{`${
                repository.name
              }`}</a>
            </Card.Header>
            <Card.Body>
              <Figure>
                <Figure.Image
                  width={200}
                  style={{
                    margin: '0 auto',
                    textAlign: 'center',
                    justifyContent:
                      'center',
                    alignItems: 'center'
                  }}
                  alt='avatar'
                  src={`${
                    repository.owner
                      .avatar_url
                  }`}
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
                Owner:{' '}
                {`${
                  repository.owner.login
                }`}
              </Card.Title>
              <Card.Text>
                Stars: {``}
                {`${
                  repository.stargazers_count
                }`}
              </Card.Text>
              <Card.Text>
                Language: {``}
                {`${
                  repository.language
                }`}
              </Card.Text>
              <Link
                to={`/details/${
                  repository.id
                }`}>
                <Button>
                  SHOW DETAILS
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      )
    )
  }
}

export default Results
