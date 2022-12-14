const authService = require('../services/auth-service')

class AuthController {
  async signup(req, res, next) {
    try {
      const { email, password } = req.body

      const userData = await authService.signup(email, password)

      res.cookie('userID', userData.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 месяц
        httpOnly: true,
      })
      return res.status(201).json(userData)
    } catch (error) {
      next(error)
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body

      const userData = await authService.signin(email, password)

      res.cookie('userID', userData.id, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 1 месяц
        httpOnly: true,
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async signout(_, res, next) {
    try {
      res.clearCookie('userID')

      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new AuthController()
