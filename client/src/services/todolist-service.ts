import { AxiosError } from 'axios'
import api from 'config/api'
import { IErrorResponse, ITodolistResponse } from 'types/response-type'
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
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
    }
  }

  async markOne(id: string): Promise<ITodolistResponse> {
    try {
      await api.get(`/todolist/${id}`)

      return { error: '' }
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
    }
  }

  async addOne(title: string): Promise<ITodolistResponse> {
    try {
      await api.post('/todolist', {
        title,
      })

      return { error: '' }
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
    }
  }

  async deleteOne(id: string): Promise<ITodolistResponse> {
    try {
      await api.post(`/todolist/${id}`)

      return { error: '' }
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      return this.getError(`Status: ${status}.\nMessage: ${data.message}`)
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
