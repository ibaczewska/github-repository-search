import React from 'react'
import { Link } from 'react-router-dom'

const MyButton = props => {
  return (
    <>
      <Link to={'/details/'}>
        <button>{props.name}</button>
      </Link>
    </>
  )
}

export default MyButton
