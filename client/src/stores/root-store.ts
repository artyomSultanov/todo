import AuthStore from './auth-store'
import TodolistStore from './todolist-store'
import ThemeStore from './theme-store'
import { createContext } from 'react'

export interface RootStoreModel {
  authStore: AuthStore
  todolistStore: TodolistStore
  themeStore: ThemeStore
}

export class RootStore implements RootStoreModel {
  authStore: AuthStore
  todolistStore: TodolistStore
  themeStore: ThemeStore

  constructor() {
    this.todolistStore = new TodolistStore()
    this.themeStore = new ThemeStore()
    this.authStore = new AuthStore(this)
  }
}

const rootStore = new RootStore()
export const StoreContext = createContext<RootStoreModel>(rootStore)
export default rootStore
