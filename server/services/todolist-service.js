const uuid = require('uuid').v4

const db = require('../db')
const ApiError = require('../exceptions/api-error')

class TodolistService {
  async getAll(userID) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    return user.todos
  }
  async markOne(userID, id) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos = user.todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })

    return user.todos
  }
  async addOne(userID, title) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos.push({
      id: uuid(),
      title,
      completed: false,
    })

    return user.todos
  }
  async deleteOne(userID, id) {
    const user = db.find((user) => user.id === userID)

    if (!user) throw ApiError.Unauthorized()

    user.todos = user.todos.filter((todo) => todo.id !== id)

    return user.todos
  }
}

module.exports = new TodolistService()
