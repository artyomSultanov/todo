import { AxiosError } from 'axios'
import api from 'config/api'
import { IErrorResponse } from 'types/response-type'
import { ITodo } from 'types/todo-type'

interface TodoListServiceModel {
  getAll(filter: string): Promise<ITodo[]>
  markOne(id: string): Promise<void>
  addOne(title: string): Promise<void>
  deleteOne(id: string): Promise<void>
}

class TodolistService implements TodoListServiceModel {
  async getAll(filter: string): Promise<ITodo[]> {
    try {
      const { data } = await api.get<ITodo[]>('/todolist', {
        params: { filter },
      })

      return data
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
      return []
    }
  }

  async markOne(id: string): Promise<void> {
    try {
      await api.get(`/todolist/${id}`)

      return
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
    }
  }

  async addOne(title: string): Promise<void> {
    try {
      await api.post('/todolist', {
        title,
      })
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await api.post(`/todolist/${id}`)
    } catch (error) {
      const axiosError = error as AxiosError
      const { status, data }: IErrorResponse =
        axiosError.response as IErrorResponse
      this.getError(`Status: ${status}.\nMessage: ${data}`)
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
