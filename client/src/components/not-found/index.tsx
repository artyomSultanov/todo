import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1 className='not-found__title'>Not found</h1>
      <div className='not-found__buttons'>
        <Link to='/auth/signup'>SignUp</Link>
        <Link to='/auth/signin'>SignIn</Link>
      </div>
    </div>
  )
}

export default NotFound
