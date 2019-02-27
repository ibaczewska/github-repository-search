import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Results.css'
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Figure,
  Badge,
  Pagination
} from 'react-bootstrap'
import Octicon, { markGithub, person, star, code } from 'octicons-react'
import Spinner from '../../components/Spinner/Spinner'

class Results extends Component {
  state = {
    repositories: [],
    currentPage: 1,
    repositoriesPerPage: 8
  }

  componentDidMount() {
    this.loadRepositories()
  }

  componentDidUpdate() {
    this.loadRepositories()
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }
  loadRepositories = () => {
    const query = this.props.match.params.query
    if (query !== this.state.query) {
      this.setState({ query: query })
      const API_URL = 'https://api.github.com/search/repositories'
      axios
        .get(`${API_URL}?q=${query}`)
        .then(response => response.data)
        .then(data => {
          let filtered = data.items.filter(repository =>
            repository.name.toLowerCase().includes(query.toLowerCase())
          )
          this.setState({
            repositories: filtered
          })
        })
        .catch(error => console.log(error))
    }
  }

  getPageNumbers = () => {
    // Logic for displaying page numbers
    const pageNumbers = []
    let pagesCount = Math.ceil(
      this.state.repositories.length / this.state.repositoriesPerPage
    )
    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }
  render() {
    const { repositories, currentPage, repositoriesPerPage } = this.state

    const indexOfLastRepository = currentPage * repositoriesPerPage
    const indexOfFirstRepository = indexOfLastRepository - repositoriesPerPage
    const currentRepository = repositories.slice(
      indexOfFirstRepository,
      indexOfLastRepository
    )

    const renderRepositories = currentRepository.map(repository => {
      return (
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
      )
    })

    const renderPageNumbers = this.getPageNumbers().map(number => {
      return (
        <Pagination.Item
          key={number}
          id={number}
          active={number === currentPage}
          onClick={event => this.handleClick(event)}
        >
          {number}
        </Pagination.Item>
      )
    })
    //spinner
    if (!repositories.length) {
      return (
        <>
          <Spinner />
        </>
      )
    } else
      return (
        <>
          {renderRepositories}
          <Container>
            <Row className='results__pagination'>
              <Col xs={4} md={5} />
              <Col xs={8} md={7}>
                <Pagination id='page-numbers'>{renderPageNumbers}</Pagination>
              </Col>
            </Row>
          </Container>
        </>
      )
  }
}

export default Results
