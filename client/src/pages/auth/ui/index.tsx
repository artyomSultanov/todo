import React, { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import rootStore from 'stores/root-store'

import './index.scss'
import useAuth from '../model'

interface PropsType {
  method(email: string, password: string): Promise<void>
  title: string
}

const Auth: React.FC<PropsType> = ({ method, title }) => {
  const authState = rootStore.authStore.state
  const user = authState.user
  const navigate = useNavigate()
  const { email, setEmail, password, setPassword, handleSubmit, handleReset } =
    useAuth(method)

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      navigate('/todolist')
    }
  }, [user, navigate])

  if (authState.error !== '') {
    alert(authState.error)
  }

  return (
    <form className='auth' onSubmit={handleSubmit}>
      <div className='auth__wrapper'>
        <p className='auth__title'>{title}</p>
        <input
          className='auth__input'
          type='email'
          name='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder='Email'
        />
        <input
          className='auth__input'
          type='password'
          name='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder='Password'
        />
        <div className='auth__buttons'>
          <button className='auth__buttons__submit' type='submit'>
            Submit
          </button>
          <button
            className='auth__buttons__reset'
            type='reset'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}

export default observer(Auth)
