import React, { MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSignOut, faSun } from '@fortawesome/free-solid-svg-icons'

import rootStore from 'stores/root-store'

import './index.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const authStore = rootStore.authStore
  const theme = rootStore.themeStore.theme
  const isAuth = JSON.stringify(authStore.user) !== '{}'

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    rootStore.themeStore.changeTheme()
  }
  const handleLeave = () => {
    navigate('/auth/signin')
    rootStore.authStore.signout()
  }

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <div className='navbar__theme-button' onClick={handleClick}>
          {theme === 'dark' ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
        <div className='navbar__user-email'>
          {isAuth ? authStore.user.email : ''}
        </div>
        {isAuth ? (
          <FontAwesomeIcon
            className='navbar__signout-button'
            icon={faSignOut}
            onClick={handleLeave}
          />
        ) : (
          <ul className='navbar-buttons'>
            <li className='navbar-buttons__signup-button'>
              <NavLink to={'/auth/signup'}>SignUp</NavLink>
            </li>
            <li className='navbar-buttons__signin-button'>
              <NavLink to={'/auth/signin'}>SignIn</NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default observer(Navbar)
