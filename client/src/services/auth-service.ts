import api from 'config/api'
import { IUser } from 'types/user-type'
import { IAuthResponse } from 'types/response-type'

interface AuthServiceModel {
  signup(email: string, password: string): Promise<IAuthResponse>
  signin(email: string, password: string): Promise<IAuthResponse>
}

class AuthService implements AuthServiceModel {
  async signup(email: string, password: string): Promise<IAuthResponse> {
    try {
      const { data } = await api.post<IUser>('/signup', {
        email,
        password,
      })

      return { user: data, error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  async signin(email: string, password: string): Promise<IAuthResponse> {
    try {
      const { data } = await api.post<IUser>('/signin', {
        email,
        password,
      })
      return { user: data, error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  private getError(error: string) {
    let res = { user: {} as IUser, error: 'An unexpected error.' }

    if (error !== '')
      res = {
        user: {} as IUser,
        error,
      }

    // Заглушка
    alert(res.error)
    return res
  }
}

const authService = new AuthService()
export default authService
