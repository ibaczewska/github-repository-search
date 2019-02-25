import React, { Component } from 'react'
import axios from 'axios'
class Details extends Component {
  state = {
    repository: '',
    query: ''
  }
  componentDidMount() {
    var repositoryId = this.props.match.params.id
    this.setState({ query: repositoryId })
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
      <div>
        <h5>
          Description: {this.state.repository.description || 'No description'}
        </h5>
        <p>Forks</p>
        {this.state.repository.forks_count || 'No one forks this repository'}

        <button onClick={this.props.history.goBack}>back</button>
      </div>
    )
  }
}

export default Details
