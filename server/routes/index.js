const express = require('express')

const config = require('../config')
const authRouter = require('./api/auth-router')
const todolistRouter = require('./api/todolist-router')

const router = express.Router()
const api = config.app.apiUrl

router.use(api, authRouter)
router.use(api, todolistRouter)

module.exports = router
