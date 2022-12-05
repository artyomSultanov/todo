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
  const authStore = rootStore.authStore
  const user = authStore.user
  const navigate = useNavigate()
  const { email, setEmail, password, setPassword, handleSubmit, handleReset } =
    useAuth(method)

  useEffect(() => {
    if (JSON.stringify(user) !== '{}') {
      navigate('/todolist')
    }
  }, [user, navigate])

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2 className='auth-form__title'>{title}</h2>
        <input
          className='auth-form__input'
          type='email'
          name='email'
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          placeholder='Email'
        />
        <input
          className='auth-form__input'
          type='password'
          name='password'
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder='Password'
        />
        <div className='form-buttons'>
          <button className='form-buttons__submit-button' type='submit'>
            Submit
          </button>
          <button
            className='form-buttons__reset-button'
            type='reset'
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

export default observer(Auth)
