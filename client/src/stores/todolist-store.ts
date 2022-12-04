import { ITodolistResponse } from 'types/response-type'
import { makeAutoObservable, runInAction } from 'mobx'

import todolistService from 'services/todolist-service'

export interface TodolistStoreModel {
  state: ITodolistResponse
  getAll(filter: string): Promise<void>
  markOne(id: string): Promise<void>
  addOne(title: string): Promise<void>
  deleteOne(id: string): Promise<void>
}

class TodolistStore implements TodolistStoreModel {
  state: ITodolistResponse = { todos: [], error: '' }

  constructor() {
    makeAutoObservable(this)
  }

  getAll = async (filter: string): Promise<void> => {
    const state: ITodolistResponse = await todolistService.getAll(filter)

    runInAction(() => {
      this.state.error = state.error
      this.state.todos = state.todos ?? []
    })
  }

  markOne = async (id: string): Promise<void> => {
    const state = await todolistService.markOne(id)

    this.state.error = state.error
  }

  addOne = async (title: string): Promise<void> => {
    const state = await todolistService.addOne(title)

    this.state.error = state.error
  }

  deleteOne = async (id: string): Promise<void> => {
    const state = await todolistService.deleteOne(id)

    this.state.error = state.error
  }
}

export default TodolistStore
