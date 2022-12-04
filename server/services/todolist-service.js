const uuid = require('uuid').v4

const db = require('../db')
const ApiError = require('../exceptions/api-error')

class TodolistService {
  async getAll(userID, filter) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    const todos = user.todos.filter((todo) => {
      if (filter === 'done') return todo.completed
      if (filter === 'undone') return !todo.completed
      return true
    })

    return todos.reverse()
  }
  async markOne(userID, id) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos = user.todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })
  }
  async addOne(userID, title) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos.push({
      id: uuid(),
      title,
      completed: false,
    })
  }
  async deleteOne(userID, id) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos = user.todos.filter((todo) => todo.id !== id)
  }
}

module.exports = new TodolistService()
