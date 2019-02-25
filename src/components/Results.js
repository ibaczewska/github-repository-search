import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
class Results extends Component {
  state = {
    repositories: [],
    query: ''
  }

  render() {
    var element = null
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

      element = this.state.repositories.map(repository => (
        <div key={repository.id}>
          <Col md='6' lg='3'>
            <img src={`${repository.owner.avatar_url}`} title='avatar' alt='' />
            <h5>
              Name of repo: {``}
              <a href={`${repository.html_url}`}>{`${repository.name}`}</a>
            </h5>
            <h5>Owner:{`${repository.owner.login}`}</h5>
            <p>
              Stars: {``}
              {`${repository.stargazers_count}`}
            </p>
            <p>
              Language:{``}
              {`${repository.language}`}
            </p>

            <Link to={`/details/${repository.id}`}>
              <Button>Show Details</Button>
            </Link>
          </Col>
          {/* <Button onClick={this.props.history.goBack}>back</Button> */}
        </div>
      ))
    }

    return <div>{element}</div>
  }
}

export default Results
