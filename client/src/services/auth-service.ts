import { AxiosError } from 'axios'
import api from 'config/api'
import { IUser } from 'types/user-type'
import { IErrorResponse } from 'types/response-type'

interface AuthServiceModel {
  signup(email: string, password: string): Promise<IUser>
  signin(email: string, password: string): Promise<IUser>
}

class AuthService implements AuthServiceModel {
  async signup(email: string, password: string): Promise<IUser> {
    try {
      const { data } = await api.post<IUser>('/signup', {
        email,
        password,
      })

      return data
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
      return {} as IUser
    }
  }

  async signin(email: string, password: string): Promise<IUser> {
    try {
      const { data } = await api.post<IUser>('/signin', {
        email,
        password,
      })
      return data
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
      return {} as IUser
    }
  }

  async signout(): Promise<void> {
    try {
      await api.post('/signout')
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
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
