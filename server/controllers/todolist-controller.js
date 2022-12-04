const ApiError = require('../exceptions/api-error')
const todolistService = require('../services/todolist-service')

class TodolistController {
  async getAll(req, res) {
    try {
      const { userID } = req.cookies
      const { filter } = req.query

      if (!userID) throw ApiError.Unauthorized()

      const todos = await todolistService.getAll(userID, filter)

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

      await todolistService.markOne(userID, id)

      return res.status(200)
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

      await todolistService.addOne(userID, title)

      return res.status(201)
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

      await todolistService.deleteOne(userID, id)

      return res.status(200)
    } catch (error) {
      return res
        .status(error.status)
        .json({ message: error.message, errors: error.errors })
    }
  }
}

module.exports = new TodolistController()
