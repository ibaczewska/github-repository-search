import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Col, Button, Card, Figure } from 'react-bootstrap'
class Results extends Component {
  state = {
    repositories: [],
    query: ''
  }

  render() {
    var repositoryName = this.props.match.params.query.toLowerCase()
    if (repositoryName !== this.state.query) {
      this.setState({ query: repositoryName })
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
      <div key={repository.id}>
        <Col md='6' lg='12'>
          <Card style={{ width: '80%' }}>
            <Card.Header>
              <a href={`${repository.html_url}`}>{`${repository.name}`}</a>
            </Card.Header>
            <Card.Body>
              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
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
              <Card.Title>Owner: {`${repository.owner.login}`}</Card.Title>
              <Card.Text>
                <p>
                  Stars: {``}
                  {`${repository.stargazers_count}`}
                </p>
                <p>
                  Language: {``}
                  {`${repository.language}`}
                </p>
              </Card.Text>
              <Link to={`/details/${repository.id}`}>
                <Button>SHOW DETAILS</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        {/* <Button onClick={this.props.history.goBack}>back</Button> */}
      </div>
    ))
  }
}

export default Results
