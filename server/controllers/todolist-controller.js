const ApiError = require('../exceptions/api-error')
const todolistService = require('../services/todolist-service')

class TodolistController {
  getAll(req, res, next) {
    try {
      const { userID } = req.cookies
      const { filter } = req.query

      if (!userID) throw ApiError.Unauthorized()

      const todos = todolistService.getAll(userID, filter)

      return res.json(todos)
    } catch (error) {
      next(error)
    }
  }
  markOne(req, res, next) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      todolistService.markOne(userID, id)

      return res.status(200).json({})
    } catch (error) {
      next(error)
    }
  }
  addOne(req, res, next) {
    try {
      const { userID } = req.cookies
      const { title } = req.body

      if (!userID) throw ApiError.Unauthorized()

      todolistService.addOne(userID, title)

      return res.status(201).json({})
    } catch (error) {
      next(error)
    }
  }
  deleteOne(req, res, next) {
    try {
      const { userID } = req.cookies
      const { id } = req.params

      if (!userID) throw ApiError.Unauthorized()

      todolistService.deleteOne(userID, id)

      return res.status(200).json({})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new TodolistController()
