import { AxiosError } from 'axios'
import api from 'config/api'
import { IUser } from 'types/user-type'
import { IAuthResponse, IErrorResponse } from 'types/response-type'

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
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
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
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
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
