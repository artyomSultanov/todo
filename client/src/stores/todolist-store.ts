import { makeAutoObservable, runInAction } from 'mobx'

import todolistService from 'services/todolist-service'
import { ITodo } from 'types/todo-type'

export interface TodolistStoreModel {
  todos: ITodo[]
  getAll(filter: string): Promise<void>
  markOne(id: string): Promise<void>
  addOne(title: string): Promise<void>
  deleteOne(id: string): Promise<void>
}

class TodolistStore implements TodolistStoreModel {
  todos: ITodo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  getAll = async (filter: string): Promise<void> => {
    const todos: ITodo[] = await todolistService.getAll(filter)

    runInAction(() => {
      this.todos = todos
    })
  }

  markOne = async (id: string): Promise<void> => {
    await todolistService.markOne(id)
  }

  addOne = async (title: string): Promise<void> => {
    await todolistService.addOne(title)
  }

  deleteOne = async (id: string): Promise<void> => {
    await todolistService.deleteOne(id)
  }
}

export default TodolistStore
