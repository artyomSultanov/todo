const ApiError = require('../exceptions/api-error')
const todolistService = require('../services/todolist-service')

class TodolistController {
  getAll(req, res) {
    try {
      const { userID } = req.cookies
      const { filter } = req.query

      if (!userID) throw ApiError.Unauthorized()

      const todos = todolistService.getAll(userID, filter)

      return res.json(todos)
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }
  markOne(req, res) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      todolistService.markOne(userID, id)

      return res.status(200).json({})
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }
  addOne(req, res) {
    try {
      const { userID } = req.cookies
      const { title } = req.body

      if (!userID) throw ApiError.Unauthorized()

      todolistService.addOne(userID, title)

      return res.status(201).json({})
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }
  deleteOne(req, res) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      todolistService.deleteOne(userID, id)

      return res.status(200).json({})
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }
}

module.exports = new TodolistController()
