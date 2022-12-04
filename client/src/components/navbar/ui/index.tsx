import React, { MouseEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSignOut, faSun } from '@fortawesome/free-solid-svg-icons'

import rootStore from 'stores/root-store'

import './index.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const authState = rootStore.authStore.state
  const theme = rootStore.themeStore.theme
  const isAuth = JSON.stringify(authState.user) !== '{}'

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    rootStore.themeStore.changeTheme()
  }
  const handleLeave = () => {
    rootStore.authStore.signout()
    navigate('/auth/signin')
  }

  return (
    <div className='navbar'>
      <div className='navbar__wrapper'>
        <div className='navbar__theme' onClick={handleClick}>
          {theme === 'dark' ? (
            <FontAwesomeIcon icon={faMoon} />
          ) : (
            <FontAwesomeIcon icon={faSun} />
          )}
        </div>
        <div className='navbar__user'>{isAuth ? authState.user.email : ''}</div>
        {isAuth ? (
          <FontAwesomeIcon
            className='navbar__signout'
            icon={faSignOut}
            onClick={handleLeave}
          />
        ) : (
          <ul className='navbar__buttons'>
            <li className='navbar__buttons__signup'>
              <NavLink
                className='navbar__buttons__signup-link'
                to={'/auth/signup'}
              >
                SignUp
              </NavLink>
            </li>
            <li className='navbar__buttons__signin'>
              <NavLink
                className='navbar__buttons__signup-link'
                to={'/auth/signin'}
              >
                SignIn
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

export default observer(Navbar)
