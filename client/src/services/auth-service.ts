import axios, { AxiosError } from 'axios'
import api from 'config/api'
import { IUser } from 'types/user-type'
import { IErrorResponse } from 'types/response-type'

interface AuthServiceModel {
  signup(email: string, password: string): Promise<IUser>
  signin(email: string, password: string): Promise<IUser>
  signout(): Promise<void>
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
      if (axios.isAxiosError(error)) this.alertAboutError(error)
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
      if (axios.isAxiosError(error)) this.alertAboutError(error)
      return {} as IUser
    }
  }

  async signout(): Promise<void> {
    try {
      await api.post('/signout')
    } catch (error) {
      if (axios.isAxiosError(error)) this.alertAboutError(error)
    }
  }

  private alertAboutError(error: AxiosError): void {
    const axiosError = error
    const { status, data }: IErrorResponse =
      axiosError.response as IErrorResponse

    const err = `Status: ${status}.\nMessage: ${data}`

    // Заглушка
    alert(err)
  }
}

const authService = new AuthService()
export default authService
