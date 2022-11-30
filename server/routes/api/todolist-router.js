const express = require('express')

const todolistController = require('../../controllers/todolist-controller')

const router = express.Router()

router.get('/todolist', todolistController.getAll)
router.get('/todolist/:id', todolistController.markOne)

router.post('/todolist', todolistController.addOne)
router.post('/todolist/:id', todolistController.deleteOne)

module.exports = router
