import { makeAutoObservable, runInAction } from 'mobx'

import { RootStoreModel } from 'stores/root-store'
import authService from 'services/auth-service'
import { IUser } from 'types/user-type'

export interface AuthStoreModel {
  user: IUser
  signup(email: string, password: string): Promise<void>
  signin(email: string, password: string): Promise<void>
  signout(): Promise<void>
}

class AuthStore implements AuthStoreModel {
  user: IUser
  private rootStore: RootStoreModel

  constructor(rootStore: RootStoreModel) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.user = JSON.parse(sessionStorage.getItem('user') ?? '{}')
  }

  signup = async (email: string, password: string): Promise<void> => {
    const user: IUser = await authService.signup(email, password)

    if (JSON.stringify(user) !== '{}') {
      sessionStorage.setItem('user', JSON.stringify(user))
      this.rootStore.todolistStore.getAll('all')
    }

    runInAction(() => {
      this.user = user
    })
  }

  signin = async (email: string, password: string): Promise<void> => {
    const user: IUser = await authService.signin(email, password)

    if (JSON.stringify(user) !== '{}') {
      sessionStorage.setItem('user', JSON.stringify(user))
      this.rootStore.todolistStore.getAll('all')
    }
    runInAction(() => {
      this.user = user
    })
  }

  signout = async () => {
    sessionStorage.removeItem('user')
    this.user = {} as IUser
    await authService.signout()
  }
}

export default AuthStore
