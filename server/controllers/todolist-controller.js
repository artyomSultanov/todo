const ApiError = require('../exceptions/api-error')
const todolistService = require('../services/todolist-service')

class TodolistController {
  async getAll(req, res) {
    try {
      const { userID } = req.cookies

      if (!userID) throw ApiError.Unauthorized()

      const todos = await todolistService.getAll(userID)

      return res.json(todos)
    } catch (error) {
      console.log(error)
      return res
        .status(error.status)
        .json({ message: error.message, errors: error.errors })
    }
  }
  async markOne(req, res) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      const todos = await todolistService.markOne(userID, id)

      return res.json(todos)
    } catch (error) {
      return res
        .status(error.status)
        .json({ message: error.message, errors: error.errors })
    }
  }
  async addOne(req, res) {
    try {
      const { userID } = req.cookies
      const { title } = req.body

      if (!userID) throw ApiError.Unauthorized()

      const todos = await todolistService.addOne(userID, title)

      res.json(todos)
    } catch (error) {
      return res
        .status(error.status)
        .json({ message: error.message, errors: error.errors })
    }
  }
  async deleteOne(req, res) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      const todos = await todolistService.deleteOne(userID, id)

      res.json(todos)
    } catch (error) {
      return res
        .status(error.status)
        .json({ message: error.message, errors: error.errors })
    }
  }
}

module.exports = new TodolistController()
