import axios, { AxiosError } from 'axios'
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
      if (axios.isAxiosError(error)) this.alertAboutError(error)
      return []
    }
  }

  async markOne(id: string): Promise<void> {
    try {
      await api.get(`/todolist/${id}`)

      return
    } catch (error) {
      if (axios.isAxiosError(error)) this.alertAboutError(error)
    }
  }

  async addOne(title: string): Promise<void> {
    try {
      await api.post('/todolist', {
        title,
      })
    } catch (error) {
      if (axios.isAxiosError(error)) this.alertAboutError(error)
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await api.post(`/todolist/${id}`)
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

const todolistService = new TodolistService()
export default todolistService
