import api from 'config/api'
import { ITodolistResponse } from 'types/response-type'
import { ITodo } from 'types/todo-type'

interface TodoListServiceModel {
  getAll(filter: string): Promise<ITodolistResponse>
  markOne(id: string): Promise<ITodolistResponse>
  addOne(title: string): Promise<ITodolistResponse>
  deleteOne(id: string): Promise<ITodolistResponse>
}

class TodolistService implements TodoListServiceModel {
  async getAll(filter: string): Promise<ITodolistResponse> {
    try {
      const { data } = await api.get<ITodo[]>('/todolist', {
        params: { filter },
      })

      return { todos: data, error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  async markOne(id: string): Promise<ITodolistResponse> {
    try {
      await api.get(`/todolist/${id}`)

      return { error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  async addOne(title: string): Promise<ITodolistResponse> {
    try {
      await api.post('/todolist', {
        title,
      })

      return { error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  async deleteOne(id: string): Promise<ITodolistResponse> {
    try {
      await api.post(`/todolist/${id}`)

      return { error: '' }
    } catch (error) {
      return this.getError(`${error}`)
    }
  }

  private getError(error: string) {
    let res = { error: 'An unexpected error.' }

    if (error !== '') {
      res = { error }
    }

    // Заглушка
    alert(res.error)
    return res
  }
}

const todolistService = new TodolistService()
export default todolistService
