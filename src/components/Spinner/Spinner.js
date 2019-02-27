import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Spinner.css'
const Spinner = () => {
  return (
    <Container className='spinner__container'>
      <Row>
        <Col xs={12}>
          <div
            className='spinner-grow text-primary spinner__custom'
            role='status'
          >
            <span className='sr-only' />
          </div>
          <div
            className='spinner-grow text-success spinner__custom'
            role='status'
          >
            <span className='sr-only' />
          </div>
          <div
            className='spinner-grow text-danger spinner__custom'
            role='status'
          >
            <span className='sr-only' />
          </div>
          <div
            className='spinner-grow text-warning spinner__custom'
            role='status'
          >
            <span className='sr-only' />
          </div>
          <div className='spinner-grow text-info spinner__custom' role='status'>
            <span className='sr-only' />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Spinner
