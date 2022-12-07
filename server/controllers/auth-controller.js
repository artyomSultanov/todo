const authService = require('../services/auth-service')

class AuthController {
  async signup(req, res) {
    try {
      const { email, password } = req.body

      const userData = await authService.signup(email, password)

      res.cookie('userID', userData.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 месяц
        httpOnly: true,
      })
      return res.status(201).json(userData)
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body

      const userData = await authService.signin(email, password)

      res.cookie('userID', userData.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 месяц
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }

  async signout(_, res) {
    try {
      res.clearCookie('userID')

      res.sendStatus(200)
    } catch (error) {
      return res.status(error.status).json(error.message)
    }
  }
}

module.exports = new AuthController()
