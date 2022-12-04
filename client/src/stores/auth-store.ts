import { IAuthResponse } from 'types/response-type'
import { RootStoreModel } from 'stores/root-store'
import { makeAutoObservable, runInAction } from 'mobx'
import authService from 'services/auth-service'
import { IUser } from 'types/user-type'

export interface AuthStoreModel {
  state: IAuthResponse
  signup(email: string, password: string): Promise<void>
  signin(email: string, password: string): Promise<void>
}

class AuthStore implements AuthStoreModel {
  state: IAuthResponse
  private rootStore: RootStoreModel

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.state = {
      user: JSON.parse(sessionStorage.getItem('user') ?? '{}'),
      error: '',
    }
  }

  signup = async (email: string, password: string): Promise<void> => {
    const state: IAuthResponse = await authService.signup(email, password)

    if (JSON.stringify(state.user) !== '')
      sessionStorage.setItem('user', JSON.stringify(state.user))

    this.rootStore.todolistStore.getAll('all')
    runInAction(() => {
      this.state.user = state.user
    })
  }

  signin = async (email: string, password: string): Promise<void> => {
    const state: IAuthResponse = await authService.signin(email, password)

    if (JSON.stringify(state.user) !== '')
      sessionStorage.setItem('user', JSON.stringify(state.user))

    this.rootStore.todolistStore.getAll('all')
    runInAction(() => {
      this.state.user = state.user
    })
  }

  signout = () => {
    sessionStorage.removeItem('user')
    this.state.user = {} as IUser
  }
}

export default AuthStore
